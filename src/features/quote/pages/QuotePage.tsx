import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuoteStore } from "../store/quote.store";
import { 
  Trash2, 
  Plus, 
  Minus, 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Layers, 
  ArrowRight, 
  X,
  FileSpreadsheet,
  BadgeCheck
} from "lucide-react";
import { NexChipIcon } from "@/components/ui/NexIcons";
import SuccessModal from "@/components/ui/SuccessModal";
import { FormSubmissionService } from "@/services/formSubmission.service";

// Industry Slug to Label Mapping
const INDUSTRY_MAP: Record<string, { title: string; category: string; desc: string }> = {
  "electronics-ems": {
    title: "Electronics & EMS Production",
    category: "Electronics Manufacturing & EMS",
    desc: "PCB assembly, SMT consumables, test instrumentation, ESD safeguards, and factory automation outfitting.",
  },
  "automotive-ev": {
    title: "Automotive & EV Solutions",
    category: "Automotive & Electric Vehicles",
    desc: "BMS testing, power electronics, dynamometer accessories, high-voltage test tools, and ECU validation.",
  },
  "aerospace-defence": {
    title: "Aerospace & Defence Engineering",
    category: "Aerospace & Defence",
    desc: "RF signal analysis, avionics test interfaces, MIL-spec interconnects, and calibration standards.",
  },
  "semiconductor": {
    title: "Semiconductor Test & Measurement",
    category: "Semiconductor & Microelectronics",
    desc: "Wafer probing accessories, parametric analyzers, SMUs, cleanroom ESD, and device evaluation benches.",
  },
  "telecom-rf": {
    title: "Telecom & RF Test Solutions",
    category: "Telecom & Wireless RF",
    desc: "5G base station test, microwave cables, vector network analyzers, attenuators, and coaxial components.",
  },
  "power-energy": {
    title: "Power & Energy Systems",
    category: "Power Conversion & Energy Storage",
    desc: "Grid monitoring, solar inverter test benches, high-power DC electronic loads, and battery cyclers.",
  },
  "industrial-automation": {
    title: "Industrial Automation & Control",
    category: "Plant Automation & Operations",
    desc: "PLCs, HMIs, variable frequency drives, control panels, industrial sensors, and field switchgear.",
  },
  "pharma-medical": {
    title: "Pharma & Medical Device Manufacturing",
    category: "Pharma & Medical Devices",
    desc: "Cleanroom static control, optical inspection, calibrated assembly tools, and ISO 13485 compliant gear.",
  },
  "bom": {
    title: "Enterprise BOM Procurement",
    category: "Bill of Materials Sourcing",
    desc: "Single-quote line-item matching, lifecycle scrubbing (EOL/NRND), and consolidated GST delivery.",
  },
  "vendor": {
    title: "Vendor Consolidation",
    category: "Vendor Consolidation Service",
    desc: "Aggregate 50+ component suppliers into 1 verified vendor profile with consolidated billing.",
  },
  "rate-contract": {
    title: "Annual Rate Contracts (ARC)",
    category: "Rate Contract Program",
    desc: "Locked 12-month unit pricing, buffer inventory allocation, and scheduled batch releases.",
  },
  "project": {
    title: "Project-Based Procurement",
    category: "Turnkey Project Procurement",
    desc: "Milestone-based procurement, technical specification alignment, and staging for capital setups.",
  },
  "turnkey": {
    title: "Turnkey Workstations & Labs",
    category: "Workstations & Infrastructure",
    desc: "Modular ESD-safe benches, overhead power raceways, instrument shelves, and laminar flow hoods.",
  },
};

export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const industryParam = searchParams.get("industry") || searchParams.get("solution") || "";
  const industryMeta = industryParam ? INDUSTRY_MAP[industryParam] : null;

  const items = useQuoteStore((state) => state.items);
  const updateQty = useQuoteStore((state) => state.updateQty);
  const removeItem = useQuoteStore((state) => state.removeItem);
  const clearQuote = useQuoteStore((state) => state.clearQuote);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    deliveryTimeline: "Immediate (1-2 Weeks)",
    requirementType: industryMeta?.category || "Industrial Hardware & Components",
    partNumbers: "",
    skus: "",
    quantity: "",
    message: "",
  });

  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [referenceNo, setReferenceNo] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update requirement type if industry parameter changes
  useEffect(() => {
    if (industryMeta) {
      setFormData((prev) => ({
        ...prev,
        requirementType: industryMeta.category,
      }));
    }
  }, [industryMeta]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format items from basket if present
      let itemsFormatted = "";
      if (items.length > 0) {
        itemsFormatted = items
          .map(
            (item, idx) =>
              `${idx + 1}. [${item.name}] - Part/SKU: ${item.code || item.id} | Category: ${item.category} | Qty: ${item.qty}`
          )
          .join("\n\n");
      }

      const formTitle = industryMeta
        ? `${industryMeta.title} Sourcing Request`
        : items.length > 0
        ? `Consolidated Quote Request (${items.length} items)`
        : "Industrial Sourcing RFQ";

      const subject = industryMeta
        ? `Sourcing Enquiry: ${industryMeta.title} - ${formData.company || formData.name}`
        : items.length > 0
        ? `Quote Request (${items.length} items) - ${formData.company || formData.name}`
        : `RFQ - ${formData.requirementType} - ${formData.company || formData.name}`;

      const res = await FormSubmissionService.submitForm({
        form_name: formTitle,
        form_type: "quote_request",
        category_group: industryParam ? "industry" : "quote",
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        company_name: formData.company.trim(),
        requirement_type: formData.requirementType,
        delivery_timeline: formData.deliveryTimeline,
        part_numbers: formData.partNumbers.trim() || undefined,
        skus: formData.skus.trim() || undefined,
        quantity: formData.quantity.trim() || undefined,
        message: formData.message.trim() || undefined,
        subject,
        file: attachedFile,
        quote_items: items.length > 0 ? items : undefined,
        requested_products: itemsFormatted || undefined,
      });

      setReferenceNo(res.reference_no || `EFQ-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccessOpen(true);
      if (items.length > 0) {
        clearQuote();
      }
    } catch (err: any) {
      console.error("Quote submission error:", err);
      alert(err.message || "Failed to submit quote request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      deliveryTimeline: "Immediate (1-2 Weeks)",
      requirementType: industryMeta?.category || "Industrial Hardware & Components",
      partNumbers: "",
      skus: "",
      quantity: "",
      message: "",
    });
    setAttachedFile(null);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#fbfcfd] py-10 sm:py-16 text-left selection:bg-red-500 selection:text-white">
        <div className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-6 animate-in fade-in duration-300">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            {industryMeta ? (
              <>
                <Link to="/industries" className="hover:text-black transition-colors">Industries</Link>
                <span>/</span>
                <span className="text-red-600 font-semibold">{industryMeta.title}</span>
              </>
            ) : (
              <span className="text-red-600 font-semibold">Consolidated Sourcing Desk</span>
            )}
          </div>

          {/* Page Header */}
          <div className="border-b border-gray-200 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-4xl">
              {industryMeta && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-semibold tracking-wide uppercase mb-3 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span>{industryMeta.title} Dedicated Desk</span>
                </div>
              )}
              
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0d0f11] tracking-tight leading-tight">
                {industryMeta ? (
                  <>
                    {industryMeta.title}{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                      Sourcing Desk
                    </span>
                  </>
                ) : (
                  <>
                    Consolidated Industrial{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AF0202] via-[#c8102e] to-black">
                      Quote & RFQ Desk
                    </span>
                  </>
                )}
              </h1>
              
              <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
                {industryMeta?.desc || (
                  "Submit your multi-line RFQ, Bill of Materials, or part numbers below. Our engineering team matches specs, verifies authorized channels, and returns a unified GST-compliant quote in 24–48 hours."
                )}
              </p>
            </div>

            {/* Quick Stats / SLA Pill */}
            <div className="hidden lg:flex items-center gap-6 p-4 rounded-2xl bg-white border border-gray-200 shadow-2xs shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quote SLA</div>
                  <div className="text-sm font-bold text-gray-900">24–48 Hours</div>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Traceability</div>
                  <div className="text-sm font-bold text-gray-900">100% Authorized</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main 2-Column Responsive Sourcing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* =========================================================================
                LEFT COLUMN (7 COLS): SCOPE / LINE ITEMS / BOM UPLOAD
                ========================================================================= */}
            <div className="lg:col-span-7 flex flex-col gap-6">

              {/* SECTION A: BASKET ITEMS (IF USER ADDED ANY PRODUCTS) */}
              {items.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                        <Layers className="w-4 h-4" />
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">
                        Selected Products from Catalog ({items.length})
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={clearQuote}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-gray-100 text-gray-700 uppercase tracking-wide mb-1">
                            {item.code || item.id}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <span className="text-xs text-gray-500">{item.category}</span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, -1)}
                              className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition-colors cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3.5 text-xs font-bold text-gray-900">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, 1)}
                              className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition-colors cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-600 p-1.5 transition-colors cursor-pointer rounded-lg hover:bg-red-50"
                            title="Remove Line Item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>Need to add more products from catalog?</span>
                    <Link
                      to="/products"
                      className="text-red-600 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Browse Catalog</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}

              {/* SECTION B: TECHNICAL SPECIFICATIONS & PART NUMBER INTAKE */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      Technical Sourcing Specifications
                    </h2>
                    <p className="text-xs text-gray-500">
                      Specify exact MPNs, equipment types, quantities, or drop-in alternate preferences.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Part Numbers / MPNs */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Target Part Numbers / MPNs (Optional)
                    </label>
                    <textarea
                      name="partNumbers"
                      value={formData.partNumbers}
                      onChange={handleChange}
                      placeholder="e.g. TPS54302DDCR, STM32F407VGT6, MAX3232ESE+, BNC-RG58-1M..."
                      rows={2}
                      className="w-full bg-[#fbfcfd] border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all font-mono"
                    />
                    <span className="text-[11px] text-gray-500 mt-1 block">
                      Separate multiple part numbers with commas or newlines.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* SKUs / Equipment Scope */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                        Equipment / Subsystem Scope
                      </label>
                      <input
                        type="text"
                        name="skus"
                        value={formData.skus}
                        onChange={handleChange}
                        placeholder="e.g. SMT Soldering, DSO Oscilloscopes"
                        className="w-full bg-[#fbfcfd] border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
                      />
                    </div>

                    {/* Target Quantities / Batch Volume */}
                    <div>
                      <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                        Target Volume / Quantities
                      </label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="e.g. 500 pcs, 5 benches, pilot lot"
                        className="w-full bg-[#fbfcfd] border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION C: DRAG & DROP BOM FILE ATTACHMENT */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                      Attach BOM / Technical Drawing (XLSX, CSV, PDF)
                    </label>
                    <span className="text-[11px] text-gray-400">Max 25MB</span>
                  </div>

                  {attachedFile ? (
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-red-50/60 border border-red-200">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-white border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                          <FileSpreadsheet className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-gray-900 truncate">
                            {attachedFile.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {(attachedFile.size / 1024).toFixed(1)} KB • Ready for automated scrubbing
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAttachedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleFileDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                        isDragging
                          ? "border-red-500 bg-red-50/50 scale-[1.01]"
                          : "border-gray-300 hover:border-red-400 bg-[#fbfcfd] hover:bg-red-50/20"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".xlsx,.xls,.csv,.pdf,.zip"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-red-600 mx-auto mb-3 shadow-2xs">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-gray-800 mb-1">
                        Drag and drop your BOM spreadsheet here, or <span className="text-red-600 underline">browse</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Supports Altium, KiCad, Excel (.xlsx), CSV, and PDF procurement exports.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* INDUSTRIAL TRUST GUARANTEES RIBBON */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#fafbfd] border border-gray-200/80">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">100% Authorized OEM</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">Strict Mutual NDA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">Single GST Invoice</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">24–48h Turnaround</span>
                </div>
              </div>

            </div>


            {/* =========================================================================
                RIGHT COLUMN (5 COLS): CORPORATE INTAKE & DISPATCH FORM
                ========================================================================= */}
            <div className="lg:col-span-5 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-md sticky top-28">
              
              <div className="pb-4 border-b border-gray-100 mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                    Submit Sourcing RFQ
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Consolidated commercial quote delivered directly to your inbox.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-[#111315] text-white flex items-center justify-center">
                  <NexChipIcon className="w-6 h-6 text-red-500" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Contact Person Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Vikram Sharma"
                    required
                    className="w-full bg-[#fbfcfd] border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
                  />
                </div>

                {/* Business Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Business Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vikram@company.com"
                      required
                      className="w-full bg-[#fbfcfd] border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full bg-[#fbfcfd] border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Company / Organization <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Bharat Electronics Ltd."
                    required
                    className="w-full bg-[#fbfcfd] border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
                  />
                </div>

                {/* Sourcing Category & Delivery Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Sourcing Domain
                    </label>
                    <select
                      name="requirementType"
                      value={formData.requirementType}
                      onChange={handleChange}
                      className="w-full bg-[#fbfcfd] border border-gray-300 rounded-xl px-3 py-3 text-sm text-gray-900 outline-none focus:border-red-600 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Electronics Manufacturing & EMS">Electronics & EMS</option>
                      <option value="Automotive & Electric Vehicles">Automotive & EV</option>
                      <option value="Aerospace & Defence">Aerospace & Defence</option>
                      <option value="Semiconductor & Microelectronics">Semiconductor</option>
                      <option value="Telecom & Wireless RF">Telecom & RF</option>
                      <option value="Power Conversion & Energy Storage">Power & Energy</option>
                      <option value="Plant Automation & Operations">Industrial Automation</option>
                      <option value="Pharma & Medical Devices">Pharma & Medical</option>
                      <option value="Bill of Materials Sourcing">BOM Sourcing / Scrubbing</option>
                      <option value="Turnkey Workstations & Infrastructure">Turnkey Workstations</option>
                      <option value="General Industrial Sourcing">General / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                      Required Timeline
                    </label>
                    <select
                      name="deliveryTimeline"
                      value={formData.deliveryTimeline}
                      onChange={handleChange}
                      className="w-full bg-[#fbfcfd] border border-gray-300 rounded-xl px-3 py-3 text-sm text-gray-900 outline-none focus:border-red-600 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="Urgent / Line-Down (< 48 hrs)">Urgent (&lt; 48 hrs)</option>
                      <option value="Immediate (1-2 Weeks)">Immediate (1-2 Weeks)</option>
                      <option value="Standard (2-4 Weeks)">Standard (2-4 Weeks)</option>
                      <option value="Annual Rate Contract / Buffer Stock">Annual Rate Contract</option>
                      <option value="Project Staged Delivery">Project Staged Delivery</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                    Special Instructions / Notes
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Specify drop-in alternate approvals, brand preferences (e.g. Keysight, Fluke, Hakko, Weller), target price, or batch schedule..."
                    rows={3}
                    className="w-full bg-[#fbfcfd] border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-red-600 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group nex-button-swap inline-flex items-center justify-center rounded-2xl bg-[#AF0202] hover:bg-[#8e0202] text-white py-4 font-bold text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                >
                  <NexChipIcon className="w-8 h-8" />
                  <span>{isSubmitting ? "Submitting Request..." : "Request Landed GST Quotation"}</span>
                </button>

                <p className="text-center text-[11px] text-gray-500 pt-1">
                  🔒 Strictly Confidential. Your BOM and details are protected under corporate NDA.
                </p>

              </form>

            </div>

          </div>

        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={handleSuccessClose}
        title="Sourcing Request Dispatched!"
        message={`Your technical sourcing enquiry has been received (Ref: ${referenceNo}). Our engineering procurement team is reviewing line-item specs and will dispatch a landed INR quotation to ${formData.email} within 24–48 hours.`}
        submitterEmail={formData.email}
      />
    </>
  );
}
