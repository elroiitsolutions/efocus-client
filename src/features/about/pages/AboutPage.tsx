import { ShieldCheck, Award, Users, Check } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-[#f9f9fb] min-h-screen py-16 text-left">
      <div className="max-w-[950px] mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-extrabold text-[#222222] tracking-tight">
            About eFOCUS Industrial
          </h1>
          <p className="text-[#777777] text-[16px] mt-3 max-w-[700px] mx-auto">
            Consolidating multi-vendor component supplies into a unified, spec-compliant procurement channel.
          </p>
        </div>

        {/* Brand Mission details */}
        <section className="bg-white rounded-[16px] border border-[#eaeaea] p-4 sm:p-8 lg:p-12 shadow-sm mb-12 flex flex-col gap-6">
          <h2 className="font-heading text-2xl font-bold text-[#222222]">
            Our Sourcing Philosophy
          </h2>
          <p className="text-[#555555] text-[15px] leading-relaxed">
            Founded to eliminate the supply chain fragmentation, eFOCUS provides a single channel for purchasing test leads, custom wire harnesses, SMT bench accessories, and power connections.
          </p>
          <p className="text-[#555555] text-[15px] leading-relaxed">
            We work with manufacturing plants, EMS providers, R&D labs, and academic research institutions to supply fully tested components. Rather than dealing with multiple shipments, POs, and invoices, you receive one shipment, labeled and tracked.
          </p>
        </section>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-[10px] border border-[#eaeaea] p-6 shadow-sm">
            <div className="w-12 h-12 bg-[#FFF0F0] text-[#B20602] rounded-full flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-heading text-[16.8px] font-bold text-[#222222]">
              100% Quality Guaranteed
            </h3>
            <p className="text-[13px] text-[#777777] mt-2 leading-relaxed">
              Every custom RF jumper, ribbon cord, or wire harness is verified prior to dispatch.
            </p>
          </div>

          <div className="bg-white rounded-[10px] border border-[#eaeaea] p-6 shadow-sm">
            <div className="w-12 h-12 bg-[#FFF0F0] text-[#B20602] rounded-full flex items-center justify-center mb-4">
              <Award size={24} />
            </div>
            <h3 className="font-heading text-[16.8px] font-bold text-[#222222]">
              IPC WHMA Certified
            </h3>
            <p className="text-[13px] text-[#777777] mt-2 leading-relaxed">
              Crimping, soldiering, and assemblies are produced in accordance with IPC-WHMA-A-620 criteria.
            </p>
          </div>

          <div className="bg-white rounded-[10px] border border-[#eaeaea] p-6 shadow-sm">
            <div className="w-12 h-12 bg-[#FFF0F0] text-[#B20602] rounded-full flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="font-heading text-[16.8px] font-bold text-[#222222]">
              Accountable Sourcing
            </h3>
            <p className="text-[13px] text-[#777777] mt-2 leading-relaxed">
              One account manager handles your technical configurations, orders, and logistics.
            </p>
          </div>
        </div>

        {/* Sourcing checklist */}
        <section className="bg-white rounded-[16px] border border-[#eaeaea] p-4 sm:p-8 lg:p-12 shadow-sm">
          <h2 className="font-heading text-2xl font-bold text-[#222222] mb-6">
            Standards & Traceability
          </h2>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3">
              <Check className="text-[#B20602] mt-0.5 shrink-0" size={18} strokeWidth={3} />
              <span className="text-[14.4px] text-[#555555]">
                <strong>Full Material Traceability:</strong> Certified raw wires and insulation sleeves with batch trace numbers.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="text-[#B20602] mt-0.5 shrink-0" size={18} strokeWidth={3} />
              <span className="text-[14.4px] text-[#555555]">
                <strong>Continuity Verification:</strong> Standard test beds verify point-to-point pinout mappings on every cable run.
              </span>
            </li>
            <li className="flex gap-3">
              <Check className="text-[#B20602] mt-0.5 shrink-0" size={18} strokeWidth={3} />
              <span className="text-[14.4px] text-[#555555]">
                <strong>ESD Safe Packaging:</strong> Conductive shielding bags protect assemblies from ESD during storage and transit.
              </span>
            </li>
          </ul>
        </section>

      </div>
    </div>
  )
}
