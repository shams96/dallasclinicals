import React, { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Upload, LogOut, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
      setMessage({ type: "error", text: "Failed to log in." });
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          // Max width/height to keep base64 size under 1MB
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 1000;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(dataUrl);
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (user?.email !== "shams96@yahoo.com") {
      setMessage({ type: "error", text: "Unauthorized: Only the admin can upload photos." });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const base64Image = await compressImage(file);
      
      // Check size (Firestore limit is 1MB, base64 is ~33% larger)
      if (base64Image.length > 1000000) {
        throw new Error("Image is too large even after compression. Please upload a smaller file.");
      }

      await setDoc(doc(db, "settings", "homepage"), {
        drFarooqImageBase64: base64Image
      }, { merge: true });

      setMessage({ type: "success", text: "Photo updated successfully! It will now appear on the homepage." });
    } catch (error: any) {
      console.error("Upload error:", error);
      setMessage({ type: "error", text: error.message || "Failed to upload photo." });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-brand-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-brand-900 px-6 py-8 text-center">
          <h2 className="text-2xl font-display font-bold text-white">Admin Portal</h2>
          <p className="text-accent-400 text-sm mt-1">Dallas Clinicals Content Manager</p>
        </div>

        <div className="p-6">
          {!user ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-6">Please sign in to manage website content.</p>
              <button
                onClick={handleLogin}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-900 hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-900"
              >
                Sign in with Google
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm font-medium text-gray-900">Logged in as</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {user.email !== "shams96@yahoo.com" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  <p>You do not have admin privileges. Only shams96@yahoo.com can make changes.</p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Update PI Photo</h3>
                
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-accent-500 transition-colors relative">
                  <div className="space-y-1 text-center">
                    {uploading ? (
                      <Loader2 className="mx-auto h-12 w-12 text-brand-900 animate-spin" />
                    ) : (
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-brand-900 hover:text-brand-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-900"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageUpload}
                          disabled={uploading || user.email !== "shams96@yahoo.com"}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              {message && (
                <div className={`px-4 py-3 rounded-md text-sm flex items-start ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <p>{message.text}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
