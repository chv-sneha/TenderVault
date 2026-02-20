# TenderVault — AI-Powered Transparent Procurement on Algorand

> "We make procurement corruption technically impossible, not just legally illegal."

---

## 🔴 Live Demo
👉 [tender-vault.vercel.app](https://tender-vault.vercel.app)

## 🎥 LinkedIn Demo Video
👉 [Watch Demo](#) ← **ADD YOUR LINKEDIN VIDEO LINK HERE**

## ⛓️ Algorand Testnet Deployment
- **App ID:** `755804596`
- **Testnet Explorer:** [View Smart Contract on AlgoExplorer](https://testnet.algoexplorer.io/application/755804596)
- **Network:** Algorand Testnet
- **Smart Contract Language:** Algorand Python (AlgoPy) via AlgoKit

---

## 📌 Problem Statement

Public procurement is one of the most corruption-prone systems in the world. When governments, hospitals, and universities need to purchase goods or services, they invite companies to submit bids. The process is supposed to be fair — but in reality it is broken.

**Current reality:**
- Evaluation criteria are changed after seeing bids to favour predetermined vendors
- Officers read 50+ bids manually — evaluation takes weeks or months
- There is no audit trail — tampering cannot be proved or disproved
- Competing companies form cartels and coordinate prices to rig outcomes
- Losing vendors are never told why they lost — zero accountability

**The impact is massive.** India loses thousands of crores annually to procurement fraud. Hospitals overpay for equipment. College infrastructure goes to connected vendors. Honest companies lose contracts they deserve. Taxpayer money is wasted systematically.

The problem is not just that corruption happens. **The problem is that the system makes corruption easy and undetectable.**

---

## ✅ Our Solution

TenderVault is an AI-powered procurement platform built on Algorand blockchain. Instead of trusting officers to be honest, we make dishonesty technically impossible.

| Problem | How We Solve It |
|---------|----------------|
| Criteria changed after seeing bids | Locked on Algorand before bidding — mathematically unchangeable |
| Slow manual evaluation | Gemini AI scores all bids in seconds |
| No audit trail | Every action permanently recorded on Algorand |
| Bid rigging cartels | AI flags suspicious price patterns |
| No accountability | Every loser gets AI feedback report |
| No public verification | Transparency portal — verify any tender without login |

---

## 🏗️ Architecture Overview

```
User (Browser)
    ↓
React Frontend (Vercel)
    ↓
FastAPI Backend (Render)
    ↓
    /                    \
Firebase              Algorand Testnet
Auth + Firestore      Smart Contract (App ID: 755804596)
(Users + Storage)     GlobalState + Transaction Validation
    ↓
Google Gemini AI
(Bid Evaluation)
```

### Smart Contract + Frontend Interaction Flow

```
1. Frontend form submit
   ↓
2. FastAPI backend receives data
   ↓
3. Backend hashes data (SHA-256)
   ↓
4. Backend calls Algorand smart contract method
   ↓
5. Smart contract stores data in GlobalState
   ↓
6. Algorand returns transaction ID
   ↓
7. Transaction ID stored in Firebase
   ↓
8. Frontend shows Algorand explorer link to user
```

**Key Blockchain Features:**
- **GlobalState Management** - Tender and bid counters stored on-chain
- **Transaction Validation** - Every method call is a blockchain transaction
- **Cryptographic Verification** - Hash-based integrity checks
- **Immutable Audit Trail** - All actions permanently recorded
- **Access Control** - Transaction sender validation

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Smart Contract | AlgoKit + Algorand Python (AlgoPy) | Procurement rules enforced on-chain with state management |
| Blockchain | Algorand Testnet | Immutable tamper-proof audit trail with GlobalState storage |
| Frontend | React + TypeScript + TailwindCSS | User interface |
| Backend | FastAPI Python | API and business logic |
| AI Engine | Google Gemini API | Automated bid scoring and feedback |
| Authentication | Firebase Auth | Secure user login and registration |
| Database | Firebase Firestore | Tender and bid data storage |
| Frontend Deploy | Vercel | Live frontend hosting |
| Backend Deploy | Render | Live API hosting |

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- AlgoKit CLI installed
- Firebase account
- Google Gemini API key
- Algorand testnet account

### 1. Clone Repository
```bash
git clone https://github.com/chv-sneha/TenderVault.git
cd TenderVault
```

### 2. Smart Contract Setup (AlgoKit)
```bash
cd tender-contract/projects/tender-contract

# Install dependencies
pip install -r requirements.txt
pip install puyapy

# Create .env.testnet file
echo "DEPLOYER_MNEMONIC=your_25_word_mnemonic" > .env.testnet

# Compile smart contract
python -m puyapy smart_contracts/hello_world/contract.py --out-dir smart_contracts/artifacts/hello_world

# Copy TEAL files
copy smart_contracts/hello_world/smart_contracts/artifacts/hello_world/HelloWorld.approval.teal smart_contracts/artifacts/hello_world/approval.teal
copy smart_contracts/hello_world/smart_contracts/artifacts/hello_world/HelloWorld.clear.teal smart_contracts/artifacts/hello_world/clear.teal

# Deploy to testnet
python deploy_testnet.py
```

### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Add your credentials to .env:
# GEMINI_API_KEY=your_gemini_api_key
# DEPLOYER_MNEMONIC=your_25_word_mnemonic
# ALGORAND_APP_ID=755804596
# FIREBASE_PROJECT_ID=your_firebase_project_id

# Run backend
uvicorn main:app --reload --port 8000
```

### 4. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# Add your Firebase config to .env:
# VITE_FIREBASE_API_KEY=
# VITE_FIREBASE_AUTH_DOMAIN=
# VITE_FIREBASE_PROJECT_ID=
# VITE_FIREBASE_STORAGE_BUCKET=
# VITE_FIREBASE_MESSAGING_SENDER_ID=
# VITE_FIREBASE_APP_ID=

# Run frontend
npm run dev
```

### Environment Variables

**Frontend (.env)**
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Backend (.env)**
```env
GEMINI_API_KEY=your_gemini_api_key
DEPLOYER_MNEMONIC=your 25 word mnemonic phrase
ALGORAND_APP_ID=755804596
FIREBASE_PROJECT_ID=your_firebase_project_id
```

---

## 📖 Usage Guide

### As an Organization
1. Register with account type: **Organization**
2. Click **Post a Tender**
3. Fill tender details and set criteria weightages (must total 100%)
4. Click Submit — criteria instantly locked on Algorand
5. Copy tender link and share with vendors
6. After deadline — view AI evaluated results with full rankings

### As a Vendor
1. Register with account type: **Vendor**
2. Go to **Browse Tenders**
3. Click any open tender to view details
4. Fill bid form with your proposal and pricing
5. Submit — bid hash permanently stored on Algorand
6. After deadline — view results and your AI feedback report

### Public Verification (No Login Required)
1. Go to **Transparency Portal**
2. Search any tender by ID or organization name
3. View complete audit trail with real timestamps
4. Click any transaction hash to verify directly on Algorand explorer

---

## ⚠️ Known Limitations

- Free Render instance sleeps after inactivity — first API request may take up to 50 seconds to wake up
- Data persistence depends on backend uptime — Firebase full integration in progress
- Pera Wallet is connected in UI — full on-chain transaction signing planned for next version
- Deadline auto-trigger is currently manual — automatic smart contract trigger in roadmap
- AI evaluation requires manual trigger after deadline

---

## 👥 Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| **M Kishore** | Blockchain Developer | Smart Contract Development, AlgoKit Integration, Algorand Deployment, State Management |
| **CH V Sneha** | Full-Stack Developer | Frontend (React/TypeScript), Backend (FastAPI), Firebase Integration, UI/UX Design |

---

## 🔗 Important Links

| Resource | Link |
|----------|------|
| **Live Application** | [tender-vault.vercel.app](https://tender-vault.vercel.app) |
| **Smart Contract (Testnet)** | [App ID 755804596](https://testnet.algoexplorer.io/application/755804596) |
| **Backend API** | [clearbid-backend-1.onrender.com](https://clearbid-backend-1.onrender.com) |
| **API Documentation** | [/docs](https://clearbid-backend-1.onrender.com/docs) |
| **GitHub Repository** | [chv-sneha/TenderVault](https://github.com/chv-sneha/TenderVault) |
| **LinkedIn Demo Video** | [Add Your Video Link Here](#) |

---