import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../../firebase";

const db = getFirestore(app);

export async function setupFirebaseCollections() {
  try {
    // Create users collection
    await addDoc(collection(db, "users"), {
      email: "admin@tendervault.com",
      role: "admin",
      walletAddress: "SAMPLE_WALLET_ADDRESS",
      organizationName: "TenderVault Admin",
      isVerified: true,
      createdAt: serverTimestamp(),
    });

    // Create tenders collection
    await addDoc(collection(db, "tenders"), {
      title: "Sample Tender",
      description: "This is a sample tender",
      category: "Construction",
      budget: 100000,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdBy: "admin",
      status: "open",
      documents: [],
      createdAt: serverTimestamp(),
    });

    // Create bids collection
    await addDoc(collection(db, "bids"), {
      tenderId: "sample_tender_id",
      contractorId: "sample_contractor_id",
      amount: 95000,
      proposal: "Sample bid proposal",
      status: "pending",
      documents: [],
      submittedAt: serverTimestamp(),
    });

    // Create transactions collection
    await addDoc(collection(db, "transactions"), {
      type: "tender_created",
      algoTxId: "SAMPLE_TX_ID",
      userId: "admin",
      tenderId: "sample_tender_id",
      timestamp: serverTimestamp(),
    });

    // Create notifications collection
    await addDoc(collection(db, "notifications"), {
      userId: "admin",
      message: "Welcome to TenderVault!",
      type: "info",
      isRead: false,
      createdAt: serverTimestamp(),
    });

    console.log("✅ All Firebase collections created successfully!");
    return true;
  } catch (error) {
    console.error("❌ Error creating collections:", error);
    return false;
  }
}
