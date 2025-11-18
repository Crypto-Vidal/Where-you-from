'use client';

import { ProductVariant } from '@/types';
import { cn } from '@/utils/helpers';

interface SizeSelectorProps {
  variants: ProductVariant[];
  selectedSize: string;
  selectedColor: string;
  onSizeChange: (size: string) => void;
}

export default function SizeSelector({
  variants,
  selectedSize,
  selectedColor,
  onSizeChange,
}: SizeSelectorProps) {
  // Get unique sizes
  const sizes = Array.from(new Set(variants.map(v => v.size)));

  // Check if size is available for selected color
  const isSizeAvailable = (size: string) => {
    return variants.some(v => v.size === size && v.color === selectedColor && v.inStock);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-900">
        Size: <span className="text-brand-green-600">{selectedSize}</span>
      </label>
      <div className="grid grid-cols-6 gap-2">
        {sizes.map(size => {
          const isAvailable = isSizeAvailable(size);
          const isSelected = size === selectedSize;

          return (
            <button
              key={size}
              onClick={() => isAvailable && onSizeChange(size)}
              disabled={!isAvailable}
              className={cn(
                'py-3 px-4 rounded-lg border-2 font-medium transition-all',
                'hover:border-brand-green-500 focus:outline-none focus:ring-2 focus:ring-brand-green-500',
                isSelected && 'border-brand-green-500 bg-brand-green-50 text-brand-green-700',
                !isSelected && isAvailable && 'border-neutral-300 text-neutral-700',
                !isAvailable && 'border-neutral-200 text-neutral-300 cursor-not-allowed opacity-50 line-through'
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
