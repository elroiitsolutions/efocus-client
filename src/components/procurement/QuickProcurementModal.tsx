import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { NexChipIcon } from "@/components/ui/NexIcons";
import { 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Trash2, 
  Building2, 
  Mail
} from "lucide-react";

interface QuickProcurementModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "quote" | "bom";
}

export default function QuickProcurementModal({
  isOpen,
  onClose,
}: QuickProcurementModalProps) {
  // Form fields as requested
  const [partNumbers, setPartNumbers] = useState("");
  const [skus, setSkus] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Contact details for delivery
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const [ticketId] = useState(() => Math.floor(100000 + Math.random() * 900000));

  // Prevent background scroll when modal is open and coordinate with Lenis smooth scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (typeof window !== "undefined" && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile: File) => {
    const validExtensions = [".xlsx", ".xls", ".csv", ".pdf"];
    const fileName = uploadedFile.name.toLowerCase();
    const isValid = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      alert("Please upload a supported BOM file format: XLSX, CSV, or PDF.");
      return;
    }
    setFile(uploadedFile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setPartNumbers("");
    setSkus("");
    setDescription("");
    setQuantity("");
    setFile(null);
    setEmail("");
    setCompany("");
    setIsSubmitted(false);
  };

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div 
      data-lenis-prevent="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/60 backdrop-blur-md overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <div 
        data-lenis-prevent="true"
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Accent Gradient */}
        <div className="shrink-0 relative px-6 sm:px-8 pt-5 pb-4 bg-gradient-to-r from-gray-900 via-black to-[#22252a] text-white">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                Rapid Sourcing & RFQ
              </div>
              <h2 id="modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Quick Procurement Desk
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Submit part numbers, SKUs, or drag & drop your BOM
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 -mr-2 -mt-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Form */}
        <div 
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8"
          style={{ 
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 transparent",
            WebkitOverflowScrolling: "touch"
          }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {isSubmitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-gray-900">RFQ Received Successfully!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Our dedicated engineering & procurement desk is reviewing your requirements. A detailed line-item quotation will be emailed to <span className="font-semibold text-gray-900">{email || "your email"}</span>.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 max-w-md mx-auto text-left text-xs space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Reference Ticket:</span>
                  <span className="font-mono text-gray-900 font-semibold">EFQ-{ticketId}</span>
                </div>
                {partNumbers && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Parts/MPN:</span>
                    <span className="truncate max-w-[200px] text-gray-900">{partNumbers}</span>
                  </div>
                )}
                {file && (
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Attached BOM:</span>
                    <span className="text-emerald-700 font-medium truncate max-w-[200px]">{file.name}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Submit Another Part / BOM
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#111315] hover:bg-black text-white text-sm font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Part Numbers & SKUs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="partNumbers" className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                    Part Numbers <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="partNumbers"
                    type="text"
                    required={!file}
                    value={partNumbers}
                    onChange={(e) => setPartNumbers(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
                  />
                  <p className="text-[11px] text-gray-400">Manufacturer part numbers (MPNs)</p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="skus" className="block text-xs font-semibold text-gray-800 tracking-wider">
                    SKUs
                  </label>
                  <input
                    id="skus"
                    type="text"
                    value={skus}
                    onChange={(e) => setSkus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
                  />
                  <p className="text-[11px] text-gray-400">Internal or vendor catalog codes</p>
                </div>
              </div>

              {/* Row 2: Description */}
              <div className="space-y-1.5">
                <label htmlFor="description" className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none bg-gray-50/50"
                />
              </div>

              {/* Row 3: Quantity Needed */}
              <div className="space-y-1.5">
                <label htmlFor="quantity" className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                  Quantity Needed <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    required={!file}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Row 4: Upload: Drag & Drop BOM (XLSX, CSV, PDF) */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider flex items-center justify-between">
                  <span>Upload: Drag & Drop BOM <span className="text-gray-400 font-normal">(XLSX, CSV, PDF)</span></span>
                  {file && (
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-[11px] text-red-600 hover:text-red-700 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Remove file
                    </button>
                  )}
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!file ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-red-500 bg-red-50/50 scale-[0.99]"
                        : "border-gray-200 hover:border-gray-400 bg-gray-50/40 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-11 h-11 rounded-full bg-white shadow-xs border border-gray-200 flex items-center justify-center text-red-600">
                        <UploadCloud className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-gray-800">
                          <span className="text-red-600 hover:underline">Click to upload</span> or drag and drop BOM
                        </p>
                        <p className="text-xs text-gray-400">
                          Supports multi-line BOM in Microsoft Excel (.XLSX), CSV, or PDF (Max 25MB)
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 truncate max-w-xs">{file.name}</p>
                        <p className="text-xs text-emerald-700">
                          {(file.size / 1024).toFixed(1)} KB • Ready for automated parsing
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Attached
                    </span>
                  </div>
                )}
              </div>

              {/* Row 5: Contact Info for Receiving Quote */}
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                  Where should we send your quote?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Work Email *"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
                    />
                  </div>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company Name"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button: [ Get a Quote ] */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group nex-button-swap w-full py-2.5 px-6 rounded-full bg-[#111315] hover:bg-black text-white font-medium text-base transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <NexChipIcon />
                  <span>{isSubmitting ? "Processing RFQ Request..." : "Get a Quote"}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
