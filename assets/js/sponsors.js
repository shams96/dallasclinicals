// Mirrors Sponsors.tsx: Firestore write + Apps Script notify email.
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { db } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sponsor-form');
  const successBox = document.getElementById('sponsor-success');
  const submitBtn = document.getElementById('sponsor-submit');
  const submitLabel = document.getElementById('sponsor-submit-label');
  const submitIcon = document.getElementById('sponsor-submit-icon');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    submitBtn.disabled = true;
    submitLabel.textContent = 'Submitting...';
    submitIcon.setAttribute('data-lucide', 'loader-2');
    submitIcon.classList.add('animate-spin');
    if (window.lucide) window.lucide.createIcons();

    try {
      await addDoc(collection(db, "sponsorInquiries"), {
        fullName: data.fullName,
        company: data.company,
        email: data.email,
        phone: data.phone || "Not provided",
        therapeuticArea: data.therapeuticArea,
        message: data.message,
        createdAt: serverTimestamp(),
      });

      await fetch(window.APP_CONFIG.notifyUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _subject: "New Protocol Implementation Inquiry", ...data }),
      });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      // Show success anyway for UX, matching the React app's behavior.
    } finally {
      form.classList.add('hidden');
      successBox.classList.remove('hidden');
    }
  });
});
