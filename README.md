# ⚡ Smart Invoice Forge

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-E10098?logo=framer)](https://www.framer.com/motion/)

**Smart Invoice Forge** is an ultra next-gen, privacy-first, hyper-responsive SaaS web application designed to create, customize, and export GST-compliant tax invoices, retail receipts, freelance bills, medical statements, and proforma quotations in seconds.

Built with hardware-accelerated 60fps Framer Motion spring physics, glassmorphism design tokens, intelligent auto-calculating tax algorithms, and instant vector PDF / PNG / JPG export engines.

---

## 🌟 Key Highlights & AI-Driven Capabilities

### 🧠 Intelligent Tax & Discount Math Engine
- **Accounting Standard Compliance**: Enforces standard GST/Tax formulas:
  $$\text{Item Subtotal} = \text{Quantity} \times \text{Rate}$$
  $$\text{Discount Amount} = \begin{cases} \text{Item Subtotal} \times \left(\frac{\text{Discount \%}}{100}\right) & \text{if Percentage} \\ \text{Fixed Discount} & \text{if Fixed} \end{cases}$$
  $$\text{Taxable Amount} = \text{Item Subtotal} - \text{Discount Amount}$$
  $$\text{Tax Amount} = \text{Taxable Amount} \times \left(\frac{\text{Tax \%}}{100}\right)$$
  $$\text{Grand Total} = \text{Taxable Amount} + \text{Tax Amount}$$

### 📱 8 Specialized Invoice Formats
1. **Retail Invoice**: Store POS sales, physical goods, itemized quantities & quick totals.
2. **GST Tax Invoice**: CGST/SGST/IGST breakdown, GSTIN validator, and tax rate presets (0%, 5%, 12%, 18%, 28%).
3. **Freelance Invoice**: Hourly rate billing, contractor details, digital service line items.
4. **Medical Bill**: Patient ID, hospital/clinic header, pharmacy & treatment billing.
5. **Hotel Bill**: Room stay check-in/check-out dates, accommodation breakdown, room numbers.
6. **Proforma Invoice**: Preliminary price estimates, quotations, and pre-payment terms.
7. **Service Invoice**: Agency retainers, consulting fees, B2B project milestones.
8. **Custom Format**: Blank canvas customizable billing layout.

### 💳 Live Payment QR Code Generator
- Generates scannable **UPI / GPay / PhonePe / Paytm / PayPal** QR codes (`https://api.qrserver.com/v1/create-qr-code/`) rendered directly onto PDF & PNG invoices for instant mobile payments.

### 🎨 Custom Accent Theme Color Palettes
- Personalize exported invoice PDF accent styling:
  - 🟦 **Classic Blue** (`#2563EB`)
  - 🟩 **Emerald Green** (`#059669`)
  - 🟪 **Royal Purple** (`#7C3AED`)
  - 🟥 **Crimson Red** (`#E11D48`)
  - ⬛ **Slate Dark** (`#1E293B`)

### ⚡ Smart Productivity Controls
- **✨ 1-Click Sample Data Autofill**: Instantly loads complete demo data (*Acme Corp, itemized rates, GST 18%, bank details*) for quick testing.
- **📂 Saved Invoice History Manager**: Auto-saves created invoices to LocalStorage history. View, load, or delete past invoices anytime.
- **📊 CSV / Bulk Line Item Import**: Paste or upload raw CSV strings (`Item Name, Qty, Rate, Tax%, Discount%`) to populate items in seconds.
- **🏷️ Status Stamps & Watermarks**: Toggle stamps (*ORIGINAL, PAID, PENDING*) directly on the preview.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18.3 + TypeScript 5.5 | Type-safe, component-driven reactive UI |
| **Build Tooling** | Vite 5.4 + SWC Plugin | Sub-second HMR & 5s production bundling |
| **Styling & System** | Tailwind CSS 3.4 + Glassmorphism | Custom HSL variables, responsive utilities |
| **Motion Physics** | Framer Motion 12.4 | Hardware-accelerated 60fps spring transitions |
| **PDF & Image Export** | `html2canvas` + `jsPDF` | High-DPI canvas DOM rasterization & PDF synthesis |
| **Icons & Typography** | Lucide React + Plus Jakarta Sans | Modern UI glyphs and typography |

---

## 📁 Repository Structure

```
simple-invoice-forge/
├── public/
│   ├── favicon.svg           # Custom Smart Invoice document SVG favicon
│   └── robots.txt            # Search engine crawling rules
├── src/
│   ├── components/
│   │   ├── AdSense.tsx            # Non-intrusive ad unit loader
│   │   ├── CsvImportModal.tsx     # CSV bulk line item importer
│   │   ├── ExportOptions.tsx      # PDF, PNG & JPG export controls
│   │   ├── FeedbackModal.tsx      # User rating & review modal
│   │   ├── Footer.tsx             # Glassmorphic footer & social links
│   │   ├── Header.tsx             # Navbar, mobile drawer & dark mode
│   │   ├── HeroDemoCard.tsx       # Hero interactive live mockup
│   │   ├── InvoiceForm.tsx        # Dynamic multi-format invoice editor
│   │   ├── InvoicePreview.tsx     # Vector print & export renderer
│   │   ├── InvoiceProgress.tsx    # Live form readiness progress bar
│   │   ├── InvoiceTypeSelector.tsx# 3D glowing format selection cards
│   │   ├── SavedInvoicesModal.tsx # LocalStorage history drawer
│   │   ├── StickySummaryBar.tsx   # Floating scroll summary control
│   │   └── ui/                    # Optimized UI primitives
│   ├── pages/
│   │   ├── Index.tsx              # Main application landing & editor
│   │   ├── Features.tsx           # Deep feature overview page
│   │   ├── About.tsx              # Mission, team & core values
│   │   ├── Contact.tsx            # Support form & FAQ accordion
│   │   ├── PrivacyPolicy.tsx      # Privacy policy compliance
│   │   ├── TermsOfService.tsx     # Terms of service agreement
│   │   ├── CookiePolicy.tsx       # Cookie disclosure policy
│   │   └── RefundPolicy.tsx       # Service policy statement
│   ├── types/
│   │   └── invoice.ts             # TypeScript domain schemas
│   ├── utils/
│   │   ├── exportUtils.ts         # High-res canvas PDF/PNG exporter
│   │   ├── invoiceCalculator.ts   # Centralized DRY math engine
│   │   └── invoiceStorage.ts      # LocalStorage persistence manager
│   ├── App.tsx                    # Route code-splitting & motion wrapper
│   ├── index.css                  # Shimmer keyframes & glass CSS tokens
│   └── main.tsx                   # React root mounting entrypoint
├── LICENSE                        # Official MIT Open-Source License
├── package.json                   # Dependencies & build scripts
├── tailwind.config.ts             # Tailwind design tokens & themes
└── vite.config.ts                 # Vite bundle optimization setup
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` (v9+) or `yarn` / `pnpm`

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/scriptbazar/simple-invoice-forge.git
   cd simple-invoice-forge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   *The application will launch automatically at `http://localhost:8080/`.*

4. **Verify TypeScript & Linter:**
   ```bash
   npx tsc --noEmit
   npm run lint
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```
   *Generates optimized, minified production assets in `dist/` in ~5 seconds.*

---

## 🔒 Security & Data Privacy

Smart Invoice Forge operates on a **100% Client-Side Architecture**:
- Zero server database storage for your invoice data.
- All calculation formulas, logo conversions, PDF rendering, and QR generation execute directly within your browser memory.
- No personal billing details or client information are ever transmitted to external servers.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

```
MIT License
Copyright (c) 2026 ScriptBazar / Smart Invoice Forge
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [Issues Page](https://github.com/scriptbazar/simple-invoice-forge/issues).

---

### Star this Repository 🌟
If you find Smart Invoice Forge useful, please consider giving it a star on GitHub!
