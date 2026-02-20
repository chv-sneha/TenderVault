import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timedelta
import os

# Initialize Firebase
cred = credentials.Certificate('firebase-admin-key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Test tenders
test_tenders = [
    {
        "tender_id": "test001",
        "title": "Hospital Medical Equipment Procurement",
        "description": "Procurement of advanced medical equipment for city hospital",
        "organization": "City General Hospital",
        "orgType": "Hospital",
        "budget": 50000,
        "deadline": (datetime.now() + timedelta(days=15)).isoformat(),
        "status": "OPEN",
        "bid_count": 3,
        "criteria": {"quality": 40, "price": 30, "delivery": 30},
        "criteria_hash": "abc123",
        "created_at": datetime.now().isoformat()
    },
    {
        "tender_id": "test002",
        "title": "College Infrastructure Development",
        "description": "Construction and renovation of college buildings",
        "organization": "State Engineering College",
        "orgType": "College",
        "budget": 100000,
        "deadline": (datetime.now() + timedelta(days=30)).isoformat(),
        "status": "OPEN",
        "bid_count": 5,
        "criteria": {"experience": 35, "price": 35, "timeline": 30},
        "criteria_hash": "def456",
        "created_at": datetime.now().isoformat()
    },
    {
        "tender_id": "test003",
        "title": "Government Office Supplies",
        "description": "Annual procurement of office supplies and equipment",
        "organization": "Municipal Corporation",
        "orgType": "Government",
        "budget": 25000,
        "deadline": (datetime.now() + timedelta(days=7)).isoformat(),
        "status": "OPEN",
        "bid_count": 8,
        "criteria": {"quality": 30, "price": 40, "delivery": 30},
        "criteria_hash": "ghi789",
        "created_at": datetime.now().isoformat()
    }
]

# Test bids
test_bids = [
    {
        "bid_id": "bid001",
        "tender_id": "test001",
        "vendor_name": "MedTech Solutions",
        "proposal": "We provide high-quality medical equipment with 2-year warranty",
        "price": 48000,
        "bid_hash": "hash001",
        "submitted_at": datetime.now().isoformat()
    },
    {
        "bid_id": "bid002",
        "tender_id": "test001",
        "vendor_name": "HealthCare Supplies Inc",
        "proposal": "Premium equipment with fast delivery and installation",
        "price": 52000,
        "bid_hash": "hash002",
        "submitted_at": datetime.now().isoformat()
    }
]

print("Adding test tenders...")
for tender in test_tenders:
    db.collection("tenders").document(tender["tender_id"]).set(tender)
    print(f"✅ Added: {tender['title']}")

print("\nAdding test bids...")
for bid in test_bids:
    db.collection("bids").document(bid["bid_id"]).set(bid)
    print(f"✅ Added bid: {bid['bid_id']}")

print("\n✅ Test data added successfully!")
print("\nYou can now:")
print("1. Browse tenders at /tenders")
print("2. View tender details")
print("3. Submit new bids")
