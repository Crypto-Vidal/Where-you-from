'use client';

import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/helpers';
import Button from '@/components/ui/Button';
import CartItem from './CartItem';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function CartModal() {
  const { items, isOpen, closeCart, subtotal } = useCart();

  const shipping = subtotal > 75 ? 0 : 8.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Cart Slide-over */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-neutral-900">
                Shopping Cart ({items.length})
              </h2>
              <button
                onClick={closeCart}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Close cart"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <svg className="w-24 h-24 text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Your cart is empty</h3>
                  <p className="text-neutral-600 mb-6">Add some items to get started!</p>
                  <Button onClick={closeCart} variant="primary">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Summary */}
            {items.length > 0 && (
              <div className="border-t border-neutral-200 px-6 py-4 space-y-4">
                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">
                        Add {formatPrice(75 - subtotal)} for free shipping!
                      </span>
                      <span className="text-brand-green-600 font-medium">
                        {Math.min(100, (subtotal / 75) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (subtotal / 75) * 100)}%` }}
                        className="h-full bg-gradient-brand"
                      />
                    </div>
                  </div>
                )}

                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="text-neutral-900">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="text-neutral-900">
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax</span>
                    <span className="text-neutral-900">{formatPrice(tax)}</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-200">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-neutral-900">Total</span>
                      <span className="text-lg font-bold text-brand-green-600">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button variant="primary" size="lg" fullWidth>
                  Proceed to Checkout
                </Button>

                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-brand-green-600 hover:text-brand-green-700 font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
