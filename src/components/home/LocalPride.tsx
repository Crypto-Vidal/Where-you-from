'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';

interface LocalPrideProps {
  products: Product[];
}

export default function LocalPride({ products }: LocalPrideProps) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-green-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-brand-green-100 text-brand-green-700 rounded-full text-sm font-medium mb-4">
            🌟 Locally Inspired
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Minnesota Pride Collection
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            From the North Shore to the Twin Cities, celebrate everything that makes Minnesota special.
            Each piece tells a story of our lakes, our winters, and our incredible community.
          </p>
        </motion.div>

        {/* Minnesota Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: '🏞️',
              title: '10,000 Lakes',
              description: 'Designs inspired by Minnesota\'s stunning natural beauty',
            },
            {
              icon: '⭐',
              title: 'North Star State',
              description: 'Honoring our state motto with every creation',
            },
            {
              icon: '🤝',
              title: 'Minnesota Nice',
              description: 'Friendly, welcoming designs that reflect our culture',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Products */}
        <ProductGrid products={products.slice(0, 4)} />

        <div className="text-center mt-12">
          <Link href="/collections/local-pride">
            <Button variant="primary" size="lg">
              Shop Minnesota Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
