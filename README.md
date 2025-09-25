# LABUBUS Ecommerce Website - Sprint 1 & 2

## Overview
This is the MVP ecommerce website for LABUBUS products, built with Next.js, React, TypeScript, and Tailwind CSS. The application now includes a complete shopping cart and checkout flow with payment integration.

## Features Completed

### Sprint 1 (Foundation)
- ✅ Project setup with Next.js 14, TypeScript, and Tailwind CSS
- ✅ Homepage with hero section and featured products
- ✅ Product catalog page with all products
- ✅ Individual product detail pages
- ✅ About and Contact pages
- ✅ Responsive navigation and footer
- ✅ Mock product data for 10 LABUBUS products

### Sprint 2 (Shopping Cart & Checkout)
- ✅ Shopping cart with Zustand state management
- ✅ Add to cart functionality from product cards and detail pages
- ✅ Cart page with quantity management and item removal
- ✅ Persistent cart using localStorage
- ✅ Checkout flow with shipping form validation
- ✅ Stripe payment integration (test mode)
- ✅ Order confirmation page
- ✅ Cart badge in navigation showing item count

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Payment**: Stripe (Test Mode)
- **UI Components**: Custom React components

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
cd labubu_ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local` if it doesn't exist
   - For testing without real Stripe, the default test keys will work
   - For real Stripe integration:
     - Create a free account at https://dashboard.stripe.com
     - Get your test keys from the Dashboard
     - Update the keys in `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure
```
labubu_ecommerce/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── create-payment-intent/  # Stripe payment endpoint
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── order-confirmation/ # Order confirmation page
│   ├── payment/           # Payment page
│   ├── products/          # Products pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navbar.tsx         # Navigation bar with cart badge
│   ├── Footer.tsx         # Footer component
│   ├── Hero.tsx           # Homepage hero section
│   ├── ProductCard.tsx    # Product card with add to cart
│   └── ProductGrid.tsx    # Product grid layout
├── lib/                   # Utilities and data
│   ├── store/             # State management
│   │   └── cart.ts        # Cart store (Zustand)
│   ├── products.json      # Mock product data
│   ├── products.ts        # Product utility functions
│   ├── types.ts           # TypeScript interfaces
│   └── validations.ts     # Form validation schemas
├── public/                # Static assets
│   └── images/            # Product images
├── .env.local             # Environment variables
└── package.json           # Project dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## How to Use

### Shopping Flow
1. **Browse Products**: Navigate to the Shop page to see all products
2. **Add to Cart**: Click "Add to Cart" on any product card or from the product detail page
3. **View Cart**: Click the cart icon in the navigation to view your items
4. **Checkout**:
   - Click "Proceed to Checkout" from the cart page
   - Fill in your shipping information
   - Complete payment (test mode - no real charges)
5. **Order Confirmation**: View your order details on the confirmation page

### Test Mode
The application runs in test mode by default:
- No real payment charges will be made
- Use test card number: 4242 4242 4242 4242
- Any future date for expiry
- Any 3-digit CVC

### Upcoming Features (Sprint 3)
- Admin dashboard for order management
- User authentication
- Product filtering and search
- Inventory management
- Order history
- Email notifications

## Notes
- Product images are currently placeholders
- Orders are stored in memory for MVP (resets on server restart)
- For production, implement proper database storage and real Stripe keys
- Admin features will be added in Sprint 3

## Sprint 2 Summary
Sprint 2 successfully delivers a complete shopping cart and checkout experience:
- ✅ Persistent shopping cart with localStorage
- ✅ Full cart management (add, remove, update quantities)
- ✅ Validated checkout form with shipping details
- ✅ Stripe payment integration ready (test mode)
- ✅ Order confirmation flow
- ✅ Responsive design maintained throughout

The application is now ready for customers to browse products, add them to cart, and complete purchases in a test environment.

## License
This project is part of the LABUBUS ecommerce MVP development.