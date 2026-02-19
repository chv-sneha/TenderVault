import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from "../../firebase";

const db = getFirestore(app);

export async function initializeCollections() {
  try {
    // Initialize users collection
    await addDoc(collection(db, "users"), {
      _placeholder: true,
      createdAt: serverTimestamp(),
    });

    // Initialize tenders collection
    await addDoc(collection(db, "tenders"), {
      _placeholder: true,
      createdAt: serverTimestamp(),
    });

    // Initialize bids collection
    await addDoc(collection(db, "bids"), {
      _placeholder: true,
      createdAt: serverTimestamp(),
    });

    // Initialize transactions collection
    await addDoc(collection(db, "transactions"), {
      _placeholder: true,
      createdAt: serverTimestamp(),
    });

    // Initialize notifications collection
    await addDoc(collection(db, "notifications"), {
      _placeholder: true,
      createdAt: serverTimestamp(),
    });

    console.log("✅ All collections initialized successfully!");
  } catch (error) {
    console.error("❌ Error initializing collections:", error);
  }
}
