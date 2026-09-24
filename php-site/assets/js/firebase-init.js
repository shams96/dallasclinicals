// Shared Firebase app/Firestore/Auth handles, initialized from
// window.APP_CONFIG (rendered server-side by includes/header.php from
// includes/config.php). Imported as an ES module by page-specific scripts.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const cfg = window.APP_CONFIG.firebase;

const app = initializeApp({
  projectId: cfg.projectId,
  appId: cfg.appId,
  apiKey: cfg.apiKey,
  authDomain: cfg.authDomain,
  storageBucket: cfg.storageBucket,
  messagingSenderId: cfg.messagingSenderId,
});

export const db = getFirestore(app, cfg.firestoreDatabaseId);
export const auth = getAuth(app);
