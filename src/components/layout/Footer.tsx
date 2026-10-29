import { Link } from "react-router-dom";
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight,
  MessageCircle,
  Headphones
} from "lucide-react";

export default function Footer() {
  const triggerProcurement = (mode: "quote" | "bom" = "quote") => {
    window.dispatchEvent(
      new CustomEvent("open-procurement-modal", { detail: { mode } })
    );
  };

  return (
    <footer className="w-full pt-20 pb-32 sm:pb-16 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd] border-t border-gray-200/80 flex flex-col items-center" id="footer">
      <div className="w-full max-w-[102rem] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-10 pb-16">
          
          {/* Column 1: Corporate Profile */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            <div className="space-y-3">
              <Link to="/" className="inline-block group">
                <img
                  src="/logo.png"
                  alt="eFocus Logo"
                  className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                />
              </Link>
              <h3 className="text-base font-bold text-[#0d0f11] tracking-tight">
                eFocus Industrial Solutions Pvt. Ltd.
              </h3>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Your trusted technical marketplace and B2B supply partner for precision test & measurement instruments, SMT assembly equipment, power electronics, and industrial hardware.
            </p>

            {/* Compliance & Certification Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-gray-50 border border-gray-200/80 text-xs text-gray-700">
              <span className="flex items-center gap-1 font-semibold text-gray-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                GST No:
              </span>
              <span className="font-mono text-gray-800 font-medium">33AAECE0038M1ZU</span>  
            </div>

            {/* Social Channels */}
            {/* <div className="pt-2 flex items-center gap-3 text-gray-600"> */}
              {/* LinkedIn */}
              {/* <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#111315] hover:text-white flex items-center justify-center transition-all cursor-pointer" 
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a> */}

              {/* YouTube */}
              {/* <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#111315] hover:text-white flex items-center justify-center transition-all cursor-pointer" 
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a> */}

              {/* Facebook */}
              {/* <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#111315] hover:text-white flex items-center justify-center transition-all cursor-pointer" 
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a> */}

              {/* Instagram */}
              {/* <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#111315] hover:text-white flex items-center justify-center transition-all cursor-pointer" 
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div> */}
          </div>

          {/* Column 2: Hardware Matrix */}
          <div className="sm:col-span-1 lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-[#0d0f11] uppercase tracking-wider">
              Hardware Matrix
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link to="/products?category=smt-assembly-rework" className="hover:text-red-600 transition-colors">
                  SMT, Rework & Assembly
                </Link>
              </li>
              <li>
                <Link to="/products?category=cables-connectivity" className="hover:text-red-600 transition-colors">
                  Cables & Connectivity
                </Link>
              </li>
              <li>
                <Link to="/products?category=tools-mro" className="hover:text-red-600 transition-colors">
                  Tools & MRO
                </Link>
              </li>
              <li>
                <Link to="/products?category=power-electrical" className="hover:text-red-600 transition-colors">
                  Power & Electrical
                </Link>
              </li>
              <li>
                <Link to="/products?category=esd-rf" className="hover:text-red-600 transition-colors">
                  ESD & RF Control
                </Link>
              </li>
              <li>
                <Link to="/products?category=test-measurement" className="hover:text-red-600 transition-colors">
                  Test & Measurement
                </Link>
              </li>
              <li>
                <Link to="/products?category=it-hardware-workstations" className="hover:text-red-600 transition-colors">
                  IT Hardware & Workstations
                </Link>
              </li>
              <li>
                <Link to="/products?category=labelling-identification" className="hover:text-red-600 transition-colors">
                  Labelling & Identification
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Procurement Solutions */}
          <div className="sm:col-span-1 lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-[#0d0f11] uppercase tracking-wider">
              Procurement Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <button 
                  onClick={() => triggerProcurement("bom")} 
                  className="hover:text-red-600 transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span>BOM Procurement</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </li>
              <li>
                <Link to="/custom-assembly" className="hover:text-red-600 transition-colors">
                  Vendor Consolidation
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-red-600 transition-colors">
                  Annual Rate Contracts (ARC)
                </Link>
              </li>
              <li>
                <Link to="/custom-assembly" className="hover:text-red-600 transition-colors">
                  Project Procurement
                </Link>
              </li>
              <li>
                <Link to="/products?category=it-hardware-workstations" className="hover:text-red-600 transition-colors">
                  Turnkey Workstations
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-red-600 transition-colors">
                  Recurring Procurement
                </Link>
              </li>
            </ul>

            {/* Quick Sourcing CTA Card */}
            <div className="pt-2">
              <button
                onClick={() => triggerProcurement("bom")}
                className="w-full text-left p-3 rounded-2xl bg-gray-50 hover:bg-red-50/50 border border-gray-200/80 hover:border-red-300 transition-all cursor-pointer group"
              >
                <p className="text-xs font-semibold text-gray-900 group-hover:text-red-600">
                  Ready with a multi-line BOM?
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Upload file for 2-hour turnaround quote →
                </p>
              </button>
            </div>
          </div>

          {/* Column 4: Technical Sales & Direct Contact */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-[#0d0f11] uppercase tracking-wider">
              Technical Sales & Contact
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-gray-600">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  66, Pallavan Nagar Main Rd, Extn, Pallavan Nagar, Maduravoyal, Chennai, Tamil Nadu 600095
                </span>
              </div>

              {/* Sales Desk */}
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-gray-500 shrink-0" />
                <div>
                  <span className="text-gray-400 text-xs block">Sales Desk:</span>
                  <a href="tel:+914428001234" className="font-semibold text-gray-900 hover:text-red-600 transition-colors">
                    +91 44 2800 1234
                  </a>
                </div>
              </div>

              {/* WhatsApp Desk */}
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-gray-400 text-xs block">WhatsApp Desk:</span>
                  <a 
                    href="https://wa.me/919840012345" 
                    target="_blank" 
                    rel="noreferrer"
                    className="font-semibold text-emerald-700 hover:underline transition-colors"
                  >
                    +91 98400 12345
                  </a>
                </div>
              </div>

              {/* Quote Requests */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <div>
                  <span className="text-gray-400 text-xs block">Quote Requests:</span>
                  <a href="mailto:sales@efocus.in" className="font-semibold text-gray-900 hover:text-red-600 transition-colors">
                    sales@efocus.in
                  </a>
                </div>
              </div>

              {/* Technical Support */}
              <div className="flex items-center gap-2.5">
                <Headphones className="w-4 h-4 text-gray-500 shrink-0" />
                <div>
                  <span className="text-gray-400 text-xs block">Technical Support:</span>
                  <a href="mailto:support@efocus.in" className="font-semibold text-gray-900 hover:text-red-600 transition-colors">
                    support@efocus.in
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-2.5 pt-1 border-t border-gray-100 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span>
                  Monday – Saturday | 9:00 AM – 6:30 PM IST
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            Copyright © {new Date().getFullYear()} eFocus Industrial Solutions Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 sm:pr-60">
            <Link to="/about" className="hover:text-black transition-colors">About eFocus</Link>
            <span>•</span>
            <Link to="/categories" className="hover:text-black transition-colors">All Categories</Link>
            <span>•</span>
            <Link to="/products" className="hover:text-black transition-colors">Products</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-black transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
