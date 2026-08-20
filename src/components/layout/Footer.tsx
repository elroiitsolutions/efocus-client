import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Linkedin, Twitter, Youtube, Mail, Phone, Globe } from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thank you! Please email your line list files directly to chandruravichandran1536@gmail.com`)
    setEmail("")
  }

  const clients = [
    {
      name: "Delta",
      logo: (
        <div className="flex items-center gap-1.5 opacity-65 hover:opacity-100 transition-opacity duration-200">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12,2 2,22 22,22" />
          </svg>
          <span className="font-extrabold text-[15px] tracking-wider text-white">DELTA</span>
        </div>
      )
    },
    {
      name: "Bharat FIH",
      logo: (
        <div className="flex flex-col items-start opacity-65 hover:opacity-100 transition-opacity duration-200 leading-none">
          <span className="font-extrabold text-[14px] tracking-tight text-white">BHARAT FIH</span>
          <span className="text-[7px] text-[#777777] mt-0.5">A Foxconn Technology Group Company</span>
        </div>
      )
    },
    {
      name: "Ashok Leyland",
      logo: (
        <div className="flex items-center gap-1.5 opacity-65 hover:opacity-100 transition-opacity duration-200">
          <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center font-bold text-[9px] text-white">L</div>
          <span className="font-bold text-[12px] tracking-wider text-white">ASHOK LEYLAND</span>
        </div>
      )
    },
    {
      name: "Valeo",
      logo: (
        <div className="flex items-center opacity-65 hover:opacity-100 transition-opacity duration-200">
          <span className="font-black text-[17px] italic text-[#90d53f]">Valeo</span>
        </div>
      )
    },
    {
      name: "Hyundai",
      logo: (
        <div className="flex flex-col items-center opacity-65 hover:opacity-100 transition-opacity duration-200 leading-none">
          <svg className="w-6 h-4 text-white" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <ellipse cx="12" cy="8" rx="10" ry="6" />
            <path d="M8,4 L10,4 L11,12 L9,12 Z M14,4 L16,4 L15,12 L13,12 Z M9.5,8 L14.5,8" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="text-[7.5px] font-bold tracking-widest text-white mt-1">HYUNDAI</span>
        </div>
      )
    },
    {
      name: "Tata Electronics",
      logo: (
        <div className="flex flex-col items-start opacity-65 hover:opacity-100 transition-opacity duration-200 leading-none">
          <span className="font-bold text-[13px] tracking-wider text-white">TATA</span>
          <span className="text-[7px] tracking-wider text-[#777777] uppercase mt-0.5">ELECTRONICS</span>
        </div>
      )
    },
    {
      name: "Motorola",
      logo: (
        <div className="flex items-center gap-1.5 opacity-65 hover:opacity-100 transition-opacity duration-200">
          <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center font-extrabold text-[11px] italic text-white">M</div>
          <span className="font-bold text-[13px] tracking-tight text-white">motorola</span>
        </div>
      )
    },
    {
      name: "Wistron",
      logo: (
        <div className="flex items-center opacity-65 hover:opacity-100 transition-opacity duration-200">
          <span className="font-extrabold text-[15px] tracking-tight text-white italic">wistron</span>
        </div>
      )
    },
    {
      name: "CVRDE (DRDO)",
      logo: (
        <div className="flex items-center gap-1.5 opacity-65 hover:opacity-100 transition-opacity duration-200">
          <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center font-bold text-[7px] text-white">DRDO</div>
          <span className="font-bold text-[11px] tracking-tight text-white">CVRDE</span>
        </div>
      )
    },
    {
      name: "ISRO",
      logo: (
        <div className="flex items-center gap-1.5 opacity-65 hover:opacity-100 transition-opacity duration-200">
          <span className="font-bold text-[13px] tracking-widest text-white">ISRO</span>
        </div>
      )
    },
    {
      name: "TANGEDCO",
      logo: (
        <div className="flex items-center opacity-65 hover:opacity-100 transition-opacity duration-200">
          <span className="font-bold text-[12px] tracking-wider text-white">TANGEDCO</span>
        </div>
      )
    },
    {
      name: "HCL",
      logo: (
        <div className="flex items-center opacity-65 hover:opacity-100 transition-opacity duration-200">
          <span className="font-black text-[17px] tracking-tight text-white">HCL</span>
        </div>
      )
    }
  ]

  return (
    <footer className="bg-[#121214] text-[#ffffff] pt-[72px] pb-8 border-t border-[#222226]">
      <div className="max-w-[1380px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About & Contact */}
          <div className="flex flex-col gap-6">
            <img
              src="/images/logo.png"
              alt="eFocus Industrial Solutions"
              className="bg-white px-3 py-1.5 rounded-[6px] h-10 w-auto self-start"
            />
            <p className="text-[14px] text-[#777777] leading-relaxed">
              Industrial Solutions — Test leads, RF assemblies, automation cabling & custom builds, engineered to spec and stocked deep.
            </p>

            <div className="flex flex-col gap-3 text-[14px]">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#B20602]" />
                <span>
                  <strong>Sales Email:</strong>{" "}
                  <a
                    href="mailto:chandruravichandran1536@gmail.com"
                    className="hover:text-[#B20602] transition-colors"
                  >
                    chandruravichandran1536@gmail.com
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#B20602]" />
                <span>
                  <strong>Phone / WhatsApp:</strong>{" "}
                  <a
                    href="tel:+917397242650"
                    className="hover:text-[#B20602] transition-colors"
                  >
                    +91 7397 242 650
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-[#B20602]" />
                <span>
                  <strong>Web Catalogue:</strong>{" "}
                  <a
                    href="https://efocusinds.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#B20602] transition-colors"
                  >
                    efocusinds.com
                  </a>
                </span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-[#B20602] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-[#B20602] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-[#B20602] transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="font-heading text-[18px] font-bold mb-6 text-white">
              Product Categories
            </h4>
            <ul className="flex flex-col gap-3 text-[14px] text-[#777777]">
              <li>
                <Link
                  to="/categories/smt-rework-assembly"
                  className="hover:text-[#B20602] transition-colors"
                >
                  SMT, Rework & Assembly
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/cables-connectivity"
                  className="hover:text-[#B20602] transition-colors"
                >
                  Cables & Connectivity
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/tools-mro"
                  className="hover:text-[#B20602] transition-colors"
                >
                  Tools & MRO
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/power-electrical"
                  className="hover:text-[#B20602] transition-colors"
                >
                  Power & Electrical
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/esd-rf"
                  className="hover:text-[#B20602] transition-colors"
                >
                  ESD & RF Control
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/testing-measurement"
                  className="hover:text-[#B20602] transition-colors"
                >
                  Testing & Measurement
                </Link>
              </li>
              <li>
                <Link
                  to="/custom-assembly"
                  className="hover:text-[#B20602] transition-colors"
                >
                  Custom Harness Builds
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="font-heading text-[18px] font-bold mb-6 text-white">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 text-[14px] text-[#777777]">
              <li>
                <a href="#brochure" className="hover:text-[#B20602] transition-colors">
                  2026 Product Brochure
                </a>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#B20602] transition-colors">
                  Single-Vendor Procurement
                </Link>
              </li>
              <li>
                <Link
                  to="/custom-assembly"
                  className="hover:text-[#B20602] transition-colors"
                >
                  Custom Build Request
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#B20602] transition-colors">
                  Datasheets & Compliance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B20602] transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#B20602] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Consolidation */}
          <div className="flex flex-col gap-6">
            <h4 className="font-heading text-[18px] font-bold text-white">
              Let's consolidate your supply.
            </h4>
            <p className="text-[14px] text-[#777777] leading-relaxed">
              Send us your current component line list — we'll match it, brand for brand, and quote as one single order.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email..."
                required
                className="w-full bg-[#1a1a1e] border border-[#222226] rounded-[6px] px-4 py-3 text-[14px] outline-none text-white focus:border-[#B20602] transition-colors"
                aria-label="Enter email for quote consolidation"
              />
              <button
                type="submit"
                className="bg-[#B20602] hover:bg-[#900502] text-white py-3 rounded-[6px] text-[14px] font-bold transition-colors cursor-pointer"
              >
                Submit Line List
              </button>
            </form>
          </div>
        </div>

        {/* ─── Our Valuable Clients Ticker ─── */}
        <div className="mt-16 pt-8 border-t border-[#1a1a1e]">
          <div className="text-center mb-6">
            <h4 className="text-[12px] font-bold tracking-[0.2em] text-[#777777] uppercase font-hero-heading">
              Our Valuable Clients
            </h4>
          </div>
          
          <div className="relative w-full overflow-hidden mask-gradient-x py-4 bg-[#18181b]/30 rounded-xl border border-[#222226]/50">
            <div className="flex gap-20 items-center w-max animate-infinite-scroll hover:[animation-play-state:paused] cursor-pointer">
              {/* First loop */}
              {clients.map((client, idx) => (
                <div key={`c1-${idx}`} className="flex items-center justify-center shrink-0">
                  {client.logo}
                </div>
              ))}
              {/* Second loop (seamless looping) */}
              {clients.map((client, idx) => (
                <div key={`c2-${idx}`} className="flex items-center justify-center shrink-0">
                  {client.logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-[#1a1a1e] flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-[#777777]">
          <div>
            &copy; 2026 eFOCUS Industrial Solutions. All Rights Reserved. CAT. No. EF-2026/CI
          </div>
          <div>
            Direct Sales:{" "}
            <strong>
              <a
                href="mailto:chandruravichandran1536@gmail.com"
                className="text-white hover:text-[#B20602]"
              >
                chandruravichandran1536@gmail.com
              </a>
            </strong>{" "}
            |{" "}
            <strong>
              <a href="tel:+917397242650" className="text-white hover:text-[#B20602]">
                +91 7397 242 650
              </a>
            </strong>
          </div>
        </div>
      </div>
    </footer>
  )
}
