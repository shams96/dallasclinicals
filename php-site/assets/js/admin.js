// Mirrors Admin.tsx: Google sign-in via Firebase Auth, then a compressed
// base64 image write to Firestore settings/homepage, gated to ADMIN_EMAIL.
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { auth, db } from "./firebase-init.js";

const ADMIN_EMAIL = window.APP_CONFIG.adminEmail;

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const loadingEl = document.getElementById('admin-loading');
  const signedOutEl = document.getElementById('admin-signed-out');
  const signedInEl = document.getElementById('admin-signed-in');
  const emailEl = document.getElementById('admin-email');
  const unauthorizedEl = document.getElementById('admin-unauthorized');
  const loginBtn = document.getElementById('admin-login');
  const logoutBtn = document.getElementById('admin-logout');
  const fileInput = document.getElementById('admin-file-upload');
  const uploadIcon = document.getElementById('admin-upload-icon');
  const uploadingIcon = document.getElementById('admin-uploading-icon');
  const messageBox = document.getElementById('admin-message');
  const messageIconSuccess = document.getElementById('admin-message-icon-success');
  const messageIconError = document.getElementById('admin-message-icon-error');
  const messageText = document.getElementById('admin-message-text');

  function showMessage(type, text) {
    messageBox.classList.remove('hidden', 'bg-green-50', 'text-green-800', 'border-green-200', 'bg-red-50', 'text-red-800', 'border-red-200');
    messageBox.classList.add('border', type === 'success' ? 'bg-green-50' : 'bg-red-50', type === 'success' ? 'text-green-800' : 'text-red-800', type === 'success' ? 'border-green-200' : 'border-red-200');
    messageIconSuccess.classList.toggle('hidden', type !== 'success');
    messageIconError.classList.toggle('hidden', type === 'success');
    messageText.textContent = text;
  }

  loginBtn.addEventListener('click', async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error('Login error:', error);
      showMessage('error', 'Failed to log in.');
    }
  });

  logoutBtn.addEventListener('click', () => signOut(auth));

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (auth.currentUser?.email !== ADMIN_EMAIL) {
      showMessage('error', 'Unauthorized: Only the admin can upload photos.');
      return;
    }

    uploadIcon.classList.add('hidden');
    uploadingIcon.classList.remove('hidden');
    fileInput.disabled = true;

    try {
      const base64Image = await compressImage(file);
      if (base64Image.length > 1000000) {
        throw new Error('Image is too large even after compression. Please upload a smaller file.');
      }
      await setDoc(doc(db, 'settings', 'homepage'), { drFarooqImageBase64: base64Image }, { merge: true });
      showMessage('success', 'Photo updated successfully! It will now appear on the homepage.');
    } catch (error) {
      console.error('Upload error:', error);
      showMessage('error', error.message || 'Failed to upload photo.');
    } finally {
      uploadIcon.classList.remove('hidden');
      uploadingIcon.classList.add('hidden');
      fileInput.disabled = auth.currentUser?.email !== ADMIN_EMAIL;
    }
  });

  onAuthStateChanged(auth, (user) => {
    loadingEl.classList.add('hidden');
    if (!user) {
      signedOutEl.classList.remove('hidden');
      signedInEl.classList.add('hidden');
      return;
    }
    signedOutEl.classList.add('hidden');
    signedInEl.classList.remove('hidden');
    emailEl.textContent = user.email;
    const isAdmin = user.email === ADMIN_EMAIL;
    unauthorizedEl.classList.toggle('hidden', isAdmin);
    fileInput.disabled = !isAdmin;
  });
});
