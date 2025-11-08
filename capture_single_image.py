import cv2
import boto3
import time
from datetime import datetime

# AWS Configuration
REGION = "ap-south-1"
BUCKET = "emotion-recognition5068"
FOLDER = "frames"

print("Attempting to access webcam...")
print("If you see a Windows permission prompt, please ALLOW camera access.")
print()

# Try different camera indices
cap = None
for camera_index in [0, 1, 2]:
    print(f"Trying camera index {camera_index}...")
    cap = cv2.VideoCapture(camera_index, cv2.CAP_DSHOW)  # Using DirectShow backend
    
    if cap.isOpened():
        # Try to read a frame
        ret, frame = cap.read()
        if ret:
            print(f"✓ Camera {camera_index} is working!")
            break
        else:
            cap.release()
            cap = None
    else:
        print(f"  Camera {camera_index} not available")

if cap is None or not cap.isOpened():
    print("\n❌ ERROR: Could not access any camera!")
    print("\nTroubleshooting steps:")
    print("1. Close all apps that might use camera (Chrome tabs, Teams, Zoom, etc.)")
    print("2. Check Windows Settings > Privacy > Camera")
    print("3. Make sure 'Let apps access your camera' is ON")
    print("4. Make sure 'Python' has camera permission")
    input("\nPress Enter to exit...")
    exit(1)

# Set camera properties for better performance
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

print("\n" + "="*50)
print("CAMERA READY!")
print("="*50)
print("\nInstructions:")
print("  - Position your face in front of the camera")
print("  - Press SPACE to capture and upload to S3")
print("  - Press 'q' to quit without capturing")
print("="*50)
print()

# Initialize AWS clients
s3 = boto3.client("s3", region_name=REGION)
rekognition = boto3.client("rekognition", region_name=REGION)

captured = False

while True:
    ret, frame = cap.read()
    
    if not ret:
        print("Warning: Failed to grab frame")
        time.sleep(0.1)
        continue
    
    # Display instructions on frame
    cv2.putText(frame, "Press SPACE to capture | Press Q to quit", 
                (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
    
    # Show the frame
    cv2.imshow("Webcam - Capture Image", frame)
    
    # Wait for key press
    key = cv2.waitKey(1) & 0xFF
    
    # SPACE key pressed - capture image
    if key == ord(' ') or key == 32:
        print("\n📸 Capturing image...")
        
        # Encode frame as JPEG
        ret, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 90])
        
        if not ret:
            print("❌ Failed to encode image")
            continue
        
        img_bytes = buffer.tobytes()
        
        # Generate filename with timestamp
        timestamp = int(time.time())
        key_name = f"{FOLDER}/frame_{timestamp}.jpg"
        
        try:
            # Upload to S3
            print(f"☁️  Uploading to S3: {key_name}")
            s3.put_object(Bucket=BUCKET, Key=key_name, Body=img_bytes)
            print(f"✅ Successfully uploaded to S3!")
            
            # Analyze emotion
            print("🔍 Analyzing emotion with AWS Rekognition...")
            response = rekognition.detect_faces(
                Image={'S3Object': {'Bucket': BUCKET, 'Name': key_name}},
                Attributes=['ALL']
            )
            
            face_details = response.get('FaceDetails', [])
            
            if face_details:
                emotions = sorted(
                    face_details[0].get('Emotions', []),
                    key=lambda e: e['Confidence'],
                    reverse=True
                )
                
                print("\n" + "="*50)
                print("EMOTION DETECTION RESULTS:")
                print("="*50)
                print(f"Primary Emotion: {emotions[0]['Type']}")
                print(f"Confidence: {emotions[0]['Confidence']:.2f}%")
                print("\nAll Emotions:")
                for emotion in emotions[:3]:
                    print(f"  - {emotion['Type']}: {emotion['Confidence']:.2f}%")
                print("="*50)
                
                # Display result on frame
                result_text = f"{emotions[0]['Type']} ({emotions[0]['Confidence']:.1f}%)"
                cv2.putText(frame, result_text, (10, 60), 
                           cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                cv2.putText(frame, "IMAGE CAPTURED!", (10, 100), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
                cv2.imshow("Webcam - Capture Image", frame)
                cv2.waitKey(2000)  # Show result for 2 seconds
                
            else:
                print("⚠️  No face detected in the image")
            
            print(f"\n✅ S3 Key for n8n: {key_name}")
            captured = True
            
        except Exception as e:
            print(f"❌ Error uploading to S3: {e}")
            print("\nMake sure AWS credentials are configured:")
            print("  - Run: aws configure")
            print("  - Or set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY")
        
        print("\nPress SPACE to capture another image, or Q to quit")
    
    # 'q' key pressed - quit
    elif key == ord('q'):
        print("\n👋 Exiting...")
        break

# Cleanup
cap.release()
cv2.destroyAllWindows()

if captured:
    print("\n✅ Session complete! Images uploaded to S3.")
else:
    print("\n⚠️  No images were captured.")

print("\nYou can now use the captured image in your n8n workflow!")
