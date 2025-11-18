'use client';

import Link from 'next/link';
import { Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';

interface NewDropsProps {
  products: Product[];
}

export default function NewDrops({ products }: NewDropsProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-teal-50 to-brand-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gradient-holographic text-white rounded-full text-sm font-medium mb-4 animate-gradient bg-[length:200%_200%]">
            ✨ Fresh & New
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            New Drops
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Just landed! Check out our latest Minnesota-inspired designs before they're gone.
          </p>
        </div>

        <ProductGrid products={products.slice(0, 4)} />

        <div className="text-center mt-12">
          <Link href="/collections/new-drops">
            <Button variant="primary" size="lg">
              Explore New Arrivals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
