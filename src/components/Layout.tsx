import { Link, Outlet } from "react-router-dom";
import { Globe, MapPin, Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "ES">("EN");

  const navLinks = [
    { name: "For Sponsors", path: "/sponsors" },
    { name: "For Patients", path: "/patients" },
    { name: "Locations", path: "/locations" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Bar - Contact & Lang */}
      <div className="bg-brand-900 text-white text-xs py-2 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline-flex items-center">
            <MapPin className="w-3 h-3 mr-1 text-accent-500" />
            Plano & Greenville, TX
          </span>
          <span className="text-gray-400">|</span>
          <a href="tel:+12147143597" className="hover:text-accent-400 transition-colors">
            214-714-3597
          </a>
        </div>
        <button
          onClick={() => setLang(lang === "EN" ? "ES" : "EN")}
          className="flex items-center space-x-1 hover:text-accent-400 transition-colors font-medium"
        >
          <Globe className="w-3 h-3" />
          <span>{lang}</span>
        </button>
      </div>

      {/* Main Navigation */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-brand-900 rounded-lg flex items-center justify-center text-accent-500 font-display font-bold text-xl group-hover:bg-brand-800 transition-colors">
                  DC
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xl leading-tight text-brand-900 tracking-tight">
                    Dallas Clinicals
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-accent-600 font-semibold">
                    Research Center
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-gray-600 hover:text-brand-900 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/check-eligibility"
                className="bg-brand-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-800 active:scale-95 transition-all shadow-md hover:shadow-lg flex items-center group"
              >
                Check Eligibility
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-brand-900 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-brand-900 hover:bg-gray-50 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/check-eligibility"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-4 w-full text-center bg-brand-900 text-white px-5 py-3 rounded-md text-base font-medium hover:bg-brand-800 active:scale-95 transition-transform"
              >
                Check Eligibility
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col relative">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 text-white pt-16 pb-8 border-t-4 border-accent-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-brand-900 font-display font-bold text-lg">
                  DC
                </div>
                <span className="font-display font-bold text-xl tracking-tight">
                  Dallas Clinicals
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                The premier high-tech clinical research hub in DFW, bridging the Plano tech corridor with Greenville's community reach for Phase 1-4 trials.
              </p>
              <div className="text-sm">
                <p className="font-semibold text-accent-400 mb-1">PI Oversight:</p>
                <p className="text-gray-300">Hassan Farooq, MD</p>
              </div>
            </div>

            <div>
              <h3 className="font-display font-semibold text-lg mb-6">Locations</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li>
                  <strong className="text-white block mb-1">Plano Office (Collin County)</strong>
                  123 Tech Corridor Blvd, Suite 100<br />
                  Plano, TX 75024
                </li>
                <li>
                  <strong className="text-white block mb-1">Greenville Office (Hunt County)</strong>
                  456 Medical Center Dr<br />
                  Greenville, TX 75401
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-lg mb-6">Therapeutic Areas</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Dermatology</li>
                <li>Endocrinology</li>
                <li>Metabolism (GLP-1/Obesity)</li>
                <li>Respiratory</li>
                <li>Infectious Diseases</li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-semibold text-lg mb-6">Contact Leadership</h3>
              <div className="bg-brand-800 p-4 rounded-lg border border-brand-700">
                <p className="text-xs text-gray-400 mb-2">
                  Inquiries regarding facility capabilities or protocol implementation:
                </p>
                <p className="font-medium text-white mb-1">Shams Islam</p>
                <p className="text-xs text-accent-400 mb-3">Director of Research</p>
                <a
                  href="mailto:research@dallasclinicals.com"
                  className="inline-block bg-white text-brand-900 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors w-full text-center"
                >
                  Contact Director
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Dallas Clinicals Research Center. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/hipaa" className="hover:text-white transition-colors">HIPAA Compliance</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
