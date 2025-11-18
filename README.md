# 🌟 Where You From - Minnesota Pride Clothing E-Commerce

A modern, full-featured e-commerce website for "Where You From", a Minnesota-based clothing brand celebrating local pride and community.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055)

---

## ✨ Features

### 🎨 Design & UX

- **Modern, playful design** with soft greens, teal gradients, and holographic accents
- **Smooth animations** powered by Framer Motion
- **Mobile-first responsive** design that looks great on all devices
- **Warm, friendly atmosphere** reflecting Minnesota Nice culture
- **High-contrast typography** for excellent readability
- **Floating UI elements** and subtle motion effects

### 🛍️ E-Commerce Features

- **Product catalog** with detailed product pages
- **Shopping cart** with slide-over modal and persistent state
- **Size & color selectors** with real-time availability
- **Product reviews** and ratings
- **Collections** with filtering and sorting
- **Quick-add functionality** on product cards
- **Search bar** (ready for backend integration)
- **Newsletter signup**
- **Related products** suggestions

### 🎯 Shopify-Grade Features

- **Bestsellers section** highlighting top products
- **New Drops section** for latest releases
- **Local Pride Collection** celebrating Minnesota
- **"Shirt of the Month"** with countdown timer and limited stock tracking
- **"As Seen on Socials"** gallery with social proof
- **Product variant images** that change with selection
- **Discount badges** and sale pricing
- **Stock availability indicators**
- **Free shipping progress bar** in cart
- **Customer review system**

### 🏔️ Minnesota-Specific

- **Minnesota-themed branding** throughout
- **Local pride messaging** and storytelling
- **About page** highlighting Minnesota roots
- **10,000 Lakes inspiration**
- **North Star State references**
- **Twin Cities pride**

### ⚡ Technical Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Context API** for state management
- **SEO optimized** with metadata and Open Graph tags
- **Image optimization** with Next.js Image
- **Responsive images** with proper sizing
- **Clean code architecture** and modular components
- **Accessibility** considerations throughout

---

## 📁 Project Structure

```
Where-you-from/
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles
│   │   ├── products/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Dynamic product pages
│   │   ├── collections/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Dynamic collection pages
│   │   ├── about/
│   │   │   └── page.tsx         # About/Story page
│   │   └── contact/
│   │       └── page.tsx         # Contact page with form
│   │
│   ├── components/
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx       # Sticky header with nav
│   │   │   └── Footer.tsx       # Footer with newsletter
│   │   ├── home/                # Home page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── Bestsellers.tsx
│   │   │   ├── NewDrops.tsx
│   │   │   ├── ShirtOfTheMonth.tsx
│   │   │   ├── LocalPride.tsx
│   │   │   └── SocialGallery.tsx
│   │   ├── product/             # Product components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductDetails.tsx
│   │   │   ├── SizeSelector.tsx
│   │   │   ├── ColorSelector.tsx
│   │   │   ├── Reviews.tsx
│   │   │   └── RelatedProducts.tsx
│   │   └── cart/                # Shopping cart
│   │       ├── CartModal.tsx
│   │       └── CartItem.tsx
│   │
│   ├── context/
│   │   └── CartContext.tsx      # Cart state management
│   │
│   ├── data/
│   │   └── products.ts          # Product data & helpers
│   │
│   ├── types/
│   │   └── index.ts             # TypeScript definitions
│   │
│   └── utils/
│       └── helpers.ts           # Utility functions
│
├── public/                       # Static assets
│   └── images/                  # Product images
│
├── tailwind.config.js           # Tailwind configuration
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
├── DEPLOYMENT.md                # Deployment guide
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd Where-you-from
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎨 Design System

### Colors

```javascript
// Brand Colors
brand-green: Soft greens (#22c55e to #15803d)
brand-teal: Teal gradients (#14b8a6 to #0f766e)
brand-holographic: Fluorescent accents (pink, purple, cyan, lime)

// Neutrals
neutral-white: Clean whites
neutral-black: Charcoal blacks
neutral-gray: Balanced grays
```

### Typography

- **Display Font:** Poppins (Bold, 700-900) - Headers, titles
- **Body Font:** Inter (Regular-Bold, 400-700) - Body text, UI

### Animations

- **Floating elements** with ease-in-out
- **Gradient animations** for holographic effects
- **Smooth transitions** (200-300ms)
- **Scale on hover** for cards and buttons
- **Slide-in animations** for modals

---

## 🛒 Cart Functionality

The shopping cart uses React Context API for state management:

- **Persistent storage** via localStorage
- **Real-time updates** across all components
- **Quantity management** with +/- controls
- **Automatic price calculation** with tax and shipping
- **Free shipping threshold** ($75) with progress bar
- **Slide-over modal** with smooth animations

---

## 📦 Product Data

Currently using dummy data in `src/data/products.ts`. To integrate with a real backend:

1. **Replace data fetching functions** with API calls
2. **Update types** if needed
3. **Add environment variables** for API endpoints
4. **Implement error handling**

See `DEPLOYMENT.md` for backend integration examples.

---

## 🔧 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

---

## 📱 Pages Overview

### Home Page (`/`)
- Animated hero with Minnesota branding
- Shirt of the Month with countdown
- Bestsellers section
- New Drops section
- Local Pride collection
- Social media gallery

### Product Pages (`/products/[slug]`)
- High-quality product images with gallery
- Size and color selectors
- Variant management
- Add to cart functionality
- Product details and features
- Customer reviews
- Related products

### Collection Pages (`/collections/[slug]`)
- Filtered product grids
- Category filters
- Sort options (featured, price, newest)
- Collection descriptions

### About Page (`/about`)
- Brand story and Minnesota roots
- Company values
- Local pride messaging
- Call-to-action sections

### Contact Page (`/contact`)
- Contact form with validation
- Multiple contact methods
- Location information
- Social media links

---

## 🎯 SEO Features

- **Metadata** on all pages
- **Open Graph tags** for social sharing
- **Structured data** ready for implementation
- **Semantic HTML** throughout
- **Image optimization** with Next.js Image
- **Mobile-friendly** and responsive
- **Fast loading times**

---

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔌 Backend Integration

This is a **frontend-only** implementation. To go live, you'll need to integrate:

### Required Integrations

1. **Product Database/CMS**
   - Shopify
   - Contentful
   - Sanity
   - Custom API

2. **Payment Processing**
   - Stripe
   - PayPal
   - Square

3. **Email Service**
   - SendGrid
   - Mailgun
   - Resend

4. **Analytics**
   - Google Analytics
   - Mixpanel
   - Plausible

See `DEPLOYMENT.md` for detailed integration guides.

---

## 📈 Performance

The site is optimized for performance:

- **Next.js Image Optimization** for fast image loading
- **Code splitting** for smaller initial bundles
- **Lazy loading** for off-screen images
- **Static generation** where possible
- **Minimal JavaScript** for critical rendering path

Expected Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## 🤝 Contributing

This is a custom-built project. To modify:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📄 License

This project is proprietary software for Where You From.

Copyright © 2024 Where You From. All rights reserved.

---

## 💬 Support

For questions or support:

- **Email:** hello@whereyoufrom.com
- **Documentation:** See `DEPLOYMENT.md` for deployment help
- **Issues:** Open an issue in the repository

---

## 🙏 Acknowledgments

- **Next.js** - The React Framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Unsplash** - Placeholder images
- **Minnesota** - Our home and inspiration

---

## 🗺️ Roadmap

Future enhancements to consider:

- [ ] User authentication and accounts
- [ ] Order history
- [ ] Wishlist functionality
- [ ] Product reviews (user-submitted)
- [ ] Live chat support
- [ ] Advanced search with filters
- [ ] Blog/Content section
- [ ] Loyalty program
- [ ] Gift cards
- [ ] International shipping

---

**Made with ❤️ in Minnesota**
