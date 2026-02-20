import requests
import json
from datetime import datetime, timedelta

BASE_URL = "https://clearbid-backend-1.onrender.com"

# Mock Tenders
tenders = [
    {
        "title": "Hospital Medical Equipment Procurement",
        "description": "Procurement of advanced medical equipment including MRI machines, CT scanners, and ventilators for government hospital",
        "criteria": {"Technical Specifications": 40, "Price": 30, "Delivery Timeline": 20, "After-Sales Support": 10},
        "deadline": (datetime.now() + timedelta(days=30)).isoformat(),
        "organization": "Government General Hospital",
        "orgType": "Government",
        "budget": 50000000,
        "user_id": "demo_org_001",
        "email": "procurement@govhospital.in"
    },
    {
        "title": "University Campus WiFi Infrastructure",
        "description": "Installation of high-speed WiFi network across 50-acre campus with 10,000+ concurrent users support",
        "criteria": {"Technical Capability": 35, "Cost": 35, "Implementation Timeline": 20, "Maintenance Support": 10},
        "deadline": (datetime.now() + timedelta(days=45)).isoformat(),
        "organization": "State University",
        "orgType": "Educational",
        "budget": 15000000,
        "user_id": "demo_org_002",
        "email": "it@stateuniversity.edu"
    },
    {
        "title": "Smart City Street Lighting Project",
        "description": "Supply and installation of IoT-enabled LED street lights for 200km city roads with solar backup",
        "criteria": {"Energy Efficiency": 30, "Price": 30, "Technology": 25, "Warranty": 15},
        "deadline": (datetime.now() + timedelta(days=60)).isoformat(),
        "organization": "Municipal Corporation",
        "orgType": "Government",
        "budget": 80000000,
        "user_id": "demo_org_003",
        "email": "projects@municipal.gov"
    }
]

print("🚀 Adding mock tenders to TenderVault...\n")

for i, tender in enumerate(tenders, 1):
    try:
        response = requests.post(f"{BASE_URL}/api/tender", json=tender, timeout=30)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Tender {i}: {tender['title']}")
            print(f"   ID: {data.get('tender_id')}")
            print(f"   TX: {data.get('tx_id')}\n")
        else:
            print(f"❌ Failed: {tender['title']}")
            print(f"   Error: {response.text}\n")
    except Exception as e:
        print(f"❌ Error: {tender['title']}")
        print(f"   {str(e)}\n")

print("✅ Mock data insertion complete!")
