# Emotion Recognition API for n8n Integration

## Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set AWS Credentials
Create a `.env` file:
```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
S3_BUCKET=emotion-recognition5068
```

Or configure AWS CLI:
```bash
aws configure
```

### 3. Run the API Server
```bash
python api_server.py
```

The server will run on `http://localhost:5000`

---

## API Endpoints for n8n

### 1. **POST /detect-emotion** - Detect emotion from single image

**Request (Base64):**
```json
{
  "image": "base64_encoded_image_string"
}
```

**Request (S3 Key):**
```json
{
  "s3_key": "frames/frame_123456.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "faces_count": 1,
  "primary_emotion": "HAPPY",
  "confidence": 98.5,
  "all_emotions": [
    {"emotion": "HAPPY", "confidence": 98.5},
    {"emotion": "CALM", "confidence": 1.2}
  ],
  "face_details": {
    "age_range": {"Low": 25, "High": 35},
    "gender": {"Value": "Female", "Confidence": 99.8}
  }
}
```

### 2. **POST /detect-emotion-batch** - Process multiple images

**Request:**
```json
{
  "images": [
    {"image": "base64_string_1"},
    {"image": "base64_string_2"}
  ]
}
```

### 3. **POST /add-face-to-collection** - Add face for recognition

**Request:**
```json
{
  "image": "base64_encoded_image",
  "collection_id": "Collection",
  "external_id": "employee_123"
}
```

### 4. **GET /health** - Health check

---

## n8n Workflow Integration

### Option A: HTTP Request Node

1. **Add HTTP Request Node** in n8n
2. **Configure:**
   - Method: `POST`
   - URL: `http://localhost:5000/detect-emotion`
   - Authentication: None (or add API key if needed)
   - Body Content Type: `JSON`
   - Body:
   ```json
   {
     "image": "{{$json.imageBase64}}"
   }
   ```

3. **Response will contain:**
   - Primary emotion detected
   - Confidence score
   - All emotions with probabilities
   - Age, gender, smile detection

### Option B: Webhook Trigger

**Example n8n Workflow:**
```
Webhook Trigger → HTTP Request (API) → IF Node (emotion check) → Actions
```

**Use Cases:**
- Trigger alert if "SAD" or "ANGRY" detected > 70%
- Send Slack notification for specific emotions
- Store results in database
- Generate reports

### Option C: Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "api_server.py"]
```

Build & Run:
```bash
docker build -t emotion-api .
docker run -p 5000:5000 -e AWS_ACCESS_KEY_ID=xxx -e AWS_SECRET_ACCESS_KEY=yyy emotion-api
```

---

## n8n Workflow Examples

### Example 1: Email Alert on Negative Emotion
```
1. Schedule Trigger (every hour)
2. HTTP Request → /detect-emotion (check latest CCTV frame)
3. IF Node → Check if emotion is "SAD" or "ANGRY"
4. Send Email → HR team notification
```

### Example 2: Real-time Emotion Dashboard
```
1. Webhook → Receive image from external system
2. HTTP Request → /detect-emotion
3. Set Node → Format data
4. HTTP Request → Send to dashboard API
5. Save to Google Sheets
```

### Example 3: Batch Processing
```
1. Read Binary Files (folder of images)
2. HTTP Request → /detect-emotion-batch
3. Aggregate Results
4. Generate Report (PDF/Excel)
5. Send via Email
```

---

## Deployment Options for n8n Access

### Local Development
- Run API on `localhost:5000`
- Run n8n locally or in Docker
- Connect via `http://localhost:5000`

### Cloud Deployment
- **AWS EC2/Lambda**: Deploy Flask API
- **Heroku**: Push to Heroku
- **Railway/Render**: One-click deploy
- **Cloud Run (GCP)**: Containerized deployment

Then use public URL in n8n: `https://your-api.herokuapp.com/detect-emotion`

---

## Security (Production)

Add API key authentication to `api_server.py`:

```python
from functools import wraps

API_KEY = os.getenv('API_KEY', 'your-secret-key')

def require_api_key(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        key = request.headers.get('X-API-Key')
        if key != API_KEY:
            return jsonify({"error": "Invalid API key"}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/detect-emotion', methods=['POST'])
@require_api_key
def detect_emotion():
    # ... existing code
```

Then in n8n, add header:
```
X-API-Key: your-secret-key
```

---

## Testing

```bash
# Test with curl
curl -X POST http://localhost:5000/detect-emotion \
  -H "Content-Type: application/json" \
  -d '{"s3_key": "frames/test.jpg"}'

# Test with base64 image
curl -X POST http://localhost:5000/detect-emotion \
  -H "Content-Type: application/json" \
  -d '{"image": "'$(base64 -w 0 image.jpg)'"}'
```

---

## Troubleshooting

- **AWS credentials**: Ensure AWS CLI is configured or `.env` file exists
- **Bucket permissions**: S3 bucket must allow read/write
- **Rekognition limits**: Check AWS service quotas
- **n8n connection**: Ensure API is accessible from n8n instance
