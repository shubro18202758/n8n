"""
n8n Integration Test Script
Tests all n8n endpoints to verify integration is working correctly
"""

import requests
import json

API_URL = "http://localhost:5000"

def test_health():
    """Test if the server is running"""
    print("\n🔍 Testing server health...")
    try:
        response = requests.get(f"{API_URL}/health")
        if response.status_code == 200:
            print("✅ Server is healthy!")
            return True
        else:
            print(f"❌ Server returned status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Cannot connect to server: {e}")
        print("   Make sure the server is running: python api_server.py")
        return False

def test_n8n_connection():
    """Test n8n webhook connection"""
    print("\n🔍 Testing n8n webhook connection...")
    try:
        response = requests.get(f"{API_URL}/n8n/test")
        result = response.json()
        
        if result.get('success'):
            print(f"✅ n8n webhook is responding! Status: {result.get('status_code')}")
            return True
        else:
            print(f"❌ n8n connection failed: {result.get('error')}")
            return False
    except Exception as e:
        print(f"❌ Error testing n8n: {e}")
        return False

def test_n8n_config():
    """Test n8n configuration endpoint"""
    print("\n🔍 Testing n8n configuration...")
    try:
        response = requests.get(f"{API_URL}/n8n/config")
        result = response.json()
        
        print(f"📊 Current Configuration:")
        print(f"   Webhook URL: {result.get('webhook_url')}")
        print(f"   Enabled: {result.get('enabled')}")
        print("✅ Configuration retrieved successfully!")
        return True
    except Exception as e:
        print(f"❌ Error getting config: {e}")
        return False

def test_n8n_send():
    """Test manual send to n8n"""
    print("\n🔍 Testing manual send to n8n...")
    try:
        payload = {
            "raw_text": "Test message from integration test script - All systems operational!"
        }
        
        response = requests.post(
            f"{API_URL}/n8n/send",
            json=payload,
            headers={'Content-Type': 'application/json'}
        )
        result = response.json()
        
        if result.get('success'):
            print("✅ Successfully sent test message to n8n!")
            print("   Check your n8n workflow executions to see the message.")
            return True
        else:
            print(f"❌ Failed to send: {result.get('error')}")
            return False
    except Exception as e:
        print(f"❌ Error sending to n8n: {e}")
        return False

def run_all_tests():
    """Run all tests"""
    print("=" * 60)
    print("🚀 n8n Integration Test Suite")
    print("=" * 60)
    
    results = []
    
    # Test 1: Server Health
    results.append(("Server Health", test_health()))
    
    if not results[-1][1]:
        print("\n❌ Cannot proceed with other tests - server is not running!")
        return
    
    # Test 2: n8n Connection
    results.append(("n8n Connection", test_n8n_connection()))
    
    # Test 3: n8n Configuration
    results.append(("n8n Configuration", test_n8n_config()))
    
    # Test 4: Manual Send
    results.append(("n8n Manual Send", test_n8n_send()))
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Test Summary")
    print("=" * 60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name:.<40} {status}")
    
    print("\n" + "=" * 60)
    print(f"Results: {passed}/{total} tests passed")
    print("=" * 60)
    
    if passed == total:
        print("\n🎉 All tests passed! n8n integration is working perfectly!")
        print("\n📝 Next Steps:")
        print("   1. Open http://localhost:5000 in your browser")
        print("   2. Enable 'Auto-send to n8n workflow' toggle")
        print("   3. Capture/upload an image to test end-to-end")
        print("   4. Check your n8n workflow executions")
    else:
        print("\n⚠️  Some tests failed. Please check the errors above.")

if __name__ == "__main__":
    run_all_tests()
