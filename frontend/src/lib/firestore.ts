import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import { app } from "../../firebase";

const db = getFirestore(app);

// Collections
const usersCol = collection(db, "users");
const tendersCol = collection(db, "tenders");
const bidsCol = collection(db, "bids");
const transactionsCol = collection(db, "transactions");
const notificationsCol = collection(db, "notifications");

// Generic helpers
async function createDoc(colRef: any, data: any) {
  const payload = { ...data };
  if (!payload.createdAt) payload.createdAt = serverTimestamp();
  const ref = await addDoc(colRef, payload);
  return ref.id;
}

async function getDocById(colRef: any, id: string) {
  const d = doc(colRef, id);
  const snap = await getDoc(d);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

async function updateDocById(colRef: any, id: string, data: any) {
  const d = doc(colRef, id);
  await updateDoc(d, data);
  return id;
}

async function deleteDocById(colRef: any, id: string) {
  const d = doc(colRef, id);
  await deleteDoc(d);
  return id;
}

// Users CRUD
export const createUser = async (userData: {
  email: string;
  role: "government" | "contractor" | "admin";
  walletAddress: string;
  organizationName: string;
  isVerified?: boolean;
}) => {
  const payload = { ...userData, isVerified: userData.isVerified ?? false };
  return createDoc(usersCol, payload);
};

export const getUser = async (id: string) => {
  return getDocById(usersCol, id);
};

export const updateUser = async (id: string, data: any) => {
  return updateDocById(usersCol, id, data);
};

export const deleteUser = async (id: string) => {
  return deleteDocById(usersCol, id);
};

// Tenders CRUD
export const createTender = async (tenderData: {
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: Date;
  createdBy: string;
  status?: "open" | "closed" | "awarded";
  algoTxId?: string;
  algoAppId?: string;
  documents?: string[];
  criteriaHash?: string;
  criteriaEncrypted?: string;
  winnerBidId?: string;
  evaluationHash?: string;
}) => {
  const payload = { ...tenderData, status: tenderData.status ?? "open" };
  return createDoc(tendersCol, payload);
};

export const getTender = async (id: string) => {
  return getDocById(tendersCol, id);
};

export const updateTender = async (id: string, data: any) => {
  return updateDocById(tendersCol, id, data);
};

export const deleteTender = async (id: string) => {
  return deleteDocById(tendersCol, id);
};

// Bids CRUD
export const createBid = async (bidData: {
  tenderId: string;
  contractorId: string;
  amount: number;
  proposal: string;
  status?: "pending" | "accepted" | "rejected";
  algoTxId?: string;
  documents?: string[];
  bidHash?: string;
  stakeAmount?: number;
}) => {
  const payload = {
    ...bidData,
    status: bidData.status ?? "pending",
    submittedAt: serverTimestamp(),
  };
  return createDoc(bidsCol, payload);
};

export const getBid = async (id: string) => {
  return getDocById(bidsCol, id);
};

export const updateBid = async (id: string, data: any) => {
  return updateDocById(bidsCol, id, data);
};

export const deleteBid = async (id: string) => {
  return deleteDocById(bidsCol, id);
};

// Transactions CRUD
export const createTransaction = async (txData: {
  type: "tender_created" | "bid_submitted" | "bid_awarded";
  algoTxId: string;
  userId: string;
  tenderId: string;
  blockNumber?: number;
}) => {
  const payload = { ...txData, timestamp: serverTimestamp() };
  return createDoc(transactionsCol, payload);
};

export const getTransaction = async (id: string) => {
  return getDocById(transactionsCol, id);
};

// Notifications CRUD
export const createNotification = async (noteData: {
  userId: string;
  message: string;
  type: string;
  isRead?: boolean;
  relatedTenderId?: string;
}) => {
  const payload = { ...noteData, isRead: noteData.isRead ?? false };
  return createDoc(notificationsCol, payload);
};

export const getNotification = async (id: string) => {
  return getDocById(notificationsCol, id);
};

export const markNotificationRead = async (id: string) => {
  return updateDocById(notificationsCol, id, { isRead: true });
};

export default db;
