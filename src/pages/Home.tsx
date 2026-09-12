import { motion } from "framer-motion";
import { ArrowRight, Activity, ShieldCheck, Users, Building2, Stethoscope, Microscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [piImage, setPiImage] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "homepage"), (doc) => {
      if (doc.exists() && doc.data().drFarooqImageBase64) {
        setPiImage(doc.data().drFarooqImageBase64);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION: Split Screen Concept */}
      <section className="relative w-full h-[85vh] flex flex-col md:flex-row overflow-hidden bg-brand-900">
        {/* Plano Side (Tech/Urban) */}
        <motion.div 
          className="relative flex-1 h-full group cursor-pointer"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/80 to-transparent md:bg-gradient-to-r md:from-brand-900 md:via-brand-900/60 md:to-transparent"></div>
          
          <div className="relative h-full flex flex-col justify-end md:justify-center p-8 md:p-16 lg:p-24 z-10">
            <div className="inline-flex items-center space-x-2 bg-accent-500/10 text-accent-400 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 w-fit border border-accent-500/20 backdrop-blur-sm">
              <Building2 className="w-3 h-3" />
              <span>Plano, TX</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-blue-400">Research.</span>
            </h2>
            <p className="text-gray-300 max-w-md text-lg mb-8">
              High-tech clinical trials in the heart of the Collin County tech corridor. Accelerating Phase 1-4 studies.
            </p>
            <Link to="/sponsors" className="flex items-center text-white font-medium hover:text-accent-400 transition-colors w-fit group/link">
              Sponsor Portal <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Greenville Side (Community/Medical) */}
        <motion.div 
          className="relative flex-1 h-full group cursor-pointer border-t md:border-t-0 md:border-l border-brand-800"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/80 to-transparent md:bg-gradient-to-l md:from-brand-900 md:via-brand-900/60 md:to-transparent"></div>
          
          <div className="relative h-full flex flex-col justify-end md:justify-center p-8 md:p-16 lg:p-24 z-10">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 w-fit border border-blue-500/20 backdrop-blur-sm">
              <Users className="w-3 h-3" />
              <span>Greenville, TX</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
              Local <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent-400">Impact.</span>
            </h2>
            <p className="text-gray-300 max-w-md text-lg mb-8">
              Community-centric medical access in Northeast Texas. Expanding demographic reach for rapid enrollment.
            </p>
            <Link to="/patients" className="flex items-center text-white font-medium hover:text-blue-300 transition-colors w-fit group/link">
              Patient Experience <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Absolute Center Badge */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-brand-900 border-4 border-accent-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(100,255,218,0.3)]">
            <Activity className="w-6 h-6 text-accent-400" />
          </div>
        </div>
      </section>

      {/* 2. PI PROFILE & AUTHORITY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative bg-brand-900 group">
                <img 
                  src={piImage || "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop"} 
                  alt="Dr. Hassan Farooq, MD" 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback just in case the image isn't uploaded yet
                    (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Hassan+Farooq&background=112240&color=64FFDA&size=512";
                  }}
                />
                
                {/* Gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/20 to-transparent z-10"></div>
                
                <div className="absolute bottom-0 left-0 p-8 z-20">
                  <p className="text-accent-400 font-semibold mb-1 tracking-wider uppercase text-sm">Principal Investigator</p>
                  <h3 className="text-3xl font-display font-bold text-white">Hassan Farooq, MD</h3>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gray-100 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-accent-500/20 rounded-full -z-10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-sm font-bold tracking-widest text-accent-600 uppercase mb-3">Medical Authority</h2>
              <h3 className="text-4xl font-display font-bold text-brand-900 mb-6 leading-tight">
                Leading the Future of Clinical Research in DFW.
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Under the expert oversight of Dr. Hassan Farooq, Dallas Clinicals operates at the intersection of advanced medical science and compassionate patient care. 
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Our dual-site model leverages the high-tech infrastructure of Plano and the diverse demographic reach of Greenville, ensuring rapid enrollment and rigorous protocol adherence for Phase 1-4 trials.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="w-6 h-6 text-accent-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-brand-900">FDA Compliant</h4>
                    <p className="text-sm text-gray-500">Strict adherence to GCP guidelines.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Microscope className="w-6 h-6 text-accent-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-brand-900">Phase 1-4 Trials</h4>
                    <p className="text-sm text-gray-500">Comprehensive study capabilities.</p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-900 text-brand-900 font-medium rounded-full hover:bg-brand-900 hover:text-white transition-colors">
                Read Full Profile
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. THERAPEUTIC SPECIALIZATIONS (B2B Teaser) */}
      <section className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-accent-600 uppercase mb-3">Therapeutic Specializations</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-900 mb-6">
              Targeted Expertise for Complex Protocols
            </h3>
            <p className="text-gray-600 text-lg">
              Our dedicated modules are equipped to handle specialized trials with precision, backed by our extensive DFW patient database.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: "Dermatology", desc: "Advanced skin condition therapies." },
              { name: "Endocrinology", desc: "Hormonal & metabolic research." },
              { name: "Metabolism", desc: "GLP-1 & Obesity studies." },
              { name: "Respiratory", desc: "Asthma, COPD & pulmonary trials." },
              { name: "Infectious Diseases", desc: "Vaccine & antiviral efficacy." },
            ].map((area, i) => (
              <motion.div 
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-accent-500/30 transition-all group"
              >
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-500/10 transition-colors">
                  <Stethoscope className="w-6 h-6 text-brand-900 group-hover:text-accent-600" />
                </div>
                <h4 className="font-bold text-brand-900 mb-2">{area.name}</h4>
                <p className="text-sm text-gray-500">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SMART FORM / CTA TEASER */}
      <section className="py-24 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173ff9e5e3c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Ready to Advance Medical Science?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Whether you are a sponsor looking for rapid enrollment or a patient seeking new treatments, Dallas Clinicals is your partner in research.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/check-eligibility" className="w-full sm:w-auto px-8 py-4 bg-accent-500 text-brand-900 font-bold rounded-full hover:bg-accent-400 transition-colors shadow-[0_0_20px_rgba(100,255,218,0.4)]">
              Check Patient Eligibility
            </Link>
            <Link to="/sponsors" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Sponsor Inquiries
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
