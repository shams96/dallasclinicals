import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Locations() {
  return (
    <div className="w-full">
      <section className="bg-brand-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Our Locations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Strategically positioned across DFW to maximize patient access and demographic diversity.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Plano Location */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-64 bg-gray-200 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3343.837055811797!2d-96.8225984!3d33.0597142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c231a44e66161%3A0x6d9348d28a39a04!2sPlano%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Plano Office Map"
              ></iframe>
            </div>
            <div className="p-8 flex-grow">
              <div className="inline-block bg-accent-500/10 text-accent-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Collin County
              </div>
              <h2 className="text-3xl font-display font-bold text-brand-900 mb-6">Plano Facility</h2>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-900 mt-0.5" />
                  <p>123 Tech Corridor Blvd, Suite 100<br/>Plano, TX 75024</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-brand-900" />
                  <p>214-714-3597</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-brand-900" />
                  <p>info@dallasclinicals.com</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-brand-900 mt-0.5" />
                  <p>Mon-Fri: 8:00 AM - 5:00 PM<br/>Sat-Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Greenville Location */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-64 bg-gray-200 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3340.584167191398!2d-96.1118175!3d33.1462444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864a354011816e59%3A0x9483321520108842!2sGreenville%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Greenville Office Map"
              ></iframe>
            </div>
            <div className="p-8 flex-grow">
              <div className="inline-block bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Hunt County
              </div>
              <h2 className="text-3xl font-display font-bold text-brand-900 mb-6">Greenville Facility</h2>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-brand-900 mt-0.5" />
                  <p>456 Medical Center Dr<br/>Greenville, TX 75401</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-brand-900" />
                  <p>214-714-3597</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-brand-900" />
                  <p>info@dallasclinicals.com</p>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-brand-900 mt-0.5" />
                  <p>Mon-Fri: 8:00 AM - 5:00 PM<br/>Sat-Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
