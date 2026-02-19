import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { setupFirebaseCollections } from "./lib/setupFirebase";

// Setup Firebase collections on first load
setupFirebaseCollections().then((success) => {
  if (success) {
    console.log("Firebase setup complete");
  }
});

createRoot(document.getElementById("root")!).render(<App />);
