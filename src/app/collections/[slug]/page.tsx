'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProductGrid from '@/components/product/ProductGrid';
import { products, collections } from '@/data/products';
import { Product } from '@/types';

interface CollectionPageProps {
  params: {
    slug: string;
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Get collection info
  const collection = collections.find(c => c.slug === params.slug);

  // Filter products by collection
  const collectionProducts = useMemo(() => {
    let filtered: Product[] = [];

    switch (params.slug) {
      case 'bestsellers':
        filtered = products.filter(p => p.isBestseller);
        break;
      case 'new-drops':
        filtered = products.filter(p => p.isNewDrop);
        break;
      case 'local-pride':
        filtered = products.filter(p => p.collection === 'local-pride');
        break;
      case 'all':
        filtered = products;
        break;
      default:
        filtered = products.filter(p => p.collection === params.slug);
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(p => p.category === filterCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNewDrop ? 1 : 0) - (a.isNewDrop ? 1 : 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return filtered;
  }, [params.slug, sortBy, filterCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const collectionTitle = collection?.name || params.slug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const collectionDescription = collection?.description || 'Discover our curated collection';

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-brand-green-50 via-white to-brand-teal-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-brand rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
              {collectionTitle}
            </h1>
            <p className="text-xl text-neutral-600">
              {collectionDescription}
            </p>
            <div className="mt-6">
              <span className="text-sm text-neutral-500">
                {collectionProducts.length} {collectionProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-neutral-200">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterCategory === category
                      ? 'bg-brand-green-500 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category === 'all' ? 'All' : category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-neutral-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-lg border-2 border-neutral-200 bg-white focus:border-brand-green-500 focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {collectionProducts.length > 0 ? (
            <ProductGrid products={collectionProducts} />
          ) : (
            <div className="text-center py-20">
              <svg className="w-24 h-24 text-neutral-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">No products found</h3>
              <p className="text-neutral-600">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
