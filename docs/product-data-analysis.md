# product-data-analysis.md - eFOCUS Product Data Analysis

This document provides a detailed analysis of the eFOCUS product data hierarchy, brands, and dynamic specification configurations extracted from the eFOCUS Product Master PDF.

---

## 1. Catalog Hierarchy

The product master catalog conforms to a strictly nested 5-level hierarchy:

$$\text{Category} \longrightarrow \text{Subcategory} \longrightarrow \text{Product Family} \longrightarrow \text{Product / SKU} \longrightarrow \text{Specifications / Filters}$$

### Categories Mapping
The catalog features **8 core categories** with custom category numbers (`category_no`) and priority rankings:
1. **01: SMT, Rework & Assembly** (Priority: High)
2. **02: Cables & Connectivity** (Priority: High)
3. **03: Tools & MRO** (Priority: Medium)
4. **04: Power & Electrical** (Priority: Medium)
5. **05: ESD & RF** (Priority: High)
6. **06: Testing & Measurement** (Priority: High)
7. **07: IT Hardware & Workstation** (Priority: Low)
8. **08: Labelling & Identification** (Priority: Medium)

---

## 2. Category to Subcategory & Product Family Matrix

Here is the structural distribution of subcategories and product families derived from the product config sheet:

### 01 SMT, Rework & Assembly
- **Soldering Consumables**: Soldering Stations, Soldering Tips, Solder Wire, Desoldering, Tip Thermometer, Heating Elements
- **Rework Systems**: BGA Rework Stations
- **Test & Measurement (SMT)**: JTAG Tools, JTAG Adapters, Test Fixtures, Pogo Pins
- **Embedded Hardware & Components**: Single Board Computers

### 02 Cables & Connectivity
- **Industrial Networking**: SFP Modules, PoE Injectors, PoE Testers, Ethernet Switches, LAN Cables, USB Adapters
- **RF & Microwave**: RF Probes, RF Attenuators, Coaxial Cables, RF Connectors, GPS Equipment
- **Fiber & Optical**: Fiber Patch Cords, MPO Trunks
- **IT Cables & Accessories**: USB Cables, GPIB Interfaces, Serial Adapters, Display Cables

### 03 Tools & MRO
- **Hand & Power Tools**: Cable Ties, Ferrules, Heat Shrink Tubes, Industrial Tapes, Hand Tools, Crimping Tools, Wire Strippers, Torque Tools, Pneumatic Tools
- **Fixings & Consumables**: Industrial Tapes

### 04 Power & Electrical
- **Electrical & Power Components**: DC Power Supplies, SMPS, Relays, Circuit Breakers, Blowers & Fans, Reactors
- **Pneumatics & Fluid Control**: Solenoid Valves, Pneumatic Cylinders, Pneumatic Grippers, Pressure Regulators

### 05 ESD & RF
- **ESD Control**: Wrist Straps, Heel Grounders, ESD Gloves, Finger Cots, ESD Bags, ESD Coats, Insulating Mats
- **ESD Test & Measurement**: Surface Resistance, Resistance Systems, Field Meters, Antenna Couplers, RF Shield Boxes

### 06 Testing & Measurement
- **Electrical Test Instruments**: Digital Multimeters, Test Leads, Insulation Testers, LCR Meters, Signal Generators, Spectrum Analyzers, Power Analyzers, Scopemeters
- **Environmental Measurement**: Thermal Imagers, Particle Counters, Radiation Meters, Hygrometers
- **Mechanical & Force Measurement**: Vernier Calipers, Micrometers, Feeler Gauges, Pin Gauges, Strain Gauges, Pressure Gauges
- **Inspection, Accessories & General Tools**: Digital Microscopes, Inspection Cameras, Cable Locators, Data Loggers, Calibrators

### 07 IT Hardware & Workstation
- **IT Hardware**: Workstations, Monitors, Peripherals, Storage, USB Hubs, WiFi Adapters
- **Workstation Storage & Tooling**: PCB Racks, Solder Reel Racks, Storage Bins, Tool Boards, PCB Stands

### 08 Labelling & Identification
- **Labels & Tags**: Barcode Labels, QC Labels, FIFO Labels, Asset Tags, RFID Labels, Calibration Stickers, Thermal Ribbons
- **Hardware**: Industrial Label Printers, Desktop Label Printers, Barcode Scanners
- **Printing & Barcode Systems**: RFID Readers, MAC Address Blocks

---

## 3. Product & SKU Attributes

Each of the **164 product lines** contains the following database-mapped properties:
- `sku` (e.g., `QUICK-203H`, `WELLER-WT1010`): Unique string identifier
- `catalog_number` (e.g., `QUICK-203H-ESD`, `WELLER-FT910`): Catalog and model variations
- `product_name` (e.g., `Quick 203H Lead-Free Soldering Station 90W`)
- `brand` (e.g., `Quick`, `Weller`, `Fluke`, `Rigol`, `Chroma`, `Airtac`)
- `short_description` (HTML/text web summary)
- `key_spec_1`, `key_spec_2`, `key_spec_3` (Static key features: e.g. "Power: 90W", "Temp Range: 180–480°C", "Lead-Free: Yes")
- `image_status` ("Needed" / "Available")
- `rfq_eligible` (Boolean flag controlling checkout/pricing visibility)

---

## 4. Dynamic Specifications & Configurator Logic

Dynamic specifications allow users to filter down components on listing pages or select custom attributes on details pages:
- **Soldering Stations**: `Brand` (Quick, Weller, Hakko, Generic), `Power` (60W, 70W, 90W, 120W+), `Lead-Free Compatible` (Yes, No)
- **Coaxial Cables**: `Cable Type` (RG58, RG174, RG316, LMR-195, LMR-400), `Impedance` (50 Ohm, 75 Ohm), `Connector` (SMA, N-Type, BNC, TNC, Custom)
- **DC Power Supplies**: `Brand`, `Output Voltage` (Fixed 5V/12V/24V/48V, Programmable 0-30V/0-60V/0-100V+), `Output Current` (Up to 5A, 5-20A, 20-60A, 60A+)
- **ESD Bags**: `Type` (Static Shielding, Moisture Barrier, Static Dissipative), `Size` (2x3", 4x6", 6x8", 8x10", 10x12", Custom), `Closure` (Zip-lock, Heat-seal, Fold-top, Press-seal)

These attributes map to the backend's dynamic `product_filters`, `filter_options`, and `product_filter_values` tables.
