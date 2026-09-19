export interface ProductLike {
  sku?: string | null
  catalog_number?: string | null
  product_name?: string | null
  category_name?: string | null
  subcategory_name?: string | null
  brand?: string | null
  family_name?: string | null
}

// The authentic, existing high-resolution product images of the website:
export const EXISTING_IMAGES = {
  cables: "/images/cat_cables_1785994179162.png",
  test: "/test/test.png",
  rf: "/images/cat_rf_1785994214462.png",
  tools: "/images/cat_tools_1785994233090.png",
  net: "/images/bento_net_1785994371883.png",
  smt: "/images/bento_smt_1785994353600.png",
  custom: "/images/custom_harness_main_1785994250993.png",
  power: "/images/hero_industrial_cables_1785994163114.png",
}

// Curated palette of 14 distinct high-resolution product images for carousels
export const CAROUSEL_PALETTE = [
  "/images/cat_cables_1785994179162.png",         // 0: Cables & Connectivity
  "/test/test.png",                               // 1: Multimeter & Test Leads
  "/images/cat_rf_1785994214462.png",             // 2: RF & Microwave
  "/images/cat_tools_1785994233090.png",          // 3: Tools & MRO
  "/images/bento_net_1785994371883.png",          // 4: Networking & IT
  "/images/bento_smt_1785994353600.png",          // 5: SMT & Assembly
  "/images/custom_harness_main_1785994250993.png", // 6: Custom Harnesses
  "/images/hero_industrial_cables_1785994163114.png", // 7: Power & Electrical
  "/images/card_1_red_meter.png",                  // 8: Compact Red Multimeter
  "/images/card_2_yellow_meter.png",               // 9: Industrial Yellow Meter
  "/images/card_5_board.png",                      // 10: Embedded PCB & RFID Hardware
  "/images/card_8_tools.png",                      // 11: Barcode Scanners & Hand Tools
  "/images/card_10_red_parts.png",                 // 12: Printers & Labelling Parts
  "/images/card_3_blue_strap.png",                 // 13: ESD Protection & Wrist Straps
]

/**
 * Returns the primary product image from the existing website catalog images.
 */
export function getProductPrimaryImage(product?: ProductLike | null): string {
  if (!product) return EXISTING_IMAGES.cables

  const sku = (product.sku || "").toUpperCase()
  const name = (product.product_name || "").toLowerCase()
  const cat = (product.category_name || "").toLowerCase()
  const fam = (product.family_name || "").toLowerCase()

  // 1. Cables & Connectivity / Automation
  if (
    sku.includes("ICA") ||
    cat.includes("cable") ||
    cat.includes("connect") ||
    fam.includes("cable") ||
    name.includes("cabling") ||
    name.includes("jumpers")
  ) {
    if (sku.includes("PWR") || cat.includes("power") || name.includes("power")) {
      return EXISTING_IMAGES.power
    }
    return EXISTING_IMAGES.cables
  }

  // 2. Testing & Measurement
  if (
    sku.includes("TST") ||
    cat.includes("test") ||
    cat.includes("measur") ||
    fam.includes("meter") ||
    name.includes("leads") ||
    name.includes("probe") ||
    name.includes("calibrat") ||
    name.includes("multimeter")
  ) {
    return EXISTING_IMAGES.test
  }

  // 3. Labelling & Identification (distinct images for scanners, printers, RFID, ribbons)
  if (cat.includes("label") || cat.includes("ident") || sku.includes("MAC")) {
    if (name.includes("mac address") || sku.includes("MAC")) {
      return EXISTING_IMAGES.test
    }
    if (name.includes("scanner") || name.includes("verifier") || fam.includes("scanner") || sku.includes("SCAN") || sku.includes("HONEYWELL")) {
      return "/images/card_8_tools.png"
    }
    if (name.includes("printer") || fam.includes("printer") || sku.includes("PRNT") || sku.includes("ZEBRA")) {
      return "/images/card_10_red_parts.png"
    }
    if (name.includes("rfid") || fam.includes("rfid") || sku.includes("RFID")) {
      return "/images/card_5_board.png"
    }
    if (name.includes("ribbon") || name.includes("sticker") || name.includes("tag") || name.includes("fifo")) {
      return "/images/card_3_blue_strap.png"
    }
    return "/images/card_10_red_parts.png"
  }

  // 4. IT Hardware & Workstations
  if (cat.includes("workstation") || cat.includes("hardware") || name.includes("pcb stand")) {
    return "/images/card_5_board.png"
  }

  // 5. RF & Microwave
  if (
    sku.includes("RF") ||
    cat.includes("rf") ||
    cat.includes("wave") ||
    fam.includes("antenna") ||
    name.includes("coaxial") ||
    name.includes("antenna") ||
    name.includes("coupler")
  ) {
    return EXISTING_IMAGES.rf
  }

  // 6. Tools & MRO
  if (
    sku.includes("MRO") ||
    cat.includes("tool") ||
    cat.includes("mro") ||
    name.includes("crimping") ||
    name.includes("pliers") ||
    name.includes("tape")
  ) {
    return EXISTING_IMAGES.tools
  }

  // 7. SMT & Assembly / Soldering / Rework
  if (
    sku.includes("SMT") ||
    cat.includes("smt") ||
    cat.includes("rework") ||
    cat.includes("assembly") ||
    name.includes("soldering") ||
    name.includes("flux")
  ) {
    return EXISTING_IMAGES.smt
  }

  // 8. Networking & Industrial IT / Ethernet / Fiber
  if (
    sku.includes("NET") ||
    cat.includes("net") ||
    name.includes("ethernet") ||
    name.includes("fiber") ||
    name.includes("switch")
  ) {
    return EXISTING_IMAGES.net
  }

  // 9. Power & Electrical
  if (
    sku.includes("PWR") ||
    cat.includes("power") ||
    cat.includes("electr") ||
    name.includes("power cord") ||
    name.includes("regulator")
  ) {
    return EXISTING_IMAGES.power
  }

  // 10. Custom & Wire Harnesses / ESD
  if (
    sku.includes("CST") ||
    sku.includes("ESD") ||
    cat.includes("harness") ||
    cat.includes("esd") ||
    name.includes("harness") ||
    name.includes("wrist strap")
  ) {
    return EXISTING_IMAGES.custom
  }

  return EXISTING_IMAGES.cables
}

/**
 * Ensures each card in a carousel receives a distinct, visually varied image.
 */
export function getCarouselProductImage(product?: ProductLike | null, slotIndex?: number): string {
  if (slotIndex !== undefined) {
    const paletteIndex = slotIndex % CAROUSEL_PALETTE.length
    return CAROUSEL_PALETTE[paletteIndex]
  }
  return getProductPrimaryImage(product)
}

/**
 * Returns the secondary hover image for product cards from existing assets.
 */
export function getProductHoverImage(product?: ProductLike | null): string {
  if (!product) return EXISTING_IMAGES.net

  const sku = (product.sku || "").toUpperCase()
  const cat = (product.category_name || "").toLowerCase()
  const name = (product.product_name || "").toLowerCase()

  if (cat.includes("cable") || cat.includes("connect")) {
    return EXISTING_IMAGES.net
  }
  if (cat.includes("test") || cat.includes("measur") || sku.includes("TST") || name.includes("lead")) {
    return EXISTING_IMAGES.custom
  }
  if (cat.includes("rf") || cat.includes("wave") || sku.includes("RF")) {
    return EXISTING_IMAGES.power
  }
  if (cat.includes("tool") || cat.includes("mro") || sku.includes("MRO")) {
    return EXISTING_IMAGES.smt
  }
  if (cat.includes("smt") || cat.includes("rework") || sku.includes("SMT")) {
    return EXISTING_IMAGES.tools
  }
  if (cat.includes("power") || sku.includes("PWR")) {
    return EXISTING_IMAGES.cables
  }
  if (cat.includes("label") || cat.includes("ident") || sku.includes("MAC")) {
    return EXISTING_IMAGES.tools
  }

  return EXISTING_IMAGES.net
}

/**
 * Returns 4 existing high-resolution catalog images for the product details showcase.
 */
export function getProductThumbnails(product?: ProductLike | null): string[] {
  const primary = getProductPrimaryImage(product)
  const cat = (product?.category_name || "").toLowerCase()
  const sku = (product?.sku || "").toUpperCase()

  if (cat.includes("test") || cat.includes("measur") || cat.includes("label") || sku.includes("TST") || sku.includes("MAC")) {
    return [
      EXISTING_IMAGES.test,
      EXISTING_IMAGES.custom,
      EXISTING_IMAGES.cables,
      EXISTING_IMAGES.rf,
    ]
  }

  if (cat.includes("cable") || cat.includes("connect") || sku.includes("ICA")) {
    return [
      EXISTING_IMAGES.cables,
      EXISTING_IMAGES.net,
      EXISTING_IMAGES.custom,
      EXISTING_IMAGES.power,
    ]
  }

  if (cat.includes("rf") || cat.includes("wave") || sku.includes("RF")) {
    return [
      EXISTING_IMAGES.rf,
      EXISTING_IMAGES.power,
      EXISTING_IMAGES.cables,
      EXISTING_IMAGES.net,
    ]
  }

  if (cat.includes("tool") || cat.includes("mro") || sku.includes("MRO")) {
    return [
      EXISTING_IMAGES.tools,
      EXISTING_IMAGES.smt,
      EXISTING_IMAGES.custom,
      EXISTING_IMAGES.test,
    ]
  }

  if (cat.includes("smt") || cat.includes("rework") || sku.includes("SMT")) {
    return [
      EXISTING_IMAGES.smt,
      EXISTING_IMAGES.tools,
      EXISTING_IMAGES.test,
      EXISTING_IMAGES.cables,
    ]
  }

  if (cat.includes("net") || sku.includes("NET")) {
    return [
      EXISTING_IMAGES.net,
      EXISTING_IMAGES.cables,
      EXISTING_IMAGES.power,
      EXISTING_IMAGES.rf,
    ]
  }

  if (cat.includes("power") || sku.includes("PWR")) {
    return [
      EXISTING_IMAGES.power,
      EXISTING_IMAGES.cables,
      EXISTING_IMAGES.custom,
      EXISTING_IMAGES.net,
    ]
  }

  return [
    primary,
    EXISTING_IMAGES.cables,
    EXISTING_IMAGES.test,
    EXISTING_IMAGES.tools,
  ]
}
