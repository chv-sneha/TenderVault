from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
from dotenv import load_dotenv
from algosdk.v2client import algod
from algosdk import account, mnemonic, transaction
import google.generativeai as genai
import hashlib
import json
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore

load_dotenv()

app = FastAPI(title="ClearBid API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Firebase
try:
    if not firebase_admin._apps:
        cred = credentials.Certificate('firebase-admin-key.json')
        firebase_admin.initialize_app(cred)
    db = firestore.client()
    USE_FIREBASE = True
    print("✅ Firebase initialized successfully")
except Exception as e:
    print(f"⚠️ Firebase initialization failed: {e}")
    db = None
    USE_FIREBASE = False
    # Fallback to in-memory storage
    tenders_db: Dict[str, dict] = {}
    bids_db: Dict[str, dict] = {}

# Initialize Algorand
algod_client = algod.AlgodClient("", "https://testnet-api.algonode.cloud")
deployer_mnemonic = os.getenv("DEPLOYER_MNEMONIC")
deployer_private_key = mnemonic.to_private_key(deployer_mnemonic)
deployer_address = account.address_from_private_key(deployer_private_key)
APP_ID = int(os.getenv("ALGORAND_APP_ID", "755776827"))

# Initialize Gemini AI
gemini_key = os.getenv("GEMINI_API_KEY")
if gemini_key:
    genai.configure(api_key=gemini_key)
    gemini_model = genai.GenerativeModel('gemini-2.5-flash')
else:
    gemini_model = None

class TenderCreate(BaseModel):
    title: str
    description: str
    criteria: dict
    deadline: str
    organization: Optional[str] = None
    orgType: Optional[str] = "Government"
    budget: Optional[float] = 0
    user_id: Optional[str] = None
    email: Optional[str] = None

class BidSubmit(BaseModel):
    tender_id: str
    vendor_name: str
    proposal: str
    price: float
    user_id: Optional[str] = None

@app.post("/api/tender")
async def create_tender(tender: TenderCreate):
    try:
        tender_id = hashlib.sha256(f"{tender.title}{datetime.now()}".encode()).hexdigest()[:16]
        criteria_hash = hashlib.sha256(json.dumps(tender.criteria).encode()).hexdigest()
        
        tender_data = {
            "tender_id": tender_id,
            "title": tender.title,
            "description": tender.description,
            "criteria": tender.criteria,
            "deadline": tender.deadline,
            "organization": tender.organization,
            "orgType": tender.orgType,
            "budget": tender.budget,
            "criteria_hash": criteria_hash,
            "created_at": datetime.now().isoformat(),
            "status": "OPEN",
            "bid_count": 0,
            "user_id": tender.user_id,
            "email": tender.email
        }
        
        # Store in Firebase or memory
        if USE_FIREBASE:
            db.collection("tenders").document(tender_id).set(tender_data)
        else:
            tenders_db[tender_id] = tender_data
        
        # Write to Algorand
        try:
            params = algod_client.suggested_params()
            txn = transaction.ApplicationNoOpTxn(
                sender=deployer_address,
                sp=params,
                index=APP_ID,
                app_args=[criteria_hash.encode()]
            )
            signed_txn = txn.sign(deployer_private_key)
            tx_id = algod_client.send_transaction(signed_txn)
        except Exception as algo_error:
            print(f"Algorand error (non-critical): {algo_error}")
            tx_id = "ALGO_TX_SKIPPED"
        
        return {"tender_id": tender_id, "tx_id": tx_id, "criteria_hash": criteria_hash}
    except Exception as e:
        print(f"Error creating tender: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/bid")
async def submit_bid(bid: BidSubmit):
    bid_id = hashlib.sha256(f"{bid.tender_id}{bid.vendor_name}{datetime.now()}".encode()).hexdigest()[:16]
    bid_hash = hashlib.sha256(json.dumps({"proposal": bid.proposal, "price": bid.price}).encode()).hexdigest()
    
    bid_data = {
        "bid_id": bid_id,
        "tender_id": bid.tender_id,
        "vendor_name": bid.vendor_name,
        "proposal": bid.proposal,
        "price": bid.price,
        "bid_hash": bid_hash,
        "submitted_at": datetime.now().isoformat(),
        "user_id": bid.user_id
    }
    
    # Store in Firebase or memory
    if USE_FIREBASE:
        db.collection("bids").document(bid_id).set(bid_data)
    else:
        bids_db[bid_id] = bid_data
    
    # Write to Algorand
    params = algod_client.suggested_params()
    txn = transaction.ApplicationNoOpTxn(
        sender=deployer_address,
        sp=params,
        index=APP_ID,
        app_args=[bid_hash.encode()]
    )
    signed_txn = txn.sign(deployer_private_key)
    tx_id = algod_client.send_transaction(signed_txn)
    
    return {"bid_id": bid_id, "tx_id": tx_id, "bid_hash": bid_hash}

@app.post("/api/evaluate/{tender_id}")
async def evaluate_tender(tender_id: str):
    # Get tender from Firebase or memory
    if USE_FIREBASE:
        tender_doc = db.collection("tenders").document(tender_id).get()
        if not tender_doc.exists:
            raise HTTPException(status_code=404, detail="Tender not found")
        tender = tender_doc.to_dict()
        
        bids_ref = db.collection("bids").where("tender_id", "==", tender_id).stream()
        bids = [bid.to_dict() for bid in bids_ref]
    else:
        if tender_id not in tenders_db:
            raise HTTPException(status_code=404, detail="Tender not found")
        tender = tenders_db[tender_id]
        bids = [b for b in bids_db.values() if b["tender_id"] == tender_id]
    
    if not bids:
        raise HTTPException(status_code=400, detail="No bids to evaluate")
    
    if not gemini_model:
        raise HTTPException(status_code=503, detail="Gemini API not configured")
    
    # Prepare prompt for Gemini
    prompt = f"""Evaluate these bids for tender: {tender['title']}
Criteria weights: {json.dumps(tender['criteria'])}

Bids:
{json.dumps([{'vendor': b['vendor_name'], 'proposal': b['proposal'], 'price': b['price']} for b in bids], indent=2)}

Score each bid 0-100 based on the criteria weights. Return ONLY valid JSON: {{"scores": [{{"vendor": "name", "score": 85, "reasoning": "..."}}]}}"""
    
    # Call Gemini
    response = gemini_model.generate_content(prompt)
    result_text = response.text.strip()
    
    # Extract JSON from response
    if "```json" in result_text:
        result_text = result_text.split("```json")[1].split("```")[0].strip()
    elif "```" in result_text:
        result_text = result_text.split("```")[1].split("```")[0].strip()
    
    result = json.loads(result_text)
    
    # Store results
    for bid in bids:
        score_data = next((s for s in result["scores"] if s["vendor"] == bid["vendor_name"]), None)
        if score_data:
            if USE_FIREBASE:
                db.collection("bids").document(bid["bid_id"]).update({
                    "score": score_data["score"],
                    "reasoning": score_data["reasoning"]
                })
            else:
                bids_db[bid["bid_id"]].update({
                    "score": score_data["score"],
                    "reasoning": score_data["reasoning"]
                })
    
    if USE_FIREBASE:
        db.collection("tenders").document(tender_id).update({"status": "EVALUATED"})
    else:
        tenders_db[tender_id]["status"] = "EVALUATED"
    
    return {"message": "Evaluation complete", "results": result}

@app.get("/api/tenders")
async def get_all_tenders():
    if USE_FIREBASE:
        tenders_ref = db.collection("tenders").stream()
        tenders = []
        for tender_doc in tenders_ref:
            tender_data = tender_doc.to_dict()
            # Ensure tender_id exists
            if 'tender_id' not in tender_data:
                tender_data['tender_id'] = tender_doc.id
            # Normalize status to uppercase
            if 'status' in tender_data:
                tender_data['status'] = tender_data['status'].upper()
            tenders.append(tender_data)
    else:
        tenders = list(tenders_db.values())
    return {"tenders": tenders}

@app.get("/api/tender/{tender_id}")
async def get_tender(tender_id: str):
    if USE_FIREBASE:
        tender_doc = db.collection("tenders").document(tender_id).get()
        if not tender_doc.exists:
            raise HTTPException(status_code=404, detail="Tender not found")
        tender = tender_doc.to_dict()
        # Get bid count
        bids_ref = db.collection("bids").where("tender_id", "==", tender_id).stream()
        bid_count = len(list(bids_ref))
        tender["bid_count"] = bid_count
        return tender
    else:
        if tender_id not in tenders_db:
            raise HTTPException(status_code=404, detail="Tender not found")
        tender = tenders_db[tender_id]
        bid_count = len([b for b in bids_db.values() if b["tender_id"] == tender_id])
        tender["bid_count"] = bid_count
        return tender

@app.get("/api/results/{tender_id}")
async def get_results(tender_id: str):
    if USE_FIREBASE:
        bids_ref = db.collection("bids").where("tender_id", "==", tender_id).stream()
        bids = [bid.to_dict() for bid in bids_ref]
    else:
        bids = [b for b in bids_db.values() if b["tender_id"] == tender_id]
    
    ranked = sorted([b for b in bids if "score" in b], key=lambda x: x["score"], reverse=True)
    return {"tender_id": tender_id, "ranked_bids": ranked}

@app.get("/")
async def root():
    return {"message": "ClearBid API", "app_id": APP_ID}

@app.get("/api/user/{user_id}/tenders")
async def get_user_tenders(user_id: str):
    print(f"\n=== Getting tenders for user: {user_id} ===")
    if USE_FIREBASE:
        try:
            user_doc = db.collection("users").document(user_id).get()
            user_email = user_doc.to_dict().get('email') if user_doc.exists else None
            print(f"User email: {user_email}")
        except Exception as e:
            print(f"Error getting user: {e}")
            user_email = None
        
        tenders_ref = db.collection("tenders").stream()
        all_tenders = []
        for tender_doc in tenders_ref:
            tender_data = tender_doc.to_dict()
            if 'tender_id' not in tender_data:
                tender_data['tender_id'] = tender_doc.id
            all_tenders.append(tender_data)
        
        print(f"Total tenders in DB: {len(all_tenders)}")
        if all_tenders:
            print(f"Sample tender fields: {list(all_tenders[0].keys())}")
        
        # Return ALL tenders for now (old data doesn't have user_id)
        return {"tenders": all_tenders}
    else:
        tenders = list(tenders_db.values())
        return {"tenders": tenders}

@app.get("/api/user/{user_id}/bids")
async def get_user_bids(user_id: str):
    print(f"\n=== Getting bids for user: {user_id} ===")
    if USE_FIREBASE:
        try:
            user_doc = db.collection("users").document(user_id).get()
            user_email = user_doc.to_dict().get('email') if user_doc.exists else None
            print(f"User email: {user_email}")
        except Exception as e:
            print(f"Error getting user: {e}")
            user_email = None
        
        bids_ref = db.collection("bids").stream()
        all_bids = []
        for bid_doc in bids_ref:
            bid_data = bid_doc.to_dict()
            if 'tender_id' in bid_data:
                tender_doc = db.collection("tenders").document(bid_data['tender_id']).get()
                if tender_doc.exists:
                    tender_data = tender_doc.to_dict()
                    bid_data['tender_title'] = tender_data.get('title', 'Unknown')
                    bid_data['tender_status'] = tender_data.get('status', 'UNKNOWN')
            all_bids.append(bid_data)
        
        print(f"Total bids in DB: {len(all_bids)}")
        if all_bids:
            print(f"Sample bid fields: {list(all_bids[0].keys())}")
        
        # Return ALL bids for now (old data doesn't have user_id)
        return {"bids": all_bids}
    else:
        bids = list(bids_db.values())
        return {"bids": bids}

@app.get("/api/health")
async def health():
    try:
        account_info = algod_client.account_info(deployer_address)
        balance = account_info.get('amount', 0) / 1_000_000
        return {
            "status": "healthy",
            "algorand_connected": True,
            "deployer_address": deployer_address,
            "balance_algo": balance,
            "app_id": APP_ID,
            "gemini_configured": gemini_model is not None,
            "firebase_configured": USE_FIREBASE
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e),
            "deployer_address": deployer_address
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
