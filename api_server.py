from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import boto3
import base64
import os
from datetime import datetime
import requests
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# AWS Configuration
REGION = os.getenv('AWS_REGION', 'ap-south-1')
BUCKET = os.getenv('S3_BUCKET', 'emotion-recognition5068')

# n8n Workflow Configuration
N8N_WEBHOOK_URL = os.getenv('N8N_WEBHOOK_URL', 'https://finaldestination972003.app.n8n.cloud/webhook-test/chatbot-input')
N8N_ENABLED = os.getenv('N8N_ENABLED', 'true').lower() == 'true'

s3 = boto3.client('s3', region_name=REGION)
rekognition = boto3.client('rekognition', region_name=REGION)


def _postprocess_emotions(emotions, sensitivity='medium'):
    """Adjust Rekognition output to reduce repetitive 'CALM' results.

    sensitivity: 'low'|'medium'|'high'
      - low  -> more likely to keep CALM (lower thresholds)
      - medium -> default
      - high -> strict (avoid CALM unless very confident)

    Strategy:
      - If top emotion is CALM and doesn't meet the configured confidence
        or margin over second emotion, pick the next emotion or return
        'UNCERTAIN'.
    """
    if not emotions:
        return None, 0, emotions

    # thresholds per sensitivity
    if sensitivity == 'low':
        calm_min = 70.0
        ratio = 1.1
    elif sensitivity == 'high':
        calm_min = 95.0
        ratio = 1.8
    else:
        calm_min = 85.0
        ratio = 1.4

    top = emotions[0]
    second = emotions[1] if len(emotions) > 1 else None

    top_conf = float(top.get('Confidence', 0))
    second_conf = float(second.get('Confidence', 0)) if second else 0.0

    # If top is CALM, check thresholds
    if top.get('Type') == 'CALM':
        # If top confidence is high enough, keep it
        if top_conf >= calm_min and (second_conf == 0 or (top_conf / max(second_conf, 1e-6)) >= ratio):
            return top.get('Type'), round(top_conf, 2), emotions

        # Otherwise, try to pick next strongest emotion with reasonable confidence
        for e in emotions[1:]:
            if float(e.get('Confidence', 0)) >= max(40.0, calm_min * 0.5):
                return e.get('Type'), round(float(e.get('Confidence', 0)), 2), emotions

        # fallback: mark uncertain
        return 'UNCERTAIN', round(top_conf, 2), emotions

    # if top is not CALM, return normally
    return top.get('Type'), round(top_conf, 2), emotions


def send_to_n8n_workflow(emotion_data, user_text=None):
    """
    Send emotion analysis results to n8n workflow
    
    Args:
        emotion_data: Dict with emotion analysis results
        user_text: Optional text input to accompany the emotion data
    
    Returns:
        Dict with n8n response or error
    """
    if not N8N_ENABLED:
        return {"success": False, "message": "n8n integration is disabled"}
    
    try:
        # Construct text for n8n workflow
        emotion = emotion_data.get('primary_emotion', 'UNKNOWN')
        confidence = emotion_data.get('confidence', 0)
        
        if user_text:
            raw_text = user_text
        else:
            # Generate descriptive text from emotion data
            raw_text = f"Person detected with {emotion} emotion at {confidence}% confidence"
            
            # Add additional context
            if emotion_data.get('face_details'):
                age_range = emotion_data['face_details'].get('age_range', {})
                gender = emotion_data['face_details'].get('gender', {})
                if age_range:
                    raw_text += f", age approximately {age_range.get('Low')}-{age_range.get('High')}"
                if gender:
                    raw_text += f", {gender.get('Value', 'unknown')} gender"
        
        # Prepare payload for n8n webhook
        payload = {
            "raw_text": raw_text,
            "emotion_data": {
                "primary_emotion": emotion,
                "confidence": confidence,
                "all_emotions": emotion_data.get('all_emotions', []),
                "timestamp": datetime.now().isoformat(),
                "faces_count": emotion_data.get('faces_count', 0)
            }
        }
        
        # Send to n8n webhook
        response = requests.post(
            N8N_WEBHOOK_URL,
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code == 200:
            return {
                "success": True,
                "n8n_response": response.json() if response.text else {},
                "status_code": response.status_code
            }
        else:
            return {
                "success": False,
                "error": f"n8n returned status {response.status_code}",
                "response": response.text
            }
            
    except requests.exceptions.Timeout:
        return {
            "success": False,
            "error": "n8n workflow request timed out"
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"Failed to send to n8n: {str(e)}"
        }


@app.route('/')
def index():
    """Serve the main UI"""
    return render_template('index.html')

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200

@app.route('/detect-emotion', methods=['POST'])
def detect_emotion():
    """
    Detect emotion from image
    Accepts: JSON with 'image' (base64) or 'image_url' or 's3_key'
    Returns: Emotion analysis
    """
    try:
        data = request.get_json()
        
        # Option 1: Base64 encoded image
        if 'image' in data:
            image_bytes = base64.b64decode(data['image'])
            response = rekognition.detect_faces(
                Image={'Bytes': image_bytes},
                Attributes=['ALL']
            )
        
        # Option 2: S3 key provided
        elif 's3_key' in data:
            response = rekognition.detect_faces(
                Image={'S3Object': {'Bucket': BUCKET, 'Name': data['s3_key']}},
                Attributes=['ALL']
            )
        
        # Option 3: Upload from URL or binary
        elif 'image_url' in data or request.files.get('file'):
            if request.files.get('file'):
                image_bytes = request.files['file'].read()
            else:
                return jsonify({"error": "image_url not implemented yet"}), 400
            
            # Upload to S3
            key = f"n8n-uploads/{datetime.now().strftime('%Y%m%d_%H%M%S')}.jpg"
            s3.put_object(Bucket=BUCKET, Key=key, Body=image_bytes)
            
            response = rekognition.detect_faces(
                Image={'S3Object': {'Bucket': BUCKET, 'Name': key}},
                Attributes=['ALL']
            )
        else:
            return jsonify({"error": "No image provided. Send 'image' (base64), 's3_key', or 'file'"}), 400
        
        # Process results
        face_details = response.get('FaceDetails', [])
        
        if not face_details:
            return jsonify({
                "success": False,
                "message": "No face detected",
                "faces_count": 0
            }), 200
        
        # Extract emotions from first face
        emotions = sorted(
            face_details[0].get('Emotions', []),
            key=lambda e: e['Confidence'],
            reverse=True
        )

        # Optional sensitivity control: 'low', 'medium', 'high'
        sensitivity = data.get('sensitivity', 'medium') if isinstance(data, dict) else 'medium'

        # Post-process to reduce CALM bias (returns primary, confidence, full_list)
        primary_emotion, primary_confidence, emotions_processed = _postprocess_emotions(emotions, sensitivity=sensitivity)

        result = {
            "success": True,
            "faces_count": len(face_details),
            "primary_emotion": primary_emotion,
            "confidence": primary_confidence,
            "all_emotions": [
                {"emotion": e['Type'], "confidence": round(e['Confidence'], 2)}
                for e in emotions_processed
            ],
            "face_details": {
                "age_range": face_details[0].get('AgeRange'),
                "gender": face_details[0].get('Gender'),
                "smile": face_details[0].get('Smile'),
                "eyeglasses": face_details[0].get('Eyeglasses'),
                "emotions_raw": emotions
            }
        }
        
        # Send to n8n workflow if enabled and requested
        n8n_result = None
        send_to_n8n = data.get('send_to_n8n', False) if isinstance(data, dict) else False
        user_text = data.get('user_text', None) if isinstance(data, dict) else None
        
        if send_to_n8n:
            n8n_result = send_to_n8n_workflow(result, user_text)
            result['n8n_integration'] = n8n_result
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/detect-emotion-batch', methods=['POST'])
def detect_emotion_batch():
    """
    Detect emotions from multiple images
    Accepts: JSON array with multiple images
    """
    try:
        data = request.get_json()
        images = data.get('images', [])
        
        results = []
        for idx, img_data in enumerate(images):
            try:
                if 'image' in img_data:
                    image_bytes = base64.b64decode(img_data['image'])
                elif 's3_key' in img_data:
                    # Handle S3 key
                    pass
                else:
                    continue
                
                response = rekognition.detect_faces(
                    Image={'Bytes': image_bytes},
                    Attributes=['ALL']
                )
                
                face_details = response.get('FaceDetails', [])
                if face_details:
                    emotions = sorted(
                        face_details[0].get('Emotions', []),
                        key=lambda e: e['Confidence'],
                        reverse=True
                    )
                    results.append({
                        "index": idx,
                        "primary_emotion": emotions[0]['Type'] if emotions else None,
                        "confidence": round(emotions[0]['Confidence'], 2) if emotions else 0
                    })
            except Exception as e:
                results.append({
                    "index": idx,
                    "error": str(e)
                })
        
        return jsonify({
            "success": True,
            "processed": len(results),
            "results": results
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/add-face-to-collection', methods=['POST'])
def add_face():
    """
    Add face to AWS Rekognition collection
    For face recognition/matching
    """
    try:
        data = request.get_json()
        collection_id = data.get('collection_id', 'Collection')
        external_id = data.get('external_id')
        
        if 'image' in data:
            image_bytes = base64.b64decode(data['image'])
            response = rekognition.index_faces(
                CollectionId=collection_id,
                Image={'Bytes': image_bytes},
                ExternalImageId=external_id,
                MaxFaces=1,
                QualityFilter="AUTO",
                DetectionAttributes=['ALL']
            )
        elif 's3_key' in data:
            response = rekognition.index_faces(
                CollectionId=collection_id,
                Image={'S3Object': {'Bucket': BUCKET, 'Name': data['s3_key']}},
                ExternalImageId=external_id,
                MaxFaces=1,
                QualityFilter="AUTO",
                DetectionAttributes=['ALL']
            )
        else:
            return jsonify({"error": "No image provided"}), 400
        
        return jsonify({
            "success": True,
            "faces_indexed": len(response.get('FaceRecords', [])),
            "face_records": response.get('FaceRecords', [])
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/n8n/send', methods=['POST'])
def send_to_n8n():
    """
    Manually send data to n8n workflow
    Accepts: emotion analysis results or custom text
    """
    try:
        data = request.get_json()
        
        # Check if emotion data or just text
        if 'emotion_data' in data:
            emotion_data = data['emotion_data']
            user_text = data.get('user_text')
            result = send_to_n8n_workflow(emotion_data, user_text)
        elif 'raw_text' in data:
            # Direct text input to n8n
            payload = {"raw_text": data['raw_text']}
            response = requests.post(
                N8N_WEBHOOK_URL,
                json=payload,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            result = {
                "success": response.status_code == 200,
                "n8n_response": response.json() if response.text else {},
                "status_code": response.status_code
            }
        else:
            return jsonify({"error": "Provide 'emotion_data' or 'raw_text'"}), 400
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route('/n8n/config', methods=['GET', 'POST'])
def n8n_config():
    """
    Get or update n8n configuration
    """
    global N8N_WEBHOOK_URL, N8N_ENABLED
    
    if request.method == 'GET':
        return jsonify({
            "webhook_url": N8N_WEBHOOK_URL,
            "enabled": N8N_ENABLED
        }), 200
    
    elif request.method == 'POST':
        data = request.get_json()
        
        if 'webhook_url' in data:
            N8N_WEBHOOK_URL = data['webhook_url']
        
        if 'enabled' in data:
            N8N_ENABLED = data['enabled']
        
        return jsonify({
            "success": True,
            "webhook_url": N8N_WEBHOOK_URL,
            "enabled": N8N_ENABLED
        }), 200


@app.route('/n8n/test', methods=['GET'])
def test_n8n():
    """
    Test n8n webhook connection
    """
    try:
        test_payload = {
            "raw_text": "Test message from Emotion Recognition API - Testing n8n integration"
        }
        
        response = requests.post(
            N8N_WEBHOOK_URL,
            json=test_payload,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        return jsonify({
            "success": True,
            "status_code": response.status_code,
            "response": response.text,
            "message": "n8n webhook is responding"
        }), 200
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to connect to n8n webhook"
        }), 500


if __name__ == '__main__':
    # Set AWS credentials via environment variables or AWS CLI config
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
