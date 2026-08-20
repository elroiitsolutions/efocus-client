import { useState } from "react"
import { useQuoteStore } from "@/features/quote/store/quote.store"
import { Check, ShieldCheck, Settings, Layers, Send } from "lucide-react"

export default function CustomAssemblyPage() {
  const addItem = useQuoteStore((state) => state.addItem)
  const openDrawer = useQuoteStore((state) => state.openDrawer)

  const [assemblyType, setAssemblyType] = useState("Ribbon Cables")
  const [insulation, setInsulation] = useState("Standard Flat Ribbon")
  const [length, setLength] = useState("1.0")
  const [quantity, setQuantity] = useState(10)
  const [pinout, setPinout] = useState("Straight-Through (1-to-1)")
  const [notes, setNotes] = useState("")

  const handleConfiguratorSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addItem({
      id: `custom-build-${Date.now()}`,
      name: `Custom ${assemblyType} Build - ${pinout} - Length: ${length}m`,
      category: "Custom & Assembly",
      code: "CST-BUILD",
      specs: {
        assemblyType: `${assemblyType} (${pinout})`,
        insulationOption: `${insulation} - Qty: ${quantity}`,
      },
    })

    alert(
      `Custom assembly configuration added to quote basket! Complete your request in the basket drawer.`
    )
    openDrawer()
  }

  const assemblyTypes = [
    {
      name: "Ribbon Cables",
      desc: "Standard flat ribbon cables with IDC sockets, transition connectors, and custom pinouts.",
    },
    {
      name: "Wire Harnesses",
      desc: "Multi-conductor harnesses with crimped terminals, heat-shrink tubing, and protective braided sleeves.",
    },
    {
      name: "Internal Wiring",
      desc: "Point-to-point chassis wiring, sub-assembly wiring, and cabinet interconnects built to schematic.",
    },
    {
      name: "RF Coaxial Jumpers",
      desc: "Phase-stable, low-loss SMA, BNC, and N-Type high frequency jumpers built to drawing length.",
    },
  ]

  return (
    <div className="bg-[#f9f9fb] min-h-screen pb-16">
      {/* Hero Banner Section */}
      <section className="bg-gradient-to-r from-[#e2f9f8] to-[#d5f5f4] py-16 border-b border-[#eaeaea]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[12px] font-bold text-[#B20602] uppercase tracking-widest bg-white px-3 py-1.5 rounded-full border border-[#d1d5db]">
              IPC-WHMA-A-620 Spec Certified
            </span>
            <h1 className="font-heading text-4xl lg:text-5xl font-extrabold text-[#222222] tracking-tight mt-6 leading-tight">
              Spec Built Custom Harnesses & Assemblies
            </h1>
            <p className="text-[#555555] text-[16px] leading-relaxed mt-4">
              Engineered, built, and verified under strict quality checks. Provide your drawing or pinout requirement — we source, crimp, assemble, and 100% continuity-test prior to fast dispatch.
            </p>
            <div className="flex gap-4 mt-8 flex-wrap">
              <a
                href="#configurator"
                className="bg-[#B20602] hover:bg-[#900502] text-white px-6 py-3 rounded-[6px] text-[14px] font-bold transition-colors cursor-pointer"
              >
                Configure Custom Build
              </a>
              <a
                href="mailto:chandruravichandran1536@gmail.com"
                className="bg-white border border-[#d1d5db] hover:bg-gray-50 text-[#222222] px-6 py-3 rounded-[6px] text-[14px] font-bold transition-colors"
              >
                Submit Drawing Blueprint
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="/images/custom_harness_main_1785994250993.png"
              alt="Custom Ribbon & Wire Harness Assemblies"
              className="max-h-[350px] w-auto drop-shadow-xl animate-pulse"
              onError={(e) => {
                // Fallback placeholder image drawing if missing
                ;(e.target as HTMLImageElement).src =
                  "https://placehold.co/500x350/e2f9f8/ee2761?text=eFOCUS+Custom+Harness"
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Assembly Services Grid */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-[750px] mx-auto mb-12">
          <h2 className="font-heading text-3xl font-extrabold text-[#222222] tracking-tight">
            Our Assembly Capabilities
          </h2>
          <p className="text-[#777777] text-[15px] mt-2">
            Leverage single-vendor procurement to eliminate assembly errors and administrative overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {assemblyTypes.map((type) => (
            <div
              key={type.name}
              className="bg-white p-6 rounded-[10px] border border-[#eaeaea] shadow-sm hover:shadow-md transition-shadow flex gap-4"
            >
              <div className="w-12 h-12 bg-[#FFF0F0] text-[#B20602] rounded-full flex items-center justify-center shrink-0">
                <Settings size={22} />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#222222]">{type.name}</h3>
                <p className="text-[14px] text-[#555555] leading-relaxed mt-2">
                  {type.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Configurator Request Build */}
      <section id="configurator" className="max-w-[1380px] mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-[16px] border border-[#eaeaea] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Configurator inputs form */}
          <div className="lg:col-span-7 p-4 sm:p-8 lg:p-12 border-r border-[#eaeaea]">
            <h2 className="font-heading text-2xl font-extrabold text-[#222222] tracking-tight mb-2">
              Custom Build Configurator
            </h2>
            <p className="text-[13.6px] text-[#777777] mb-8">
              Configure initial specs below. We will match, brand for brand, and send a consolidated quotation.
            </p>

            <form onSubmit={handleConfiguratorSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Assembly Type */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#222222]">
                    Assembly Type
                  </label>
                  <select
                    value={assemblyType}
                    onChange={(e) => setAssemblyType(e.target.value)}
                    className="w-full bg-[#f4f5f8] border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#B20602]"
                  >
                    <option>Ribbon Cables</option>
                    <option>Wire Harnesses</option>
                    <option>Internal Chassis Wiring</option>
                    <option>RF Coaxial Jumpers</option>
                  </select>
                </div>

                {/* Insulation option */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#222222]">
                    Insulation Sheath
                  </label>
                  <select
                    value={insulation}
                    onChange={(e) => setInsulation(e.target.value)}
                    className="w-full bg-[#f4f5f8] border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#B20602]"
                  >
                    <option>Standard Flat Ribbon</option>
                    <option>High-Temp Silicone</option>
                    <option>Shielded Braided Sleeving</option>
                    <option>Teflon (PTFE) Extruded</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Cable Length */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#222222]">
                    Cable Length (m)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    required
                    className="w-full bg-[#f4f5f8] border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#B20602]"
                  />
                </div>

                {/* Batch Qty */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#222222]">
                    Batch Quantity (pcs)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    required
                    className="w-full bg-[#f4f5f8] border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#B20602]"
                  />
                </div>

                {/* Connector Pinout */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#222222]">
                    Connector Pinout
                  </label>
                  <select
                    value={pinout}
                    onChange={(e) => setPinout(e.target.value)}
                    className="w-full bg-[#f4f5f8] border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#B20602]"
                  >
                    <option>Straight-Through (1-to-1)</option>
                    <option>Reverse Pinout</option>
                    <option>Custom Crossover Scheme</option>
                    <option>Schematic Drawing (Mailed)</option>
                  </select>
                </div>
              </div>

              {/* Schematic notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#222222]">
                  Specific Drawing Details / Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. IDC socket pitch 2.54mm, heat-shrink red accent lines on both terminal ends, low-smoke zero-halogen jacket required..."
                  rows={4}
                  className="w-full bg-[#f4f5f8] border border-[#d1d5db] rounded-[6px] px-3 py-2 text-[14px] outline-none focus:border-[#B20602]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#B20602] hover:bg-[#900502] text-white py-3 rounded-[6px] text-[14px] font-bold transition-colors cursor-pointer mt-4 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                <span>Add Configuration to Quote Basket</span>
              </button>
            </form>
          </div>

          {/* Value Highlights */}
          <div className="lg:col-span-5 bg-[#fafbfd] p-4 sm:p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-[18px] font-bold text-[#222222] mb-6">
                eFOCUS Standards Guarantee
              </h3>
              <ul className="flex flex-col gap-4">
                <li className="flex gap-3 items-start">
                  <div className="text-[#B20602] mt-1 shrink-0">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <div>
                    <strong className="text-[14px] text-[#222222]">
                      100% Continuity & Continuity Checks
                    </strong>
                    <p className="text-[13px] text-[#777777] mt-0.5">
                      Continuity, Hipot, and Pinout schemes are verified on every single custom harness item.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="text-[#B20602] mt-1 shrink-0">
                    <ShieldCheck size={18} strokeWidth={3} />
                  </div>
                  <div>
                    <strong className="text-[14px] text-[#222222]">
                      IPC-WHMA-A-620 Standards
                    </strong>
                    <p className="text-[13px] text-[#777777] mt-0.5">
                      Assembled to IPC visual criteria standards to guarantee long-term field reliability.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="text-[#B20602] mt-1 shrink-0">
                    <Layers size={18} strokeWidth={3} />
                  </div>
                  <div>
                    <strong className="text-[14px] text-[#222222]">
                      Consolidated Procurement
                    </strong>
                    <p className="text-[13px] text-[#777777] mt-0.5">
                      Eliminate the split shipment nightmare. Sourced, crimped, and quote-merged into one invoice.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 bg-[#FFF0F0] p-4 rounded-[6px] border border-[#FEE8E8] text-center">
              <span className="text-[13px] text-[#B20602] font-semibold">
                Have drawing blueprints already?
              </span>
              <p className="text-[12px] text-[#555555] mt-1">
                Email them to <strong>chandruravichandran1536@gmail.com</strong> with your RFQ lists.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
