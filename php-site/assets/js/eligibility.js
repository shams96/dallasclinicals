// Mirrors Eligibility.tsx's 2-step flow: zip-based routing, then a
// Firestore write (contact info only — no PHI) plus an Apps Script
// notify email.
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { db } from "./firebase-init.js";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('elig-form');
  if (!form) return;

  const step1 = document.getElementById('elig-step-1');
  const step2 = document.getElementById('elig-step-2');
  const progressBar = document.getElementById('progress-bar');
  const progressWrap = document.getElementById('progress-wrap');
  const zipInput = document.getElementById('elig-zip');
  const nextBtn = document.getElementById('elig-next');
  const backBtn = document.getElementById('elig-back');
  const successBox = document.getElementById('elig-success');
  const submitBtn = document.getElementById('elig-submit');
  const submitLabel = document.getElementById('elig-submit-label');
  const submitIcon = document.getElementById('elig-submit-icon');
  const routedEls = [
    document.getElementById('elig-routed-location'),
    document.getElementById('elig-routed-location-2'),
  ];

  let routedLocation = '';

  function setRouted(text) {
    routedLocation = text;
    routedEls.forEach((el) => { if (el) el.textContent = text; });
  }

  nextBtn.addEventListener('click', () => {
    if (!zipInput.reportValidity()) return;
    const zip = zipInput.value;
    // Simple routing logic: 750xx usually Plano/Collin County area.
    setRouted(
      zip.startsWith('750') || zip.startsWith('752')
        ? 'Plano Facility (Collin County)'
        : 'Greenville Facility (Hunt County)'
    );
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    progressBar.style.width = '100%';
  });

  backBtn.addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    progressBar.style.width = '50%';
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.zipCode = zipInput.value;
    data.routedLocation = routedLocation;

    submitBtn.disabled = true;
    backBtn.disabled = true;
    submitLabel.textContent = 'Submitting...';
    submitIcon.setAttribute('data-lucide', 'loader-2');
    submitIcon.classList.add('animate-spin');
    if (window.lucide) window.lucide.createIcons();

    try {
      await addDoc(collection(db, "patientInquiries"), {
        zipCode: data.zipCode,
        routedLocation: data.routedLocation,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        createdAt: serverTimestamp(),
      });

      await fetch(window.APP_CONFIG.notifyUrl, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _subject: "New Patient Callback Request", ...data }),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show success anyway for UX, matching the React app's behavior.
    } finally {
      form.classList.add('hidden');
      progressWrap.classList.add('hidden');
      successBox.classList.remove('hidden');
    }
  });
});
