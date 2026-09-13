import { motion } from "framer-motion";
import { Building2, Users, Target, Activity, Send, CheckCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function Sponsors() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    try {
      // 1. Save to Firebase
      await addDoc(collection(db, "sponsorInquiries"), {
        fullName: data.fullName,
        company: data.company,
        email: data.email,
        phone: data.phone || "Not provided",
        therapeuticArea: data.therapeuticArea,
        message: data.message,
        createdAt: serverTimestamp()
      });

      // 2. Send notification email
      await fetch(import.meta.env.VITE_NOTIFY_URL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: "New Protocol Implementation Inquiry",
          ...data
        })
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setIsSubmitted(true); // Show success anyway for UX
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-brand-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            The DFW Sponsor Portal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Accelerate your clinical trials with our Dual-Site model, offering unparalleled access to the diverse demographics of Collin and Hunt counties.
          </motion.p>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-14 h-14 bg-accent-500/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">DFW Recruitment Advantage</h3>
              <p className="text-gray-600">
                Offices in Plano and Greenville provide access to a massive, diverse demographic, ensuring rapid and representative enrollment.
              </p>
            </div>
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">Enrollment Excellence</h3>
              <p className="text-gray-600">
                Internal expertise in site dynamics and participant demographics. Our Dual-Site model significantly reduces study timelines.
              </p>
            </div>
            <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-900 mb-3">High-Tech Infrastructure</h3>
              <p className="text-gray-600">
                Leveraging the prestige of the Plano tech corridor with 2026-standard data encryption, EDC proficiency, and strict GCP compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-brand-900 p-8 text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-2">Protocol Implementation Inquiry</h2>
            <p className="text-accent-400 text-sm">Direct all inquiries to Shams Islam, Director of Research</p>
          </div>
          
          <div className="p-8">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-900 mb-2">Inquiry Received</h3>
                <p className="text-gray-600">Thank you. Shams Islam or a member of our research team will contact you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field to prevent spam */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                <input type="hidden" name="_captcha" value="false" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input required type="text" name="fullName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company / CRO</label>
                    <input required type="text" name="company" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="Pharma Corp" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input required type="email" name="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="jane@pharmacorp.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input required type="tel" name="phone" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Therapeutic Area</label>
                  <select name="therapeuticArea" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all">
                    <option>Dermatology</option>
                    <option>Endocrinology</option>
                    <option>Metabolism (GLP-1/Obesity)</option>
                    <option>Respiratory</option>
                    <option>Infectious Diseases</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Protocol Details / Message</label>
                  <textarea required name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-accent-500 outline-none transition-all" placeholder="Brief description of the study phase and requirements..."></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-brand-900 text-white font-bold py-4 rounded-lg hover:bg-brand-800 disabled:opacity-70 transition-colors flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry to Director</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
