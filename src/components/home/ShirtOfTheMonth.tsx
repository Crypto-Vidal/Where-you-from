'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShirtOfMonth as ShirtOfMonthType } from '@/types';
import { formatPrice, getTimeRemaining, getProductUrl } from '@/utils/helpers';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface ShirtOfTheMonthProps {
  shirtData: ShirtOfMonthType;
}

export default function ShirtOfTheMonth({ shirtData }: ShirtOfTheMonthProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(shirtData.endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(shirtData.endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [shirtData.endDate]);

  const soldPercentage = (shirtData.soldCount / shirtData.limitedQuantity) * 100;
  const remainingStock = shirtData.limitedQuantity - shirtData.soldCount;

  return (
    <section className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-holographic opacity-20 animate-gradient bg-[length:200%_200%]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={shirtData.product.images[0]}
                alt={shirtData.product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="holographic" size="lg">
                  Limited Edition
                </Badge>
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="text-brand-teal-400 font-medium text-sm uppercase tracking-wider">
                Shirt of the Month
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
                {shirtData.product.name}
              </h2>
              <p className="text-lg text-neutral-300 leading-relaxed">
                {shirtData.product.longDescription}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-sm font-medium text-brand-teal-400 mb-4 uppercase">
                Limited Time Offer Ends In:
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((unit, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white/10 rounded-lg p-3 mb-2">
                      <span className="text-3xl font-bold tabular-nums">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400 uppercase">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock Progress */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-300">
                  Only {remainingStock} of {shirtData.limitedQuantity} remaining!
                </span>
                <span className="text-brand-teal-400 font-semibold">
                  {soldPercentage.toFixed(0)}% sold
                </span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${soldPercentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-holographic animate-gradient bg-[length:200%_200%]"
                />
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center gap-4 pt-4">
              <div>
                <span className="text-3xl font-bold">
                  {formatPrice(shirtData.product.price)}
                </span>
              </div>
              <Link href={getProductUrl(shirtData.product.slug)} className="flex-1">
                <Button variant="primary" size="lg" fullWidth className="shadow-glow">
                  Claim Yours Now
                </Button>
              </Link>
            </div>

            {/* Rating */}
            {shirtData.product.rating && (
              <div className="flex items-center gap-3 pt-2 border-t border-white/20">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(shirtData.product.rating!)
                          ? 'text-yellow-400 fill-current'
                          : 'text-neutral-600'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-neutral-300">
                  {shirtData.product.rating} ({shirtData.product.reviewCount} reviews)
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
