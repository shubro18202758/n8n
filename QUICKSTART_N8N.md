# 🚀 Quick Start - n8n Integration

## ⚡ 3-Step Setup

### 1️⃣ Install Dependencies

```powershell
pip install -r requirements.txt
```

### 2️⃣ Start the Server

```powershell
python api_server.py
```

### 3️⃣ Open the UI

Open browser: `http://localhost:5000`

---

## ✅ n8n Integration is Ready!

Your n8n webhook is pre-configured:
```
https://finaldestination972003.app.n8n.cloud/webhook-test/chatbot-input
```

---

## 🎯 How to Use

### **Auto-Send Mode** (Recommended)

1. Toggle **"Auto-send to n8n workflow"** ON
2. Capture/upload image
3. Results automatically sent to n8n! ✨

### **Manual Mode**

1. Capture/upload image
2. Review results
3. Click **"Send to n8n Workflow"**

### **Test Connection**

Click **"Test n8n Connection"** to verify setup.

---

## 📊 What Gets Sent to n8n

```json
{
  "raw_text": "Person detected with HAPPY emotion at 95.5% confidence",
  "emotion_data": {
    "primary_emotion": "HAPPY",
    "confidence": 95.5,
    "all_emotions": [...],
    "timestamp": "2025-11-08T10:30:00.000Z"
  }
}
```

---

## 🎉 You're Done!

Everything is integrated and ready to go!

For detailed documentation, see: `N8N_INTEGRATION_COMPLETE.md`
