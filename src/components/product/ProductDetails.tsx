'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { formatPrice, calculateDiscount, isOnSale, getAvailabilityText } from '@/utils/helpers';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import { useCart } from '@/context/CartContext';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.variants.find(v => v.inStock)?.size || product.variants[0].size);
  const [selectedColor, setSelectedColor] = useState(product.variants.find(v => v.inStock)?.color || product.variants[0].color);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const currentVariant = product.variants.find(
    v => v.size === selectedSize && v.color === selectedColor
  );

  const hasDiscount = isOnSale(product.price, product.compareAtPrice);
  const discount = hasDiscount ? calculateDiscount(product.price, product.compareAtPrice!) : 0;

  const handleAddToCart = () => {
    if (!currentVariant || !currentVariant.inStock) return;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[currentImageIndex],
      size: selectedSize,
      color: selectedColor,
      quantity,
      variantId: currentVariant.id,
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    // Update image if variant has specific image
    const newVariant = product.variants.find(v => v.color === color && v.size === selectedSize);
    if (newVariant?.image) {
      const imageIndex = product.images.indexOf(newVariant.image);
      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-100">
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNewDrop && (
              <Badge variant="holographic" size="md">
                New Drop
              </Badge>
            )}
            {product.isBestseller && (
              <Badge variant="warning" size="md">
                Bestseller
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="danger" size="md">
                Save {discount}%
              </Badge>
            )}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="grid grid-cols-4 gap-3">
          {product.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? 'border-brand-green-500 scale-105'
                  : 'border-neutral-200 hover:border-brand-green-300'
              }`}
            >
              <Image
                src={image}
                alt={`${product.name} view ${index + 1}`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <p className="text-brand-green-600 font-medium mb-2 uppercase tracking-wide text-sm">
            {product.category}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating!)
                        ? 'text-yellow-400 fill-current'
                        : 'text-neutral-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-neutral-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-bold text-neutral-900">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-2xl text-neutral-500 line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
                <Badge variant="danger">Save {discount}%</Badge>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-lg text-neutral-700 leading-relaxed">
            {product.longDescription || product.description}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-200" />

        {/* Color Selector */}
        <ColorSelector
          variants={product.variants}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          onColorChange={handleColorChange}
        />

        {/* Size Selector */}
        <SizeSelector
          variants={product.variants}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          onSizeChange={setSelectedSize}
        />

        {/* Quantity */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-900">
            Quantity
          </label>
          <div className="flex items-center border-2 border-neutral-300 rounded-lg w-32">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              −
            </button>
            <span className="flex-1 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-3 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Stock Status */}
        {currentVariant && (
          <div className="text-sm">
            <span className={currentVariant.inStock ? 'text-brand-green-600' : 'text-red-600'}>
              {getAvailabilityText(currentVariant.inStock, currentVariant.quantity)}
            </span>
          </div>
        )}

        {/* Add to Cart */}
        <div className="sticky bottom-0 bg-white pt-6 pb-4 border-t border-neutral-200 space-y-3">
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="lg"
            fullWidth
            disabled={!currentVariant?.inStock}
          >
            {currentVariant?.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600 pt-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free shipping over $75
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Easy returns
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sustainably made
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Minnesota made
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
