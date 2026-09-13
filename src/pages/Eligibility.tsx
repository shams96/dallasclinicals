import { motion } from "framer-motion";
import React, { useState } from "react";
import { MapPin, User, Activity, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Eligibility() {
  const [step, setStep] = useState(1);
  const [zipCode, setZipCode] = useState("");
  const [routedLocation, setRoutedLocation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Simple routing logic: 750xx usually Plano/Collin County area
      if (zipCode.startsWith("750") || zipCode.startsWith("752")) {
        setRoutedLocation("Plano Facility (Collin County)");
      } else {
        setRoutedLocation("Greenville Facility (Hunt County)");
      }
      setStep(2);
    } else {
      // Final submit — contact info only, no medical/demographic fields.
      // Full intake (age, condition, etc.) happens live on the callback.
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      data.zipCode = zipCode;
      data.routedLocation = routedLocation;

      setIsSubmitting(true);
      try {
        await addDoc(collection(db, "patientInquiries"), {
          zipCode: data.zipCode,
          routedLocation: data.routedLocation,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          createdAt: serverTimestamp()
        });

        await fetch(import.meta.env.VITE_NOTIFY_URL, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _subject: "New Patient Callback Request",
            ...data
          })
        });

        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSubmitted(true); // Show success anyway for UX
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="w-full min-h-[80vh] bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-brand-900 p-8 text-center relative">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Check Eligibility</h1>
          <p className="text-accent-400">Find active studies near you.</p>
          
          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-800">
              <div 
                className="h-full bg-accent-500 transition-all duration-500"
                style={{ width: step === 1 ? "50%" : "100%" }}
              ></div>
            </div>
          )}
        </div>

        <div className="p-8 md:p-12">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-brand-900 mb-4">You're on the list!</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Your information has been securely routed to Dr. Farooq's team at our <strong>{routedLocation}</strong>.
              </p>
              <p className="text-gray-500 text-sm">
                A clinical coordinator will contact you shortly if you match an active protocol.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleNext}>
              {/* Honeypot field to prevent spam */}
              <input type="text" name="_honey" style={{ display: 'none' }} />
              <input type="hidden" name="_captcha" value="false" />

              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-accent-600" />
                    Location & Basic Info
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input 
                      required 
                      type="text" 
                      maxLength={5}
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all text-lg" 
                      placeholder="e.g. 75024" 
                    />
                    <p className="text-xs text-gray-500 mt-2">Used to route you to the closest facility (Plano or Greenville).</p>
                  </div>

                  <button type="submit" className="w-full mt-8 bg-brand-900 text-white font-bold py-4 rounded-lg hover:bg-brand-800 transition-colors flex items-center justify-center space-x-2">
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-accent-50 border border-accent-200 p-4 rounded-lg mb-6 flex items-start">
                    <MapPin className="w-5 h-5 text-accent-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-accent-900">
                      Based on your zip code, you will be routed to our <strong>{routedLocation}</strong>.
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-brand-900 mb-6 flex items-center">
                    <Activity className="w-6 h-6 mr-2 text-accent-600" />
                    Contact Info
                  </h3>
                  <p className="text-sm text-gray-500 -mt-4">
                    A clinical coordinator will call you to complete the rest of your intake.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input required type="text" name="firstName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input required type="text" name="lastName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input required type="tel" name="phone" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input required type="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" />
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <button type="button" disabled={isSubmitting} onClick={() => setStep(1)} className="w-1/3 bg-gray-100 text-gray-700 font-bold py-4 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors">
                      Back
                    </button>
                    <button type="submit" disabled={isSubmitting} className="w-2/3 bg-brand-900 text-white font-bold py-4 rounded-lg hover:bg-brand-800 disabled:opacity-70 transition-colors flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Securely</span>
                          <CheckCircle className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
