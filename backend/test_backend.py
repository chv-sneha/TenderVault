import requests
import sys

def test_backend(base_url="http://localhost:8000"):
    print(f"\n🧪 Testing backend at: {base_url}\n")
    
    # Test 1: Root endpoint
    try:
        response = requests.get(f"{base_url}/")
        if response.status_code == 200:
            print("✅ Root endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Root endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Cannot connect to backend: {e}")
        print("\n💡 Make sure backend is running: cd backend && python main.py")
        sys.exit(1)
    
    # Test 2: Health check
    try:
        response = requests.get(f"{base_url}/api/health")
        if response.status_code == 200:
            data = response.json()
            print("\n✅ Health check passed")
            print(f"   Algorand: {'✅' if data.get('algorand_connected') else '❌'}")
            print(f"   Gemini: {'✅' if data.get('gemini_configured') else '❌'}")
            print(f"   Firebase: {'✅' if data.get('firebase_configured') else '❌'}")
            print(f"   App ID: {data.get('app_id')}")
            print(f"   Balance: {data.get('balance_algo', 0):.2f} ALGO")
        else:
            print(f"❌ Health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health check error: {e}")
    
    # Test 3: Get tenders
    try:
        response = requests.get(f"{base_url}/api/tenders")
        if response.status_code == 200:
            data = response.json()
            tender_count = len(data.get('tenders', []))
            print(f"\n✅ Tenders endpoint working")
            print(f"   Found {tender_count} tenders")
        else:
            print(f"❌ Tenders endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Tenders endpoint error: {e}")
    
    print("\n✅ Backend is ready!\n")

if __name__ == "__main__":
    # Test local backend
    test_backend("http://localhost:8000")
