# 🎭🔗 Emotion Recognition ↔️ n8n Integration

## 🎊 INTEGRATION COMPLETE!

Your AWS Rekognition-powered emotion detection system is now **fully integrated** with your n8n workflow!

---

## ⚡ Quick Start (3 Steps)

### 1. Install & Run

```powershell
# Install dependencies
pip install -r requirements.txt

# Start server
python api_server.py
```

### 2. Open UI

Open browser: **http://localhost:5000**

### 3. Test n8n

Click **"Test n8n Connection"** button → See green ✅

---

## 🎯 Features Added

### 🔄 Auto-Send Mode
- Toggle ON → Every emotion detection automatically sent to n8n
- Real-time workflow triggering
- Perfect for continuous monitoring

### 🚀 Manual Send
- Analyze first, send later
- Review results before triggering workflow
- Full control over what gets sent

### 🧪 Connection Test
- One-click webhook verification
- Instant feedback
- Peace of mind

### 📊 Status Display
- Real-time success/error messages
- Color-coded indicators (green/red/blue)
- Always know what's happening

---

## 📡 Your n8n Workflow

**Webhook URL (Pre-configured):**
```
https://finaldestination972003.app.n8n.cloud/webhook-test/chatbot-input
```

**What Your Workflow Receives:**
```json
{
  "raw_text": "Person detected with HAPPY emotion at 95.5% confidence",
  "emotion_data": {
    "primary_emotion": "HAPPY",
    "confidence": 95.5,
    "all_emotions": [...],
    "timestamp": "2025-11-08T...",
    "faces_count": 1
  }
}
```

**Your Workflow Components:**
- 📥 Webhook Trigger
- 🤖 AI Agent (Multiple)
- 💬 Gmq Chat Models
- 🧠 Simple Memory
- 🌐 HTTP Requests
- 🎭 Emotion Classification
- 📤 Response to Webhook

---

## 🎨 UI Controls (Left Panel)

```
┌─────────────────────────────────────┐
│  🔗 n8n Workflow Integration        │
├─────────────────────────────────────┤
│  [Toggle] Auto-send to n8n workflow │
│  🟢 ON / ⚪ OFF                      │
├─────────────────────────────────────┤
│  [Button] 🚀 Send to n8n Workflow   │
│  [Button] 🧪 Test n8n Connection    │
├─────────────────────────────────────┤
│  [Status Messages Appear Here]      │
│  ✅ Success / ❌ Error / 🔄 Loading │
└─────────────────────────────────────┘
```

---

## 🔥 Use Cases

### 1️⃣ **Real-Time Employee Monitoring**
```
Camera → Emotion Detection → n8n → Alert if negative emotions
```

### 2️⃣ **Customer Sentiment Analysis**
```
Customer face → Analyze → n8n → Log to CRM → Notify manager
```

### 3️⃣ **Healthcare/Therapy**
```
Patient emotion → n8n → Store session → Generate report → Email
```

### 4️⃣ **Interactive AI Chatbot**
```
User emotion → n8n → AI analyzes → Personalized response
```

---

## 🧪 Test Everything

### Run Automated Tests
```powershell
python test_n8n_integration.py
```

**Tests:**
- ✅ Server health
- ✅ n8n connection  
- ✅ Configuration
- ✅ Manual send

### Manual UI Test
1. Open http://localhost:5000
2. Click "Test n8n Connection"
3. See green success message ✅
4. Capture image with auto-send ON
5. Check n8n workflow executions

---

## 📊 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/detect-emotion` | POST | Detect emotion (with optional `send_to_n8n: true`) |
| `/n8n/send` | POST | Manually send data to n8n |
| `/n8n/config` | GET/POST | Get/update webhook configuration |
| `/n8n/test` | GET | Test n8n connection |

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `N8N_INTEGRATION_COMPLETE.md` | 📖 Complete guide with examples |
| `QUICKSTART_N8N.md` | ⚡ Quick 3-step setup |
| `N8N_INTEGRATION_SUMMARY.md` | 📊 Summary of changes |
| `test_n8n_integration.py` | 🧪 Automated test script |

---

## ✨ What Changed

### Backend (`api_server.py`)
- ✅ n8n webhook configuration
- ✅ `send_to_n8n_workflow()` function
- ✅ Auto-send support in `/detect-emotion`
- ✅ 3 new endpoints: `/n8n/send`, `/n8n/config`, `/n8n/test`

### Frontend (`templates/index.html`)
- ✅ n8n control panel
- ✅ Toggle switch
- ✅ 2 action buttons
- ✅ Status display

### JavaScript (`static/js/app.js`)
- ✅ `sendToN8N()` function
- ✅ `testN8NConnection()` function
- ✅ Auto-send integration
- ✅ Event listeners

### CSS (`static/css/style.css`)
- ✅ Toggle switch styles
- ✅ Status message styles
- ✅ Animations

### Dependencies (`requirements.txt`)
- ✅ Added `requests` library

---

## 🎉 You're All Set!

### ✅ Integration Complete
- Backend API ✅
- Frontend UI ✅
- n8n Workflow ✅
- Documentation ✅
- Tests ✅

### 🚀 Next Steps

1. **Test the integration**
   ```powershell
   python test_n8n_integration.py
   ```

2. **Open the UI**
   ```
   http://localhost:5000
   ```

3. **Enable auto-send and capture!**
   - Toggle ON
   - Capture image
   - Watch it flow to n8n! 🎊

4. **Check n8n executions**
   - See your workflow processing emotions in real-time

5. **Customize your workflow**
   - Add your business logic
   - Store data, send notifications, trigger actions

---

## 💡 Pro Tips

- 💚 **Use auto-send for live monitoring** - Great for CCTV feeds
- 🎯 **Use manual send for quality control** - Review before sending
- 🧪 **Test connection regularly** - Ensure n8n is always ready
- 📊 **Monitor n8n executions** - Track workflow health
- 🔐 **Add authentication if needed** - Secure your endpoints

---

## 🆘 Need Help?

### Problem: Connection Failed?
1. Check n8n workflow is **Active** (green toggle)
2. Verify webhook URL is correct
3. Test webhook directly with curl

### Problem: Auto-send Not Working?
1. Check toggle is ON (green)
2. Verify emotion detection completes
3. Look for status message
4. Check browser console (F12)

### More Help
- See `N8N_INTEGRATION_COMPLETE.md` for troubleshooting
- Check n8n execution logs for errors

---

## 🎊 Success Checklist

- ✅ Server starts without errors
- ✅ Test script shows all green
- ✅ UI loads correctly
- ✅ Test connection button works
- ✅ Auto-send toggle responds
- ✅ Emotion detection works
- ✅ Data appears in n8n workflow
- ✅ Status messages display properly

---

**🚀 Start detecting emotions and watch the magic happen! ✨🎭**

Made with ❤️ using AWS Rekognition, Flask, and n8n
