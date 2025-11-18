# Where You From - Deployment Guide

Complete deployment instructions for the Where You From e-commerce website.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Environment Variables](#environment-variables)
4. [Building for Production](#building-for-production)
5. [Deployment Options](#deployment-options)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Backend Integration](#backend-integration)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.17 or later ([Download](https://nodejs.org/))
- **npm** or **yarn** or **pnpm** package manager
- **Git** for version control

---

## Local Development Setup

### 1. Clone or Navigate to the Repository

```bash
cd Where-you-from
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

### 4. Verify the Setup

- Open `http://localhost:3000` in your browser
- You should see the homepage with:
  - Animated hero section
  - Shirt of the Month
  - Bestsellers, New Drops, and Local Pride sections
  - Social media gallery
- Click on products to test the product detail page
- Add items to cart and verify cart functionality
- Test the collections, about, and contact pages

---

## Environment Variables

Create a `.env.local` file in the root directory for environment-specific configuration:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_SITE_NAME="Where You From"

# API Configuration (when you connect a backend)
NEXT_PUBLIC_API_URL=https://api.yoursite.com
NEXT_PUBLIC_API_KEY=your_api_key_here

# Stripe (for payments - optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# Email Service (for contact form - optional)
EMAIL_SERVICE_API_KEY=your_email_service_key
EMAIL_FROM=hello@whereyoufrom.com

# Analytics (optional)
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

**Important:** Never commit `.env.local` or any file with sensitive keys to version control.

---

## Building for Production

### 1. Create Production Build

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This command:
- Compiles TypeScript
- Optimizes images
- Bundles and minifies code
- Generates static pages where possible

### 2. Test Production Build Locally

```bash
npm run start
# or
yarn start
# or
pnpm start
```

Visit `http://localhost:3000` to test the production build locally.

---

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the company behind Next.js and provides the best integration.

#### Deploy via Vercel Dashboard

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import your repository:**
   - Click "New Project"
   - Connect your GitHub/GitLab/Bitbucket account
   - Select the `Where-you-from` repository
3. **Configure:**
   - Framework Preset: `Next.js` (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
4. **Add Environment Variables** (if needed)
5. **Deploy!**

Your site will be live at `your-project.vercel.app` (you can add a custom domain later)

#### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

**Automatic Deployments:** Every push to your main branch will automatically deploy.

---

### Option 2: Netlify

1. **Sign up** at [netlify.com](https://netlify.com)
2. **New Site from Git:**
   - Connect your repository
   - Build Command: `npm run build`
   - Publish Directory: `.next`
3. **Configure Next.js Plugin:**
   - Netlify will automatically detect Next.js
   - Or add `@netlify/plugin-nextjs` to your `netlify.toml`
4. **Deploy**

---

### Option 3: AWS Amplify

1. **Sign in** to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. **Connect Repository**
3. **Build Settings:**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
4. **Deploy**

---

### Option 4: Docker + Any Cloud Provider

#### Dockerfile

Create a `Dockerfile` in the root:

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

#### Build and Run

```bash
# Build image
docker build -t where-you-from .

# Run container
docker run -p 3000:3000 where-you-from
```

Deploy this Docker image to:
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**

---

### Option 5: Traditional VPS (Ubuntu/Nginx)

#### 1. Server Setup

```bash
# SSH into your server
ssh user@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Clone your repository
git clone https://github.com/yourusername/where-you-from.git
cd where-you-from

# Install dependencies
npm install

# Build
npm run build
```

#### 2. Run with PM2

```bash
# Start the app
pm2 start npm --name "where-you-from" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

#### 3. Configure Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 4. SSL with Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## Post-Deployment Checklist

After deploying, verify the following:

### Functionality

- [ ] Homepage loads correctly with all sections
- [ ] Product pages display with images, variants, and reviews
- [ ] Collections pages show filtered products
- [ ] Shopping cart adds/removes items correctly
- [ ] Cart persists across page refreshes
- [ ] Search functionality works
- [ ] Contact form submits successfully
- [ ] Newsletter signup works
- [ ] All navigation links work
- [ ] Footer links work

### Performance

- [ ] Lighthouse score > 90 for Performance
- [ ] Images load optimized (WebP/AVIF)
- [ ] Initial page load < 3 seconds
- [ ] No console errors

### SEO

- [ ] Meta tags present on all pages
- [ ] Open Graph tags for social sharing
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Google Analytics/Tag Manager installed (if applicable)

### Mobile

- [ ] Site is responsive on all devices
- [ ] Touch interactions work properly
- [ ] Mobile menu functions correctly
- [ ] Cart modal works on mobile

### Security

- [ ] HTTPS enabled
- [ ] No exposed API keys in client-side code
- [ ] CSP headers configured (optional)

---

## Backend Integration

This is currently a **frontend-only** implementation with dummy data. To connect a real backend:

### 1. Choose a Backend Option

#### Option A: Shopify

Install Shopify SDK:
```bash
npm install shopify-buy
```

Create `src/lib/shopify.ts`:
```typescript
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: 'your-store.myshopify.com',
  storefrontAccessToken: 'your-access-token',
});

export default client;
```

#### Option B: Headless CMS (Sanity, Contentful, Strapi)

Example with Sanity:
```bash
npm install @sanity/client
```

#### Option C: Custom API

Replace the data fetching in `src/data/products.ts` with API calls:

```typescript
// src/lib/api.ts
export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  return res.json();
}

export async function getProductBySlug(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`);
  return res.json();
}
```

### 2. Payment Integration (Stripe Example)

```bash
npm install @stripe/stripe-js stripe
```

Create checkout session:
```typescript
// src/lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export async function createCheckoutSession(items: CartItem[]) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  return response.json();
}
```

### 3. Email Service (Contact Form)

Use services like:
- **SendGrid**
- **Mailgun**
- **Resend**
- **Amazon SES**

Example API route (`src/app/api/contact/route.ts`):
```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json();

  // Send email via your service
  // await sendEmail({ to: 'hello@whereyoufrom.com', from: email, subject, message });

  return NextResponse.json({ success: true });
}
```

---

## Troubleshooting

### Build Errors

**Issue:** `Module not found` errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Issue:** TypeScript errors
```bash
# Check tsconfig.json is properly configured
npx tsc --noEmit
```

### Runtime Errors

**Issue:** Images not loading
- Check `next.config.js` has correct `domains` configured
- Verify image URLs are accessible

**Issue:** Cart not persisting
- Check browser localStorage is enabled
- Verify `CartContext` is properly wrapped in layout

### Performance Issues

**Issue:** Slow page loads
- Enable Next.js Image Optimization
- Check for large bundle sizes: `npm run build` will show bundle analysis
- Consider implementing dynamic imports for heavy components

---

## Support

For issues or questions:

- **Email:** hello@whereyoufrom.com
- **Documentation:** Check README.md for development details
- **Next.js Docs:** https://nextjs.org/docs

---

## License

Copyright © 2024 Where You From. All rights reserved.
