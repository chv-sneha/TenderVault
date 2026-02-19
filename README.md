# TenderVault

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![Algorand](https://img.shields.io/badge/Algorand-Blockchain-00D4AA.svg)](https://www.algorand.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Transparent blockchain-based tender platform built on Algorand with Firebase Authentication.

## 🚀 Features

- **🔐 Firebase Authentication**: Secure login with Email/Password and Google Sign-In
- **👥 Role-Based Access**: Government Organizations and Contractors/Vendors
- **⛓️ Blockchain Transparency**: All tenders and bids recorded on Algorand
- **🤖 AI-Powered Evaluation**: Gemini AI for fair bid assessment
- **🔒 Secure & Immutable**: Cryptographic hashing for data integrity
- **📊 Real-time Updates**: Firebase Firestore for live data sync
- **🎨 Modern UI**: Built with React, TypeScript, and Tailwind CSS

## 📋 Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- Git
- Firebase Account
- Algorand Testnet Account

## 🛠️ Setup

### Frontend
```sh
cd frontend
npm install

# Create .env file with Firebase credentials
cp .env.example .env
# Add your Firebase config to .env

npm run dev
```
Frontend runs on: http://localhost:5173

### Backend
```sh
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

# Create .env file
# Add DEPLOYER_MNEMONIC, GEMINI_API_KEY, ALGORAND_APP_ID

python main.py
```
Backend runs on: http://localhost:8000

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project or select existing
3. Enable **Authentication** → **Email/Password** and **Google**
4. Enable **Firestore Database**
5. Create collections: `users`, `tenders`, `bids`, `transactions`, `notifications`
6. Update Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    match /tenders/{tenderId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null;
    }
    match /bids/{bidId} {
      allow read, write: if request.auth != null;
    }
    match /transactions/{txId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    match /notifications/{notificationId} {
      allow read, write: if request.auth != null;
    }
  }
}
```
7. Copy Firebase config to `frontend/.env`

## 🏗️ Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn-ui** - UI components
- **Firebase Auth** - Authentication
- **Firebase Firestore** - Database

### Backend
- **FastAPI** - Python web framework
- **Algorand SDK** - Blockchain integration
- **Google Gemini AI** - Bid evaluation
- **Firebase Admin** - Database management

## 🔑 Authentication

### Account Types
- **Government Organization**: Can post tenders
- **Contractor/Vendor**: Can submit bids

### Protected Routes
- `/create-tender` - Requires Government account
- `/submit-bid` - Requires Contractor account
- `/profile` - Requires login

## 📖 Documentation

- [Setup Guide](SETUP.md) - Detailed setup instructions
- [User Guide](USER_GUIDE.md) - How to use the platform
- [API Documentation](http://localhost:8000/docs) - Interactive API docs
- [Contributing](CONTRIBUTING.md) - How to contribute

## 🤝 Contributing

Contributions are welcome! Please read [SETUP.md](SETUP.md) for development setup.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🔗 Links

- [Algorand Developer Portal](https://developer.algorand.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Algorand Testnet Explorer](https://testnet.algoexplorer.io/)
