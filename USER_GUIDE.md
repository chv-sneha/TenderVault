# TenderVault User Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [For Government Organizations](#for-government-organizations)
3. [For Contractors/Vendors](#for-contractorsvendors)
4. [Understanding the Platform](#understanding-the-platform)
5. [FAQ](#faq)

---

## Getting Started

### What is TenderVault?

TenderVault is a blockchain-based tender management platform that ensures transparency and fairness in government procurement. Built on Algorand blockchain with AI-powered bid evaluation.

### Key Features

- **🔒 Encrypted Criteria**: Evaluation criteria are encrypted and hidden until deadline
- **⛓️ Blockchain Verified**: All tenders and bids recorded on Algorand
- **🤖 AI Evaluation**: Fair, unbiased bid assessment using Google Gemini AI
- **📊 Full Transparency**: Complete audit trail of all activities
- **🔐 Immutable Records**: Data cannot be tampered with after submission

---

## For Government Organizations

### How to Post a Tender

1. **Navigate to Create Tender**
   - Click "Post Tender" in the navigation bar
   - Or visit `/create-tender`

2. **Fill Basic Details**
   - **Title**: Clear, descriptive tender name
   - **Organization**: Your department/ministry name
   - **Type**: Select organization type (Government/College/Hospital/Enterprise)
   - **Description**: Detailed requirements and specifications
   - **Budget**: Total budget in ALGO tokens
   - **Deadline**: Last date for bid submission
   - **Email**: Contact email for queries

3. **Set Evaluation Criteria**
   - Define criteria (e.g., Price, Experience, Timeline, Quality)
   - Assign weights to each criterion (must total 100%)
   - These weights will be **encrypted and hidden** from vendors
   - Example:
     ```
     Price: 40%
     Experience: 30%
     Timeline: 20%
     Quality: 10%
     ```

4. **Submit to Blockchain**
   - Review all details carefully
   - Click "Encrypt and Lock on Algorand"
   - Wait for blockchain confirmation
   - Save your Tender ID and App ID

5. **Share Tender Link**
   - Copy the tender link from success modal
   - Share with potential vendors
   - Vendors can view tender details but NOT the evaluation criteria weights

### After Deadline

1. **Evaluate Bids**
   - Navigate to your tender page
   - Click "Evaluate Bids" button
   - AI will score all bids based on your encrypted criteria
   - Review results and rankings

2. **Award Contract**
   - Select winning bid
   - System records decision on blockchain
   - Notify winning vendor

---

## For Contractors/Vendors

### How to Submit a Bid

1. **Browse Available Tenders**
   - Visit "Browse Tenders" page
   - Filter by category, budget, or deadline
   - Click on tender to view details

2. **Review Tender Requirements**
   - Read description carefully
   - Check budget and deadline
   - Note: Evaluation criteria weights are hidden

3. **Prepare Your Bid**
   - Click "Submit Bid" button
   - Fill in:
     - **Vendor Name**: Your company name
     - **Proposal**: Detailed technical and financial proposal
     - **Price**: Your quoted price in ALGO
     - **Documents**: Upload supporting documents (optional)

4. **Submit to Blockchain**
   - Review your bid
   - Click "Submit Bid"
   - Your bid is hashed and recorded on Algorand
   - Save your Bid ID for tracking

5. **Track Your Bid**
   - Use Bid ID to check status
   - Wait for evaluation after deadline
   - Results will be published transparently

---

## Understanding the Platform

### How Encryption Works

1. **Before Deadline**:
   - Evaluation criteria weights are encrypted using cryptographic hashing
   - Stored on Algorand blockchain
   - Impossible for anyone (including admins) to view or modify

2. **After Deadline**:
   - Criteria are revealed
   - AI evaluates all bids using the original criteria
   - Results are transparent and verifiable

### Blockchain Verification

Every action is recorded on Algorand:
- ✅ Tender creation → Transaction ID
- ✅ Bid submission → Transaction ID
- ✅ Evaluation results → Transaction ID

**Verify on Algorand Explorer**:
- Visit: https://testnet.algoexplorer.io
- Enter your Transaction ID
- View immutable proof

### AI Evaluation Process

1. **Data Collection**: All bids are collected after deadline
2. **Criteria Reveal**: Encrypted weights are decrypted
3. **AI Scoring**: Google Gemini AI scores each bid (0-100)
4. **Ranking**: Bids ranked by total weighted score
5. **Transparency**: Full reasoning provided for each score

---

## FAQ

### General Questions

**Q: Is my data secure?**
A: Yes. All sensitive data is encrypted and stored on Algorand blockchain, which is immutable and tamper-proof.

**Q: Can criteria be changed after posting?**
A: No. Once submitted to blockchain, criteria are locked and cannot be modified.

**Q: How much does it cost?**
A: Platform is free. You only pay minimal Algorand transaction fees (~0.001 ALGO per transaction).

**Q: What if I miss the deadline?**
A: Late bids are automatically rejected. Deadlines are enforced by smart contracts.

### For Government

**Q: Can I cancel a tender?**
A: Yes, but cancellation is recorded on blockchain for transparency.

**Q: How do I verify AI evaluation is fair?**
A: All evaluation logic and criteria weights are publicly verifiable on blockchain after deadline.

**Q: Can I see bids before deadline?**
A: No. Bids are encrypted until deadline to prevent bias.

### For Vendors

**Q: Can I edit my bid after submission?**
A: No. Bids are immutable once submitted to blockchain.

**Q: How do I know evaluation is fair?**
A: Criteria weights are locked before any bids are submitted. AI evaluation is deterministic and verifiable.

**Q: What if I lose?**
A: You can view your score, winning bid's score, and AI's reasoning for complete transparency.

---

## Support

**Need Help?**
- 📧 Email: support@tendervault.com
- 🐛 Report Issues: GitHub Issues
- 📖 Documentation: [SETUP.md](SETUP.md)

**Algorand Resources**:
- Developer Portal: https://developer.algorand.org
- Testnet Explorer: https://testnet.algoexplorer.io
- AlgoKit Docs: https://algokit.io

---

## Best Practices

### For Government
- ✅ Write clear, detailed tender descriptions
- ✅ Set realistic budgets and deadlines
- ✅ Define objective, measurable criteria
- ✅ Assign criteria weights thoughtfully
- ✅ Save all Transaction IDs for audit trail

### For Vendors
- ✅ Read tender requirements carefully
- ✅ Submit well-structured proposals
- ✅ Be competitive but realistic with pricing
- ✅ Submit before deadline (no extensions)
- ✅ Keep your Bid ID for tracking

---

**Built with ❤️ on Algorand Blockchain**
