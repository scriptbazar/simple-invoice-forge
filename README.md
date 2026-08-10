# Smart Invoice Forge

**Smart Invoice Forge** is a fast, privacy-focused, free web application to create, customize, and export professional invoices in seconds.

## Features

- **Multiple Invoice Formats**: Retail, GST Tax Invoices, Freelance Billing, Medical Bills, Hotel Room Bills, Proforma Quotes, Service Invoices & Custom Layouts.
- **Real-Time Tax & Discount Math**: Automatic calculation of Taxable Amount, CGST/SGST/IGST, Discount, and Grand Total.
- **Multi-Currency Support**: Support for INR (₹), USD ($), EUR (€), GBP (£), AED, CAD, AUD, and SGD.
- **PDF, PNG & JPG Exports**: High-resolution vector PDF and image downloads.
- **Live Payment QR Code**: Scannable UPI / PayPal payment QR code printed directly on PDF invoices.
- **Accent Theme Color Selector**: Customizable PDF themes (Classic Blue, Emerald Green, Royal Purple, Crimson Red, Slate Dark).
- **100% Privacy Focused**: All calculations and logo processing happen inside your browser. Zero server tracking.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation & Local Setup

```bash
# Step 1: Install dependencies
npm install

# Step 2: Start local development server
npm run dev

# Step 3: Open browser at http://localhost:8080/
```

### Production Build

```bash
# Generate optimized production bundle
npm run build
```

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Glassmorphism utilities
- **Animations**: Framer Motion (60fps hardware-accelerated animations)
- **Document Export**: html2canvas + jsPDF
- **Icons**: Lucide React
