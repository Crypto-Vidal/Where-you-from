'use client';

import Link from 'next/link';
import { Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';

interface BestsellersProps {
  products: Product[];
}

export default function Bestsellers({ products }: BestsellersProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
            ⭐ Customer Favorites
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Bestsellers
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            These Minnesota-inspired pieces are flying off the shelves. Join thousands of happy customers!
          </p>
        </div>

        <ProductGrid products={products.slice(0, 4)} />

        <div className="text-center mt-12">
          <Link href="/collections/bestsellers">
            <Button variant="outline" size="lg">
              View All Bestsellers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
