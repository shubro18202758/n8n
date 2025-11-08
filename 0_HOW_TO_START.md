# 🚀 How to Start the Emotion Recognition Server with n8n Integration

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Quick Start (3 Steps)](#quick-start-3-steps)
- [Detailed Setup](#detailed-setup)
- [Starting the Server](#starting-the-server)
- [Using the Application](#using-the-application)
- [n8n Workflow Integration](#n8n-workflow-integration)
- [Testing the Integration](#testing-the-integration)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- ✅ Python 3.8 or higher installed
- ✅ AWS credentials configured (for AWS Rekognition)
- ✅ Internet connection
- ✅ n8n workflow (optional but recommended)

---

## 🎯 Quick Start (3 Steps)

### Step 1: Install Dependencies
```powershell
pip install flask flask-cors boto3 python-dotenv requests
```

### Step 2: Start the Server
```powershell
python api_server.py
```

### Step 3: Open Browser
```
http://localhost:5000
```

**That's it! You're ready to go! 🎉**

---

## 📦 Detailed Setup

### Step 1: Install All Dependencies

Open PowerShell/Terminal in the project directory (`C:\Users\sayan\n8n`) and run:

**Option A - Install individually:**
```powershell
pip install flask flask-cors boto3 python-dotenv requests
```

**Option B - Install from requirements file:**
```powershell
pip install -r requirements.txt
```

**Verify installation:**
```powershell
pip list | Select-String "flask|boto3|requests"
```

You should see all packages listed.

---

### Step 2: Configure AWS Credentials

**Option A: Create `.env` File (Recommended)**

Create a file named `.env` in the project root (`C:\Users\sayan\n8n\.env`):

```env
# AWS Configuration
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=ap-south-1
S3_BUCKET=emotion-recognition5068

# n8n Configuration
N8N_WEBHOOK_URL=https://finaldestination972003.app.n8n.cloud/webhook-test/chatbot-input
N8N_ENABLED=true

# Server Configuration (Optional)
PORT=5000
```

**Option B: Use AWS CLI**

```powershell
aws configure
```

Enter your credentials when prompted:
- AWS Access Key ID
- AWS Secret Access Key
- Default region name: `ap-south-1`
- Default output format: `json`

---

## ▶️ Starting the Server

### Method 1: Direct Python Command (Recommended)

```powershell
# Navigate to project directory
cd C:\Users\sayan\n8n

# Start the server
python api_server.py
```

### Method 2: Using Full Python Path

```powershell
C:/Users/sayan/AppData/Local/Microsoft/WindowsApps/python3.12.exe api_server.py
```

### Method 3: Background Process (New Window)

```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd C:\Users\sayan\n8n; python api_server.py"
```

---

### ✅ Server Started Successfully!

You should see output like this:

```
 * Serving Flask app 'api_server'
 * Debug mode: on
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://10.96.9.215:5000
Press CTRL+C to quit
 * Debugger is active!
```

**Server is now running on:**
- `http://localhost:5000`
- `http://127.0.0.1:5000`
- Your local network IP (shown in output)

---

## 🌐 Opening the Application

### Step 1: Open Your Browser

Navigate to any of these URLs:
- **Primary**: http://localhost:5000
- **Alternative**: http://127.0.0.1:5000

### Step 2: You Should See

- 🎭 **Beautiful Universe Background** with animated stars, galaxies, nebulas
- 📸 **Live Camera Feed** section on the left
- 🎨 **12 Camera Filters** to choose from
- ⚙️ **Settings Panel** with n8n integration controls
- 📊 **Results Panel** on the right (waiting for analysis)

---

## 🎯 Using the Application

### 1️⃣ Camera Mode (Real-time Detection)

```powershell
# Step-by-step process:
```

1. **Start Camera**
   - Click the green **"Start Camera"** button
   - Allow camera permissions if prompted
   - Live feed appears with "Live" indicator

2. **Apply Filters (Optional)**
   - Click any filter (B&W, Vintage, Warm, Cool, etc.)
   - See preview in real-time
   - Switch between filters instantly

3. **Capture & Analyze**
   - Click **"Capture & Analyze"** button
   - Wait 2-3 seconds for AWS Rekognition
   - Results appear in right panel with:
     - Primary emotion with emoji
     - Confidence percentage
     - All emotions breakdown
     - Face details (age, gender, smile, etc.)

### 2️⃣ Upload Mode (Analyze Existing Images)

1. Click **"Upload Image"** button
2. Select a JPG/PNG file from your computer
3. Image preview appears
4. Click **"Analyze Emotion"**
5. Results display immediately

### 3️⃣ n8n Integration (Automated Workflow)

**Option A: Auto-Send Mode**
```powershell
# Automatically send every detection to n8n
```
1. Toggle **"Auto-send to n8n workflow"** to ON (turns green)
2. Capture or upload any image
3. Emotion detected → Automatically sent to your n8n workflow ✨
4. Status message appears: "✅ Auto-sent to n8n workflow successfully!"

**Option B: Manual Send**
```powershell
# Send specific results when ready
```
1. Keep toggle OFF
2. Capture/upload and analyze image
3. Review the results
4. Click **"Send to n8n Workflow"** button
5. Confirmation message appears

**Option C: Test Connection**
```powershell
# Verify n8n integration is working
```
1. Click **"Test n8n Connection"** button
2. Wait 1-2 seconds
3. See status:
   - ✅ Green = Working perfectly
   - ❌ Red = Check n8n workflow is active

---

## 🔗 n8n Workflow Integration

### What Happens Behind the Scenes

When emotion is detected and sent to n8n:

```
┌─────────────────────────────────────────────────┐
│  1. User captures/uploads image                 │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  2. AWS Rekognition analyzes facial emotion     │
│     - Detects: HAPPY, SAD, ANGRY, SURPRISED...  │
│     - Confidence scores                         │
│     - Face attributes (age, gender, etc.)       │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  3. Backend formats data for n8n                │
│     - Creates descriptive text                  │
│     - Adds metadata and timestamp               │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  4. HTTP POST to n8n webhook                    │
│     URL: https://finaldestination972003.app...  │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  5. Your n8n Workflow Receives:                 │
│     {                                           │
│       "raw_text": "Person detected with HAPPY   │
│                    emotion at 95.5% confidence",│
│       "emotion_data": {                         │
│         "primary_emotion": "HAPPY",             │
│         "confidence": 95.5,                     │
│         "all_emotions": [...],                  │
│         "timestamp": "2025-11-08T...",          │
│         "faces_count": 1                        │
│       }                                         │
│     }                                           │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│  6. n8n Workflow Processes:                     │
│     - AI Agent analyzes emotion context         │
│     - Gmq Chat Model generates insights         │
│     - Simple Memory stores conversation         │
│     - HTTP requests to external services        │
│     - Emotion classification & routing          │
│     - Response sent back                        │
└─────────────────────────────────────────────────┘
```

### Your n8n Workflow Components

Based on your workflow screenshot, it includes:

1. **Webhook Trigger** - Receives emotion data from this app
2. **AI Agent (Multiple)** - Intelligent processing of emotions
3. **Gmq Chat Models** - AI-powered conversation & analysis
4. **Simple Memory** - Stores context and conversation history
5. **HTTP Request Nodes** - External API calls
6. **Merge Nodes** - Combines data streams
7. **Emotion Classification** - Routes based on detected emotions
8. **Response to Webhook** - Sends results back

### Real-World Use Cases

**Employee Monitoring:**
```
Camera → Detect SAD/ANGRY → n8n → Alert HR Manager → Log to Database
```

**Customer Service:**
```
Customer Face → Detect Emotion → n8n → CRM Update → Notify Manager if Unhappy
```

**Healthcare:**
```
Patient Emotion → n8n → Store in Medical Records → Alert Therapist
```

**Interactive AI:**
```
User Emotion → n8n → AI Analyzes → Personalized Response
```

---

## 🧪 Testing the Integration

### Quick Test Script

Run the automated test:

```powershell
python quick_test_n8n.py
```

**Expected Output:**
```
🧪 n8n Backend Integration Test
============================================================
1️⃣ Testing Server Health...
   ✅ Server is healthy!
   
2️⃣ Testing n8n Configuration...
   ✅ Configuration retrieved!
   Webhook URL: https://finaldestination972003...
   Enabled: True
   
3️⃣ Testing n8n Webhook Connection...
   ✅ n8n webhook is responding!
   
4️⃣ Sending Test Message to n8n...
   ✅ Test message sent successfully!
```

### Manual Testing in UI

1. **Test Health:**
   - Open: http://localhost:5000/health
   - Should see: `{"status":"healthy"}`

2. **Test n8n Config:**
   - Open: http://localhost:5000/n8n/config
   - Should see webhook URL and enabled status

3. **Test n8n Connection:**
   - Click "Test n8n Connection" in UI
   - Should see green ✅ success message

4. **Test Full Flow:**
   - Enable auto-send toggle
   - Capture an image
   - Check n8n workflow executions for incoming data

---

## 🛑 Stopping the Server

### Method 1: Keyboard Interrupt
Press `CTRL + C` in the terminal where server is running

### Method 2: Close Terminal
Simply close the PowerShell window

### Method 3: Kill Process
```powershell
# Find the process
Get-Process python | Where-Object {$_.Path -like "*python*"}

# Kill it (replace ID with actual process ID)
Stop-Process -Id <ProcessID> -Force
```

---

## ⚠️ Troubleshooting

### Problem: "ModuleNotFoundError: No module named 'flask'"

**Solution:**
```powershell
pip install flask flask-cors boto3 python-dotenv requests
```

### Problem: "botocore.exceptions.NoCredentialsError"

**Solution:**
Your AWS credentials are not configured. Create `.env` file:
```env
AWS_ACCESS_KEY_ID=your_actual_key
AWS_SECRET_ACCESS_KEY=your_actual_secret
AWS_REGION=ap-south-1
```

Or run: `aws configure`

### Problem: Port 5000 Already in Use

**Solution:**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual ID)
taskkill /PID <PID> /F
```

Or change port in `api_server.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # Use 5001 instead
```

### Problem: Camera Not Working

**Solutions:**
1. **Check Browser Permissions**: Allow camera access when prompted
2. **Use HTTPS**: Some browsers require HTTPS for camera. Use ngrok:
   ```powershell
   ngrok http 5000
   ```
3. **Try Different Browser**: Chrome/Edge work best

### Problem: n8n Webhook Returns 404

**Possible Causes:**
1. **n8n Workflow Not Active**
   - Open your n8n dashboard
   - Find the workflow
   - Toggle it to **Active** (green switch)

2. **Wrong Webhook URL**
   - Check your n8n workflow webhook URL
   - Update in `.env` file or via `/n8n/config` endpoint

3. **n8n Instance Sleeping**
   - n8n Cloud instances may sleep after inactivity
   - Open n8n dashboard to wake it up

### Problem: "Failed to analyze emotion"

**Possible Causes:**
1. **No Face Detected**: Make sure face is clearly visible
2. **Poor Image Quality**: Use good lighting
3. **AWS Rekognition Limits**: Check your AWS usage/billing
4. **Network Issues**: Check internet connection

**Debug Steps:**
```powershell
# Check server logs in terminal
# Look for error messages with AWS or Rekognition

# Test AWS credentials
aws sts get-caller-identity
```

### Problem: Results Panel Stays Empty

**Solutions:**
1. Open browser console (F12) and check for JavaScript errors
2. Verify server is running: http://localhost:5000/health
3. Clear browser cache and reload
4. Try different image

### Problem: Filters Not Working

**Solution:**
Filters are CSS-based and should work immediately. If not:
1. Hard refresh: `CTRL + SHIFT + R`
2. Clear browser cache
3. Check static files are loading (F12 → Network tab)

---

## 📞 Need More Help?

### Useful Commands

**Check Python version:**
```powershell
python --version
```

**Check installed packages:**
```powershell
pip list
```

**View server logs in real-time:**
Just watch the terminal where `api_server.py` is running

**Test API endpoints manually:**
```powershell
# Health check
curl http://localhost:5000/health

# n8n config
curl http://localhost:5000/n8n/config

# n8n test
curl http://localhost:5000/n8n/test
```

### Documentation Files

- `N8N_INTEGRATION_COMPLETE.md` - Full n8n integration guide
- `QUICKSTART_N8N.md` - 3-step quick start
- `README.md` - Main project documentation
- `ENHANCED_FEATURES.md` - All features explained

---

## 🎉 You're All Set!

Your emotion recognition system with n8n integration is now running!

**Quick Access:**
- 🌐 Web UI: http://localhost:5000
- 📊 Health Check: http://localhost:5000/health
- ⚙️ n8n Config: http://localhost:5000/n8n/config

**Pro Tips:**
- Enable auto-send for hands-free n8n integration
- Use filters to enhance camera appearance
- Check n8n workflow executions to see incoming data
- Keep AWS Rekognition within free tier: 5,000 images/month

Enjoy building amazing emotion-aware applications! 🚀

## 🐛 Troubleshooting

### Error: "ModuleNotFoundError: No module named 'flask'"

**Solution:** Install dependencies again
```powershell
pip install -r requirements.txt
```

### Error: "Unable to locate credentials"

**Solution:** Configure AWS credentials
```powershell
aws configure
# OR create .env file with AWS credentials
```

### Error: "Address already in use"

**Solution:** Kill the process using port 5000
```powershell
# Find the process
netstat -ano | findstr :5000

# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F

# Then restart the server
python api_server.py
```

### Server starts but can't access the UI

**Solution:** Try different URLs
- http://localhost:5000
- http://127.0.0.1:5000
- http://0.0.0.0:5000

### n8n Integration not working

**Solution:** 
1. Ensure n8n workflow is **Active** (green toggle in n8n)
2. Check webhook URL is correct in `.env` or `api_server.py`
3. Test connection using the test button

---

## 📝 Quick Commands Reference

```powershell
# Install dependencies
pip install -r requirements.txt

# Configure AWS (if not using .env)
aws configure

# Start server
python api_server.py

# Test server health
curl http://localhost:5000/health

# Test n8n connection
curl http://localhost:5000/n8n/test

# Stop server
# Press CTRL + C in the terminal
```

---

## 🎊 You're Ready!

Once the server is running, you can:
- ✅ Capture emotions from camera
- ✅ Upload images for analysis
- ✅ Apply 12 different camera filters
- ✅ Generate PDF/JSON/CSV reports
- ✅ Send results to n8n workflows
- ✅ Monitor real-time emotional well-being

**Enjoy your emotion recognition system! 🎭✨**

---

## 📚 Additional Resources

- **n8n Integration Guide**: See `README_N8N_INTEGRATION.md`
- **Complete Documentation**: See `N8N_INTEGRATION_COMPLETE.md`
- **Quick Start**: See `QUICKSTART_N8N.md`
- **Test Script**: Run `python test_n8n_integration.py`
