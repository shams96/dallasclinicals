import { motion } from "framer-motion";
import React, { useState } from "react";
import { MapPin, User, Activity, ArrowRight, CheckCircle } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Eligibility() {
  const [step, setStep] = useState(1);
  const [zipCode, setZipCode] = useState("");
  const [routedLocation, setRoutedLocation] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      // Final submit
      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      
      // Add the zip code and routed location to the data since they are from step 1
      data.zipCode = zipCode;
      data.routedLocation = routedLocation;

      try {
        // 1. Save to Firebase
        await addDoc(collection(db, "patientInquiries"), {
          zipCode: data.zipCode,
          routedLocation: data.routedLocation,
          age: Number(data.age),
          gender: data.gender,
          condition: data.condition,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          createdAt: serverTimestamp()
        });

        // 2. Send Email via FormSubmit
        await fetch("https://formsubmit.co/ajax/info@dallasclinicals.com", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: "New Patient Eligibility Submission",
            ...data
          })
        });
        
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSubmitted(true); // Show success anyway for UX
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input required type="number" name="age" min="18" max="100" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="18+" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select required name="gender" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all">
                        <option value="">Select...</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
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
                    Medical Interest
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Condition of Interest</label>
                    <select required name="condition" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all">
                      <option value="">Select a condition...</option>
                      <option>Healthy Volunteer (Phase I)</option>
                      <option>Obesity / Weight Management</option>
                      <option>Type 2 Diabetes</option>
                      <option>Asthma / COPD</option>
                      <option>Skin Condition (Psoriasis, Eczema)</option>
                      <option>Other</option>
                    </select>
                  </div>

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

                  <div className="flex space-x-4 mt-8">
                    <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-gray-100 text-gray-700 font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors">
                      Back
                    </button>
                    <button type="submit" className="w-2/3 bg-brand-900 text-white font-bold py-4 rounded-lg hover:bg-brand-800 transition-colors flex items-center justify-center space-x-2">
                      <span>Submit Securely</span>
                      <CheckCircle className="w-5 h-5" />
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
