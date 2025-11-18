// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  collection: string;
  tags: string[];
  inStock: boolean;
  isBestseller?: boolean;
  isNewDrop?: boolean;
  isFeatured?: boolean;
  isShirtOfMonth?: boolean;
  variants: ProductVariant[];
  reviews?: Review[];
  rating?: number;
  reviewCount?: number;
}

export interface ProductVariant {
  id: string;
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  color: string;
  colorHex: string;
  inStock: boolean;
  quantity: number;
  sku: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
}

// Cart types
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  variantId: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// Collection types
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

// Newsletter types
export interface NewsletterSubscription {
  email: string;
  timestamp: Date;
}

// Contact form types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Social media post types
export interface SocialPost {
  id: string;
  image: string;
  platform: 'instagram' | 'tiktok' | 'twitter';
  link: string;
  likes: number;
}

// Shirt of the Month types
export interface ShirtOfMonth {
  product: Product;
  endDate: Date;
  limitedQuantity: number;
  soldCount: number;
}
