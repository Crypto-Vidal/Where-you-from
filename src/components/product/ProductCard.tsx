'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { formatPrice, calculateDiscount, getProductUrl } from '@/utils/helpers';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = hasDiscount ? calculateDiscount(product.price, product.compareAtPrice!) : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Add default variant to cart
    const defaultVariant = product.variants.find(v => v.inStock) || product.variants[0];
    if (defaultVariant) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: defaultVariant.size,
        color: defaultVariant.color,
        quantity: 1,
        variantId: defaultVariant.id,
      });
    }
  };

  return (
    <Link href={getProductUrl(product.slug)}>
      <motion.div
        className="group relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100 mb-4">
          <Image
            src={product.images[currentImage]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNewDrop && (
              <Badge variant="holographic" size="sm">
                New
              </Badge>
            )}
            {product.isBestseller && (
              <Badge variant="warning" size="sm">
                Bestseller
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="danger" size="sm">
                {discount}% OFF
              </Badge>
            )}
            {product.isShirtOfMonth && (
              <Badge variant="primary" size="sm">
                Shirt of the Month
              </Badge>
            )}
          </div>

          {/* Image Dots Navigation */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImage(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImage
                      ? 'bg-white w-6'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Quick Add Button (shows on hover) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <Button
              onClick={handleQuickAdd}
              variant="primary"
              size="sm"
              fullWidth
              className="shadow-lg"
            >
              Quick Add
            </Button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-neutral-900 group-hover:text-brand-green-600 transition-colors line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm text-neutral-600 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <svg
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < Math.floor(product.rating!)
                        ? 'text-yellow-400 fill-current'
                        : 'text-neutral-300'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-neutral-500">
                ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-neutral-900">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-neutral-500 line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>

          {/* Color Options Preview */}
          <div className="flex gap-1.5">
            {Array.from(new Set(product.variants.map(v => v.colorHex)))
              .slice(0, 5)
              .map((colorHex, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 rounded-full border-2 border-neutral-300"
                  style={{ backgroundColor: colorHex }}
                  title={product.variants.find(v => v.colorHex === colorHex)?.color}
                />
              ))}
            {Array.from(new Set(product.variants.map(v => v.colorHex))).length > 5 && (
              <span className="text-xs text-neutral-500 self-center">
                +{Array.from(new Set(product.variants.map(v => v.colorHex))).length - 5}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
