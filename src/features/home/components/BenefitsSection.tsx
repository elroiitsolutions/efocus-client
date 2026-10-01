import { Link } from "react-router-dom";
import { NexBadge, NexChipIcon } from "@/components/ui/NexIcons";

interface CategoryCard {
  id: string;
  number: string;
  title: string;
  subtext: string;
  image: string;
  alt: string;
  slug: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "smt",
    number: "01",
    title: "SMT, Rework & Assembly",
    subtext: "Soldering • BGA Rework • JTAG • Embedded Hardware",
    image: "/categories/smt.png",
    alt: "SMT, Rework & Assembly Machinery",
    slug: "smt-rework-assembly",
  },
  {
    id: "cables",
    number: "02",
    title: "Cables & Connectivity",
    subtext: "Industrial Networking • RF • Fiber • USB • GPIB",
    image: "/categories/cables.png",
    alt: "Industrial Cables & Connectivity",
    slug: "cables-connectivity",
  },
  {
    id: "tools",
    number: "03",
    title: "Tools & MRO",
    subtext: "Hand Tools • Crimping • Wire Stripping • Consumables",
    image: "/categories/tools.png",
    alt: "Precision Hand Tools & Industrial MRO",
    slug: "tools-mro",
  },
  {
    id: "power",
    number: "04",
    title: "Power & Electrical",
    subtext: "Power Supplies • SMPS • Relays • Pneumatics • Components",
    image: "/categories/power.png",
    alt: "Power Supplies & Electrical Electronics",
    slug: "power-electrical",
  },
  {
    id: "esd-rf",
    number: "05",
    title: "ESD & RF",
    subtext: "ESD Protection • ESD Testing • RF Shielding • Antenna Couplers",
    image: "/categories/rf_esd.png",
    alt: "ESD Protection & RF Microwave Shielding",
    slug: "esd-rf",
  },
  {
    id: "testing",
    number: "06",
    title: "Testing & Measurement",
    subtext: "Electrical • RF • Power • Thermal • Mechanical • Inspection",
    image: "/categories/test.png",
    alt: "Precision Test & Measurement Instruments",
    slug: "testing-measurement",
  },
  {
    id: "workstations",
    number: "07",
    title: "IT Hardware & Workstations",
    subtext: "Workstations • Monitors • Storage • USB • PCB Storage",
    image: "/categories/workstations.png",
    alt: "Industrial Workstations & IT Hardware",
    slug: "it-hardware-workstation",
  },
  {
    id: "labelling",
    number: "08",
    title: "Labelling & Identification",
    subtext: "Labels • Barcode • RFID • Printers • Scanners",
    image: "/categories/labelling.png",
    alt: "Industrial Barcode Scanners, RFID & Printers",
    slug: "labelling-identification",
  },
];

export default function BenefitsSection() {
  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#fbfcfd]" id="benefits">
      <div className="w-full max-w-[100rem] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="flex justify-center mb-4">
            <NexBadge label="Product Categories" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-[#0d0f11] tracking-tight mb-4 leading-[1.15]">
            Everything Your Engineering &amp; Industrial Teams Need
          </h2>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Find the right products for your Engineering, Production, Testing and shopfloor Needs.
          </p>
        </div>

        {/* 8-Grid Product Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group relative bg-white border border-gray-200/90 rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 shadow-xs hover:shadow-[0_24px_50px_rgba(0,0,0,0.1)] hover:border-gray-300 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-50 border border-gray-100 flex items-center justify-center mb-5 p-2">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-108"
                  loading="lazy"
                />
              </div>

              {/* Text Info */}
              <div className="flex-1 flex flex-col justify-start">
                <h3 className="text-lg sm:text-[19px] font-bold text-[#0d0f11] tracking-tight group-hover:text-red-600 mb-2 transition-colors leading-snug">
                  {cat.number} — {cat.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-gray-500 font-medium leading-relaxed">
                  {cat.subtext}
                </p>
              </div>

              {/* Action Link */}
              <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0d0f11] group-hover:text-red-600 transition-colors">
                <span>Explore Category</span>
                <span className="text-base font-normal group-hover:translate-x-1.5 transition-transform duration-200">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-14 sm:mt-18 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/products"
            className="nex-button-swap inline-flex items-center gap-3 bg-[#111315] hover:bg-black text-white pl-2 pr-7 py-3 rounded-full font-semibold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <NexChipIcon />
            <span>VIEW ALL PRODUCTS →</span>
          </Link>
        </div>

      </div>
    </section>
  );
}

