# 🎭 ✨ Emotion Recognition with AWS - Enhanced Edition

<div align="center">

![AWS Rekognition](https://img.shields.io/badge/AWS-Rekognition-orange?style=for-the-badge&logo=amazon-aws)
![Flask](https://img.shields.io/badge/Flask-3.1.2-green?style=for-the-badge&logo=flask)
![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A stunning real-time emotion detection application powered by AWS Rekognition with beautiful universe animations, camera filters, and comprehensive reporting features.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview

This project identifies emotional well-being by analyzing facial expressions from camera feeds or uploaded images using AWS Rekognition AI. Originally designed for employee emotional monitoring and attrition prediction, it now features a stunning universe-themed UI with camera filters and advanced reporting capabilities.

### 🎯 Key Highlights

- 🌌 **Immersive Universe Background** - Animated stars, galaxies, nebulas, comets, and planets
- 📸 **12 Camera Filters** - Real-time filters like Vintage, B&W, Vibrant, Dramatic, and more
- 🎭 **AI-Powered Emotion Detection** - AWS Rekognition with custom post-processing
- 📊 **Multi-Format Reports** - Export as PDF, JSON, or CSV
- 🎨 **Beautiful Glass Morphism UI** - Modern, flamboyant design with smooth animations
- 🚀 **Real-Time Processing** - Instant camera capture and analysis
- 🔌 **n8n Integration Ready** - Workflow automation support

---

## ✨ Features

### 🎨 Visual Features

#### 🌌 Animated Universe Background
- **350+ twinkling stars** with individual drift animations
- **3 rotating spiral galaxies** with glowing cores and star clusters
- **3 comets** with glowing trails streaking across the sky
- **5 shooting stars** with fade effects
- **3 colorful nebulas** with pulsing animations
- **3 floating planets** with rotation and glow effects

#### 📸 Professional Camera Filters
| Filter | Effect |
|--------|--------|
| None | Original image |
| B&W | Classic grayscale |
| Vintage | Warm sepia tone |
| Warm | Enhanced warm colors |
| Cool | Cool blue tones |
| Vibrant | Boosted saturation |
| Dramatic | High contrast |
| Soft | Gentle blur |
| High Contrast | Bold blacks/whites |
| Invert | Negative effect |
| Pop | Super saturated |
| Psychedelic | Hue-rotated colors |

### 🤖 AI & Analysis Features

- **Emotion Detection**: HAPPY, SAD, ANGRY, SURPRISED, CALM, CONFUSED, DISGUSTED, FEAR
- **Face Details**: Age range, gender, smile detection, eyeglasses
- **Confidence Scores**: Percentage confidence for each emotion
- **Custom Post-Processing**: Reduced CALM bias with configurable sensitivity
- **Multi-Face Support**: Analyzes all detected faces

### 📊 Reporting Features

- **PDF Reports**: Professional formatted documents with images and charts
- **JSON Exports**: Structured data for API integration
- **CSV Files**: Spreadsheet-ready format for analysis
- **Timestamped Files**: Automatic naming with date/time
- **Complete Data**: All emotions, face details, and confidence scores

### 🎯 Technical Features

- **Real-Time Camera**: Live webcam feed with filter preview
- **Image Upload**: Support for JPG, PNG, and other formats
- **Responsive Design**: Works on desktop, tablet, and mobile
- **CORS Enabled**: Ready for cross-origin API calls
- **Flask REST API**: Clean API endpoints for integration
- **AWS S3 Integration**: Cloud storage for captured images

---

## 📸 Demo

### UI Screenshots

**Main Interface with Universe Background**
- Live camera feed with real-time filters
- Emotion analysis results with animated emoji
- Interactive filter selection grid
- Report generation controls

**Features in Action**
- 🎥 Real-time camera capture
- 🎨 12 professional filters
- 🎭 Emotion detection with confidence scores
- 📊 One-click report generation
- 🌌 Animated cosmic background

---

## 🚀 Installation

### Prerequisites

- Python 3.8 or higher
- AWS Account with Rekognition access
- Webcam (for camera capture)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Clone the Repository

```bash
git clone https://github.com/shreyabhandare/Emotion_detection.git
cd Emotion_detection
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

**Required packages:**
- flask==3.1.2
- flask-cors
- boto3
- opencv-python
- Pillow

### Step 3: Configure AWS Credentials

Create/edit `~/.aws/credentials`:

```ini
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
region = ap-south-1
```

Or set environment variables:

```bash
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=ap-south-1
```

### Step 4: Update Configuration

Edit `api_server.py` to set your S3 bucket name:

```python
BUCKET_NAME = 'your-bucket-name'  # Change this
REGION = 'ap-south-1'  # Change if needed
```

### Step 5: Run the Application

```bash
python api_server.py
```

The server will start at:
- http://localhost:5000
- http://your-local-ip:5000

---

## 📖 Usage

### Web Interface

1. **Open Browser**: Navigate to `http://localhost:5000`

2. **Start Camera**:
   - Click "Start Camera" button
   - Allow camera permissions
   - See live feed with filters

3. **Apply Filters**:
   - Select any filter from the grid
   - See real-time preview
   - Filters apply instantly

4. **Capture & Analyze**:
   - Click "Capture & Analyze"
   - Wait for AI processing
   - View emotion results

5. **Generate Report**:
   - Select format (PDF/JSON/CSV)
   - Click "Generate & Download Report"
   - Report downloads automatically

### Upload Image

1. Click "Upload Image" button
2. Select image from file system
3. Image is analyzed automatically
4. View results and download report

### API Usage

#### Detect Emotion from Image

```bash
POST http://localhost:5000/detect-emotion
Content-Type: application/json

{
  "image": "base64_encoded_image_data",
  "sensitivity": "high"
}
```

**Response:**
```json
{
  "primary_emotion": "HAPPY",
  "confidence": 98.5,
  "all_emotions": [
    {"emotion": "HAPPY", "confidence": 98.5},
    {"emotion": "CALM", "confidence": 1.2},
    {"emotion": "SURPRISED", "confidence": 0.3}
  ],
  "faces_count": 1,
  "face_details": {
    "age_range": {"Low": 25, "High": 35},
    "gender": {"Value": "Female", "Confidence": 99.8},
    "smile": {"Value": true, "Confidence": 95.2},
    "eyeglasses": {"Value": false, "Confidence": 98.7}
  }
}
```

#### Sensitivity Levels

- `low`: CALM needs 95% confidence
- `medium`: CALM needs 85% confidence (default)
- `high`: CALM needs 70% confidence

---

## 📁 Project Structure

```
Emotion-Recognition-with-AWS/
├── api_server.py                 # Flask REST API server
├── capture_single_image.py       # Standalone camera capture script
├── detect_emotion.py             # Core emotion detection logic
├── lambda_function.py            # AWS Lambda function (optional)
├── requirements.txt              # Python dependencies
├── README.md                     # This file
├── ENHANCED_FEATURES.md          # Detailed features documentation
├── UI_README.md                  # UI-specific documentation
├── N8N_INTEGRATION.md            # n8n workflow guide
├── LICENSE                       # MIT License
│
├── templates/
│   └── index.html               # Main web interface
│
├── static/
│   ├── css/
│   │   └── style.css            # Styles with animations
│   └── js/
│       └── app.js               # Frontend JavaScript
│
└── (additional utility scripts)
```

---

## 🔧 Configuration

### Flask Server (`api_server.py`)

```python
# Server settings
HOST = '0.0.0.0'  # Listen on all interfaces
PORT = 5000
DEBUG = True

# AWS settings
BUCKET_NAME = 'your-bucket-name'
REGION = 'ap-south-1'

# CORS settings
CORS(app)  # Enable all origins
```

### Post-Processing Thresholds

```python
SENSITIVITY_THRESHOLDS = {
    'low': {'min_confidence': 95, 'ratio': 1.8},
    'medium': {'min_confidence': 85, 'ratio': 1.4},
    'high': {'min_confidence': 70, 'ratio': 1.1}
}
```

---

## 🌐 API Documentation

### Endpoints

#### `GET /`
Serves the main web interface.

#### `POST /detect-emotion`
Analyzes a single image for emotions.

**Request Body:**
```json
{
  "image": "base64_string",
  "sensitivity": "medium"  // optional: low, medium, high
}
```

**Response:** See [API Usage](#api-usage) section.

#### `POST /detect-emotion-batch`
Analyzes multiple images (future feature).

---

## 🔌 Integrations

### n8n Workflow Automation

See [N8N_INTEGRATION.md](N8N_INTEGRATION.md) for complete setup guide.

**Quick Setup:**
1. Install n8n: `npm install -g n8n`
2. Import workflow from `n8n_workflow_example.json`
3. Configure webhook URL
4. Use ngrok for public access (if needed)

### AWS Lambda Deployment

See [lambda_function.py](lambda_function.py) for Lambda handler.

**Steps:**
1. Package code with dependencies
2. Upload to Lambda
3. Set up API Gateway
4. Configure IAM roles

---

## 🎨 Customization

### Change Color Scheme

Edit `static/css/style.css`:

```css
:root {
    --primary: #6366f1;      /* Primary color */
    --secondary: #ec4899;     /* Secondary color */
    --success: #10b981;       /* Success color */
    /* ... more variables */
}
```

### Add Custom Filters

1. Add CSS filter in `style.css`:
```css
.filter-custom { filter: hue-rotate(45deg) saturate(120%); }
#video-feed.filter-custom { filter: hue-rotate(45deg) saturate(120%); }
```

2. Add button in `index.html`:
```html
<button class="filter-btn" data-filter="custom">
    <div class="filter-preview filter-custom"></div>
    <span>Custom</span>
</button>
```

### Modify Universe Animation

Edit CSS animations in `style.css`:
- Adjust star count in `app.js`: `createStarLayer(container, 250, 'small', 1)`
- Change galaxy rotation speed: `animation: rotateGalaxy 120s linear infinite;`
- Modify nebula pulse timing: `animation: nebulaPulse 20s ease-in-out infinite;`

---

## 🐛 Troubleshooting

### Camera Not Working
- **Check permissions**: Browser needs camera access
- **Windows**: Try DirectShow backend in OpenCV
- **Mac/Linux**: Check privacy settings

### AWS Connection Issues
- **Verify credentials**: Check `~/.aws/credentials`
- **Check region**: Ensure Rekognition available in your region
- **IAM permissions**: Need `rekognition:DetectFaces` permission

### Flask Server Errors
- **Port in use**: Change port in `api_server.py`
- **Missing dependencies**: Run `pip install -r requirements.txt`
- **CORS issues**: Ensure `flask-cors` is installed

### UI Not Loading
- **Clear browser cache**: Hard refresh (Ctrl+Shift+R)
- **Check console**: Open browser DevTools (F12)
- **File paths**: Ensure static files are in correct location

---

## 📊 Performance

### Benchmarks
- **API Response Time**: ~500-1000ms (AWS Rekognition)
- **UI Rendering**: 60 FPS animations
- **Camera Capture**: Real-time at 30 FPS
- **Filter Application**: Instant (<16ms)

### Optimization Tips
- Use local Rekognition for lower latency
- Implement caching for repeated analyses
- Compress images before upload
- Use CDN for static assets in production

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit changes**: `git commit -m 'Add AmazingFeature'`
4. **Push to branch**: `git push origin feature/AmazingFeature`
5. **Open Pull Request**

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint for JavaScript
- Add comments for complex logic
- Update documentation
- Test thoroughly

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**Shreya Bhandare**
- GitHub: [@shreyabhandare](https://github.com/shreyabhandare)
- Repository: [Emotion_detection](https://github.com/shreyabhandare/Emotion_detection)

---

## 🙏 Acknowledgments

- **AWS Rekognition** - Powerful emotion detection AI
- **Flask** - Lightweight web framework
- **OpenCV** - Computer vision capabilities
- **Modern CSS** - Animation and design inspiration
- **Open Source Community** - Various libraries and tools

---

## 📞 Support

Having issues? Want to contribute?

- 📧 **Issues**: [GitHub Issues](https://github.com/shreyabhandare/Emotion_detection/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/shreyabhandare/Emotion_detection/discussions)
- 📖 **Documentation**: See [ENHANCED_FEATURES.md](ENHANCED_FEATURES.md)

---

## 🗺️ Roadmap

### Version 2.1 (Planned)
- [ ] Video stream analysis
- [ ] Multiple face tracking
- [ ] Emotion timeline charts
- [ ] Dark mode toggle
- [ ] Custom filter builder

### Version 3.0 (Future)
- [ ] Mobile app (React Native)
- [ ] Real-time WebSocket updates
- [ ] Advanced analytics dashboard
- [ ] Machine learning model training
- [ ] Multi-language support

---

<div align="center">

**Made with ❤️ and lots of ✨**

⭐ Star this repo if you find it useful!

[⬆ Back to Top](#--emotion-recognition-with-aws---enhanced-edition)

</div>
