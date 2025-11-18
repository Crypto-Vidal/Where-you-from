'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';
import { motion } from 'framer-motion';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="flex gap-4 pb-4 border-b border-neutral-200 last:border-0"
    >
      {/* Product Image */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between gap-2">
          <h3 className="font-semibold text-neutral-900 line-clamp-2 text-sm">
            {item.name}
          </h3>
          <button
            onClick={() => removeItem(item.id)}
            className="text-neutral-400 hover:text-red-500 transition-colors flex-shrink-0"
            aria-label="Remove item"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 text-xs text-neutral-600 mt-1">
          <span>Size: {item.size}</span>
          <span>•</span>
          <span>Color: {item.color}</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          {/* Quantity Selector */}
          <div className="flex items-center border border-neutral-300 rounded-lg">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="px-3 py-1 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-medium border-x border-neutral-300">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-3 py-1 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="font-bold text-neutral-900">
              {formatPrice(item.price * item.quantity)}
            </div>
            {item.quantity > 1 && (
              <div className="text-xs text-neutral-500">
                {formatPrice(item.price)} each
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
