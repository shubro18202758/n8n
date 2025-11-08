# 🎭 Emotion Recognition AI - Beautiful Web UI

A stunning, modern web interface for AWS Rekognition emotion detection with real-time camera support and intelligent analysis.

## ✨ Features

### 🎨 Visual Design
- **Flamboyant gradient animations** - Dynamic background with smooth color transitions
- **Glass morphism effects** - Modern frosted glass cards with blur effects
- **Smooth animations** - Bouncing emojis, sliding panels, glowing text
- **Responsive layout** - Works perfectly on desktop, tablet, and mobile
- **Real-time camera feed** - Live video preview with status indicators

### 🚀 Functionality
- **Live Camera Capture** - Access webcam and capture images in real-time
- **File Upload** - Upload existing images for analysis
- **Intelligent Emotion Detection** - AWS Rekognition powered analysis
- **Configurable Sensitivity** - Low/Medium/High settings to reduce CALM bias
- **Auto-Analyze Mode** - Automatic emotion detection on capture
- **Detailed Results** - Full emotion breakdown with confidence scores
- **Face Details** - Age range, gender, smile detection, eyeglasses

### 🎯 Emotion Detection
Detects 8 emotions:
- 😊 HAPPY
- 😢 SAD
- 😠 ANGRY
- 😲 SURPRISED
- 😌 CALM
- 😕 CONFUSED
- 🤢 DISGUSTED
- 😨 FEAR

## 🚀 Quick Start

### 1. Start the Server
```bash
cd "c:\Users\Shreya\Downloads\Emotion-Recognition-with-AWS-main (1)\Emotion-Recognition-with-AWS-main"
python api_server.py
```

### 2. Open in Browser
Navigate to: **http://localhost:5000**

### 3. Use the Interface
1. Click **"Start Camera"** to enable webcam
2. Position your face in the camera view
3. Click **"Capture & Analyze"** or use **"Upload Image"**
4. View detailed emotion analysis results!

## 🎨 UI Components

### Left Panel - Camera & Controls
- **Live camera feed** with glass morphism overlay
- **Start/Stop Camera** buttons with gradient effects
- **Capture & Analyze** - Primary action button
- **Upload Image** - Alternative input method
- **Analysis Settings**:
  - Sensitivity control (Low/Medium/High)
  - Auto-analyze toggle

### Right Panel - Results
- **Primary emotion display** with animated emoji
- **Confidence percentage** with large typography
- **Detailed breakdown** with animated progress bars
- **Face details** including age, gender, smile, eyeglasses

## 🔧 Configuration

### Sensitivity Settings
Control how strict the CALM emotion filtering is:

- **Low** - More permissive, CALM appears more often
- **Medium** (default) - Balanced approach
- **High** - Strict filtering, reduces CALM dominance

### Auto-Analyze
- **On** - Automatically analyzes after capture
- **Off** - Manual analysis only

## 🎭 Design Highlights

### Color Palette
- Primary gradient: Purple to Pink (`#667eea → #764ba2`)
- Secondary gradient: Pink to Red (`#f093fb → #f5576c`)
- Accent gradient: Blue to Cyan (`#4facfe → #00f2fe`)

### Animations
- Gradient background shift (15s cycle)
- Card hover effects with scale & shadow
- Emotion emoji pop animation
- Progress bar shimmer effect
- Loading spinner with blur overlay
- Toast notifications

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300 (light), 400 (regular), 600 (semibold), 700 (bold), 800 (extrabold)
- **Large headings** with gradient text fill
- **Smooth text shadows** for depth

## 📱 Responsive Design

### Desktop (1400px+)
- Two-column grid layout
- Full-size camera feed
- Large emotion displays

### Tablet (768px - 1024px)
- Single column layout
- Optimized button sizes
- Adjusted font scaling

### Mobile (< 768px)
- Stacked layout
- Full-width buttons
- Compact emoji sizes
- Touch-optimized controls

## 🔌 Integration with n8n

The UI is ready for n8n backend integration:

### Current Setup
- Frontend calls local Flask API at `http://localhost:5000`
- `/detect-emotion` endpoint with sensitivity parameter
- Base64 image transmission

### Future n8n Integration
1. Update `API_URL` in `/static/js/app.js`
2. Point to your n8n webhook endpoint
3. n8n workflow will handle:
   - Image reception
   - AWS Rekognition call
   - Response formatting
   - Return results to UI

### n8n Workflow Structure
```
Webhook Trigger 
  → Receive base64 image
  → HTTP Request to AWS Rekognition
  → Post-process emotions (reduce CALM)
  → Return JSON response
```

## 🎨 Customization

### Change Colors
Edit `/static/css/style.css`:
```css
:root {
    --primary: #your-color;
    --secondary: #your-color;
    --gradient: linear-gradient(135deg, #start, #end);
}
```

### Modify Animations
Adjust timing in CSS:
```css
animation: gradientShift 15s ease infinite; /* Change 15s */
```

### Add More Emotions
Update `app.js`:
```javascript
const emotionEmojis = {
    'YOUR_EMOTION': '😎',
    ...
};
```

## 📊 API Response Format

```json
{
  "success": true,
  "primary_emotion": "HAPPY",
  "confidence": 95.5,
  "all_emotions": [
    {"emotion": "HAPPY", "confidence": 95.5},
    {"emotion": "CALM", "confidence": 2.3}
  ],
  "face_details": {
    "age_range": {"Low": 18, "High": 22},
    "gender": {"Value": "Female", "Confidence": 99.8},
    "smile": {"Value": true, "Confidence": 95.2},
    "eyeglasses": {"Value": false, "Confidence": 99.1}
  }
}
```

## 🌟 Features to Add Later

- [ ] Multi-face detection support
- [ ] Emotion history graph
- [ ] Export results to CSV/PDF
- [ ] Real-time emotion tracking
- [ ] Comparison mode (before/after)
- [ ] Dark/Light theme toggle
- [ ] Voice feedback
- [ ] Integration with external webhooks

## 🎯 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📝 Notes

- Camera access requires HTTPS in production
- For local development, HTTP works fine
- Ensure AWS credentials are configured
- ngrok tunnel required for n8n.cloud access

## 🎉 Enjoy Your Beautiful Emotion Recognition UI!

The interface is now live and ready to use. Access it at **http://localhost:5000** and experience the flamboyant design with powerful AWS emotion detection!
