# TenderVault - Setup Guide for Contributors

## Prerequisites

Install these on your laptop:
- **Node.js** (v18+): https://nodejs.org/
- **Python** (v3.9+): https://www.python.org/
- **Git**: https://git-scm.com/

## Setup Instructions

### 1. Fork & Clone
```bash
# Fork the repo on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/TenderVault.git
cd TenderVault
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Add Firebase keys to .env (ask team for keys)
npm run dev
```
Frontend runs on: http://localhost:5173

### 3. Backend Setup
```bash
cd ../backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with:
# DEPLOYER_MNEMONIC=your_algorand_mnemonic
# GEMINI_API_KEY=your_gemini_key
# ALGORAND_APP_ID=755776827
python main.py
```
Backend runs on: http://localhost:8000

### 4. Test Everything
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/docs

## What to Work On

### Frontend Tasks
- [ ] Improve UI/UX design
- [ ] Add loading states
- [ ] Add error handling
- [ ] Improve responsive design
- [ ] Add animations
- [ ] Create better landing page
- [ ] Add user profile page
- [ ] Improve tender listing page

### Backend Tasks
- [ ] Add more API endpoints
- [ ] Improve error handling
- [ ] Add input validation
- [ ] Add API documentation
- [ ] Optimize database queries
- [ ] Add logging
- [ ] Add unit tests

### Smart Contract Tasks
- [ ] Add more contract features
- [ ] Improve security
- [ ] Add contract tests
- [ ] Document contract functions

### Documentation Tasks
- [ ] Improve README.md
- [ ] Add API documentation
- [ ] Create user guide
- [ ] Add architecture diagram
- [ ] Write deployment guide

## Making Commits

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Make changes, then:
git add .
git commit -m "Add: your feature description"
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

## Commit Message Format
- `Add: new feature`
- `Fix: bug description`
- `Update: improvement description`
- `Docs: documentation changes`

## Need Help?
Contact the team or check existing code for examples.
