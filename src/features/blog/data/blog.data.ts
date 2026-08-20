export interface BlogPost {
  slug: string
  title: string
  tag: string
  date: string
  excerpt: string
  image: string
  content: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: "optimizing-smt-rework-line-efficiency",
    title: "Optimizing SMT Rework & Soldering Line Efficiency",
    tag: "SMT & Rework",
    date: "August 2026 • Technical Guide",
    excerpt:
      "How choosing the correct flux chemistry, tip profiles, and hot air reflow nozzles prevents thermal damage to sensitive BGA packages.",
    image: "/images/blog_1_1785994391892.png",
    content: `
      <h2>The Crucial Balance of Temperature and Time in SMT Rework</h2>
      <p>Surface Mount Technology (SMT) rework lines demand high precision. Thermal profiling is key. When reworking Ball Grid Array (BGA) components or fine-pitch QFPs, selecting the proper thermal cycle avoids PCB warping and internal component delamination.</p>
      
      <h3>1. Selection of Flux Chemistry</h3>
      <p>No-clean tack fluxes provide the required activity to dissolve surface oxides while leaving minimal non-conductive residues. For aerospace and medical equipment, lead-free water-soluble fluxes are preferred but require complete cleaning passes to prevent dendritic growth.</p>
      
      <h3>2. Tip Profiles and Heat Transfer</h3>
      <p>Chisel tips provide twice the thermal mass area of conical tips. Always match the tip width to the lead size. Overly small tips lead the operator to increase the station temperature, causing localized heat spikes and tip oxidation.</p>
      
      <h3>3. Preheating Strategies</h3>
      <p>Reworking multilayer PCBs without bottom preheaters creates massive thermal gradients. Preheating the board to 100°C–120°C allows localized soldering tips or hot air nozzles to flow solder quickly without overheating the target pad.</p>
    `,
  },
  {
    slug: "selecting-precision-rf-coaxial-assemblies",
    title: "Selecting Precision RF Coaxial Assemblies for Bench Test Rigs",
    tag: "RF & Microwave",
    date: "July 2026 • Test & Measurement",
    excerpt:
      "Understanding phase stability, return loss, and VSWR specifications when specifying lab coaxial jumpers for high frequency RF testing.",
    image: "/images/blog_rf_1785994462069.png",
    content: `
      <h2>Demystifying RF Test Cables: More Than Just Wires</h2>
      <p>Bench test setups require reliable connections. At gigahertz frequencies, test cables behave as complex transmission lines. A poor choice of coaxial jumper can lead to phase errors, excessive attenuation, and false failures during device verification.</p>
      
      <h3>1. Impedance Matching and VSWR</h3>
      <p>Ensure your test cables maintain exactly 50 Ohms (or 75 Ohms for video applications). Impedance mismatches lead to signal reflections, defined by the Voltage Standing Wave Ratio (VSWR). A VSWR of 1.15:1 or better is desirable for critical testing.</p>
      
      <h3>2. Shielding and Phase Stability</h3>
      <p>Double-braided shields or foil wrap shields prevent electromagnetic interference (EMI) leakage. Phase stability under flexure is critical—when the cable moves, the phase shift must remain minimal, especially for Vector Network Analyzer (VNA) calibrations.</p>
      
      <h3>3. Connector Quality</h3>
      <p>Gold-plated SMA, stainless-steel N-Type, and quick-connect BNC connectors must be tightened to correct torque ratings. Over-tightening damages the mating interface, while loose connections lead to unstable readings.</p>
    `,
  },
  {
    slug: "single-vendor-procurement-streamlining",
    title: "Single-Vendor Procurement: Streamlining Component Line Supply",
    tag: "Procurement",
    date: "July 2026 • Supply Chain",
    excerpt:
      "Consolidating 47+ interconnect and tool line items under one accountable partner to eliminate production downtime and administrative overhead.",
    image: "/images/blog_procurement_1785994481144.png",
    content: `
      <h2>The Operational Cost of Split Procurement Orders</h2>
      <p>Procuring industrial components from dozens of split vendors creates massive operational waste. Between multiple PO generation runs, incoming inspection overheads, and coordinate tracking of delayed items, the hidden administrative costs often exceed the catalog value of the items.</p>
      
      <h3>1. Reduced Administrative Cost</h3>
      <p>Processing a single consolidated purchase order cuts invoice reconciliation times in half. Consolidating 47 stocked lines under one vendor simplifies accounting audits.</p>
      
      <h3>2. Complete Traceability and Quality Accountability</h3>
      <p>With a single accountable partner, tracking quality certificates, IPC compliance records, and RoHS certifications is simplified. One vendor takes full ownership of batch traceability.</p>
      
      <h3>3. Shipping Consolidation and Zero Downtime</h3>
      <p>Split orders risk single line items holding up entire production schedules. Consolidating shipments ensures all tools, test leads, and custom cables arrive together, ready for the assembly line.</p>
    `,
  },
]
