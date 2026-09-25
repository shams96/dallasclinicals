// Live PI photo — mirrors Home.tsx's onSnapshot(doc(db, "settings", "homepage")).
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { db } from "./firebase-init.js";

const FALLBACK_SRC = "https://ui-avatars.com/api/?name=Hassan+Farooq&background=112240&color=64FFDA&size=512";

document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('pi-photo');
  if (!img) return;

  img.addEventListener('error', () => {
    img.src = FALLBACK_SRC;
  });

  onSnapshot(doc(db, "settings", "homepage"), (snap) => {
    const data = snap.data();
    if (snap.exists() && data && data.drFarooqImageBase64) {
      img.src = data.drFarooqImageBase64;
    }
  });
});
