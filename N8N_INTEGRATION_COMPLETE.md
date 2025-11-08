# 🚀 n8n Workflow Integration - Complete Guide

## ✅ Integration Complete!

Your emotion recognition system is now fully integrated with your n8n workflow!

---

## 🎯 What Was Integrated

### **Backend Integration** (`api_server.py`)

1. **Automatic n8n sending** during emotion detection
2. **New API endpoints**:
   - `POST /n8n/send` - Manually send data to n8n
   - `GET /n8n/config` - Get/update n8n configuration
   - `GET /n8n/test` - Test n8n webhook connection
   - `POST /n8n/config` - Update webhook URL & settings

3. **Smart data formatting** for your workflow:
   ```json
   {
     "raw_text": "Person detected with HAPPY emotion at 95.5% confidence, age approximately 25-35, Female gender",
     "emotion_data": {
       "primary_emotion": "HAPPY",
       "confidence": 95.5,
       "all_emotions": [...],
       "timestamp": "2025-11-08T10:30:00.000Z",
       "faces_count": 1
     }
   }
   ```

### **Frontend Integration** (`index.html` + `app.js` + `style.css`)

1. **n8n Controls Panel** with:
   - ✅ **Auto-send Toggle** - Automatically send every detection to n8n
   - 🚀 **Manual Send Button** - Send specific results on demand
   - 🧪 **Test Connection Button** - Verify n8n webhook is working
   - 📊 **Status Display** - Real-time feedback on n8n operations

2. **Visual Feedback**:
   - Success/error messages
   - Color-coded status indicators
   - Smooth animations

---

## 🔧 How to Use

### **1. Start Your Backend**

```powershell
# Install dependencies (if not already done)
pip install -r requirements.txt

# Run the server
python api_server.py
```

Server will start at: `http://localhost:5000`

### **2. Configure n8n Webhook** (Already Set!)

Your n8n webhook URL is pre-configured:
```
https://finaldestination972003.app.n8n.cloud/webhook-test/chatbot-input
```

### **3. Using the UI**

#### **Option A: Auto-Send Mode**
1. Open `http://localhost:5000` in your browser
2. Toggle **"Auto-send to n8n workflow"** ON (green)
3. Capture/upload an image
4. Results are automatically sent to n8n! ✨

#### **Option B: Manual Send**
1. Capture/upload an image to analyze
2. Review the emotion results
3. Click **"Send to n8n Workflow"** button when ready
4. Watch the status message appear

#### **Option C: Test Connection**
1. Click **"Test n8n Connection"** button
2. Verify green success message
3. Check your n8n workflow executions

---

## 📡 API Examples

### **Test n8n Connection**
```bash
curl http://localhost:5000/n8n/test
```

**Response:**
```json
{
  "success": true,
  "status_code": 200,
  "message": "n8n webhook is responding"
}
```

### **Manual Send to n8n**
```bash
curl -X POST http://localhost:5000/n8n/send \
  -H "Content-Type: application/json" \
  -d '{
    "raw_text": "I am feeling very happy today!"
  }'
```

### **Detect Emotion with Auto-Send**
```bash
curl -X POST http://localhost:5000/detect-emotion \
  -H "Content-Type: application/json" \
  -d '{
    "image": "<base64_image_here>",
    "send_to_n8n": true
  }'
```

### **Get/Update n8n Config**
```bash
# Get current config
curl http://localhost:5000/n8n/config

# Update webhook URL
curl -X POST http://localhost:5000/n8n/config \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_url": "https://your-new-webhook-url.com",
    "enabled": true
  }'
```

---

## 🎭 Your n8n Workflow Integration

### **What Your Workflow Receives**

**Input Format:**
```json
{
  "raw_text": "Person detected with HAPPY emotion at 95.5% confidence, age approximately 25-35, Female gender",
  "emotion_data": {
    "primary_emotion": "HAPPY",
    "confidence": 95.5,
    "all_emotions": [
      {"emotion": "HAPPY", "confidence": 95.5},
      {"emotion": "CALM", "confidence": 3.2},
      {"emotion": "SURPRISED", "confidence": 1.3}
    ],
    "timestamp": "2025-11-08T10:30:00.000Z",
    "faces_count": 1
  }
}
```

### **Your Workflow Components** (from your screenshot)

1. **Webhook Trigger** ✅ - Receives emotion data
2. **AI Agents** - Process the emotion data
3. **Gmq Chat Models** - AI-powered analysis
4. **Simple Memory** - Context retention
5. **HTTP Requests** - External API calls
6. **Emotion Classification** - Further processing
7. **Response to Webhook** - Send results back

---

## 🔐 Environment Variables (Optional)

Create a `.env` file for configuration:

```env
# AWS Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
S3_BUCKET=emotion-recognition5068

# n8n Configuration
N8N_WEBHOOK_URL=https://finaldestination972003.app.n8n.cloud/webhook-test/chatbot-input
N8N_ENABLED=true

# Server Configuration
PORT=5000
```

---

## 🎨 UI Features

### **n8n Integration Panel**

Located in the left panel under "Settings & Reports":

```
🔗 n8n Workflow Integration
   [Toggle] Auto-send to n8n workflow
   [Button] Send to n8n Workflow
   [Button] Test n8n Connection
   [Status] Success/Error messages appear here
```

### **Status Messages**

- 🔄 **Blue**: Processing/Testing
- ✅ **Green**: Success
- ❌ **Red**: Error

---

## 🧪 Testing Workflow

### **1. Test Connection**
```
Click "Test n8n Connection" → Should see green success
```

### **2. Test Manual Detection**
```
1. Start camera
2. Capture image
3. Wait for emotion analysis
4. Click "Send to n8n Workflow"
5. Check n8n workflow executions
```

### **3. Test Auto-Send**
```
1. Enable "Auto-send to n8n workflow" toggle
2. Capture multiple images
3. Each detection automatically sent to n8n!
```

---

## 🚨 Troubleshooting

### **Problem: "n8n connection failed"**

**Solutions:**
1. Check n8n workflow is **Active** (green toggle in n8n)
2. Verify webhook URL is correct
3. Test webhook directly:
   ```bash
   curl -X POST https://finaldestination972003.app.n8n.cloud/webhook-test/chatbot-input \
     -H "Content-Type: application/json" \
     -d '{"raw_text": "test"}'
   ```

### **Problem: "Auto-send not working"**

**Solutions:**
1. Check toggle is ON (green)
2. Verify emotion detection completes successfully
3. Look for n8n status message after analysis
4. Check browser console for errors (F12)

### **Problem: "Timeout error"**

**Solutions:**
1. n8n workflow might be taking too long
2. Check n8n workflow execution logs
3. Simplify workflow or increase timeout in code

---

## 📊 Monitoring n8n Integration

### **In Your Application**
- Status messages appear below n8n buttons
- Browser console shows detailed logs
- Success/error notifications

### **In n8n Dashboard**
1. Go to your n8n workflow
2. Click "Executions" tab
3. See all incoming requests from your app
4. Debug any failures

---

## 🎯 Use Cases

### **1. Real-Time Employee Monitoring**
```
Auto-send ON → Every face detection → n8n workflow → 
→ Store in database → Alert if negative emotions detected
```

### **2. Customer Sentiment Analysis**
```
Capture customer emotion → Send to n8n → 
→ Log to CRM → Notify manager if unhappy
```

### **3. Healthcare/Therapy Applications**
```
Patient emotion detection → n8n workflow → 
→ Store session data → Generate reports → Email therapist
```

### **4. Interactive AI Chatbot**
```
Detect user emotion → Send to n8n → AI Agent analyzes → 
→ Personalized response based on emotion
```

---

## 🎉 Success Indicators

You'll know it's working when:

✅ Test connection shows green success message  
✅ Manual send displays "Successfully sent to n8n"  
✅ Auto-send shows automatic success after each detection  
✅ n8n workflow executions show incoming requests  
✅ No error messages in status display  

---

## 📝 Next Steps

1. ✅ **Test the integration** - Use the test button
2. ✅ **Customize n8n workflow** - Add your business logic
3. ✅ **Set up notifications** - Email, Slack, SMS, etc.
4. ✅ **Store data** - Database, Google Sheets, Airtable
5. ✅ **Add authentication** - Secure your endpoints if needed

---

## 🔗 Related Files

- **Backend**: `api_server.py` (lines 1-350+)
- **Frontend HTML**: `templates/index.html` (lines 164-186)
- **Frontend JS**: `static/js/app.js` (n8n section added)
- **Frontend CSS**: `static/css/style.css` (toggle switch styles)
- **Dependencies**: `requirements.txt` (includes `requests`)

---

## 💡 Pro Tips

1. **Enable auto-send for continuous monitoring** - Great for live CCTV feeds
2. **Use manual send for quality control** - Review before sending
3. **Test connection regularly** - Ensure n8n is always ready
4. **Check n8n executions** - Monitor your workflow health
5. **Add error handling in n8n** - Gracefully handle failures

---

## 🎊 You're All Set!

Your emotion recognition system is now seamlessly integrated with your n8n workflow. Every emotion detected can be processed, stored, analyzed, and actioned through your powerful n8n automation!

**Start detecting emotions and watch the magic happen! ✨🎭🚀**
