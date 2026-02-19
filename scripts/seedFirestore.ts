import { app } from "../firebase";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const db = getFirestore(app);

async function seed() {
  console.log("Seeding Firestore...");

  const usersCol = collection(db, "users");
  const tendersCol = collection(db, "tenders");
  const bidsCol = collection(db, "bids");
  const transactionsCol = collection(db, "transactions");
  const notificationsCol = collection(db, "notifications");

  // Create example user
  const userRef = await addDoc(usersCol, {
    email: "gov@example.com",
    role: "government",
    walletAddress: "",
    organizationName: "Example Gov",
    createdAt: serverTimestamp(),
    isVerified: true,
  });

  // Create example tender
  const tenderRef = await addDoc(tendersCol, {
    title: "Road repair",
    description: "Repair main street",
    category: "infrastructure",
    budget: 100000,
    deadline: serverTimestamp(),
    createdBy: userRef.id,
    createdAt: serverTimestamp(),
    status: "open",
    algoTxId: "",
    algoAppId: "",
    documents: [],
    criteriaHash: "",
    criteriaEncrypted: "",
    winnerBidId: "",
    evaluationHash: "",
  });

  // Create example bid
  const bidRef = await addDoc(bidsCol, {
    tenderId: tenderRef.id,
    contractorId: userRef.id,
    amount: 90000,
    proposal: "We can do it",
    submittedAt: serverTimestamp(),
    status: "pending",
    algoTxId: "",
    documents: [],
    bidHash: "",
    stakeAmount: 1000,
  });

  // Create a transaction
  await addDoc(transactionsCol, {
    type: "tender_created",
    algoTxId: "",
    userId: userRef.id,
    tenderId: tenderRef.id,
    timestamp: serverTimestamp(),
    blockNumber: null,
  });

  // Create a notification
  await addDoc(notificationsCol, {
    userId: userRef.id,
    message: "Tender created",
    type: "info",
    isRead: false,
    createdAt: serverTimestamp(),
    relatedTenderId: tenderRef.id,
  });

  console.log("Seeding complete.");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
