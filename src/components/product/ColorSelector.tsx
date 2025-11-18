'use client';

import { ProductVariant } from '@/types';
import { cn } from '@/utils/helpers';

interface ColorSelectorProps {
  variants: ProductVariant[];
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
}

export default function ColorSelector({
  variants,
  selectedColor,
  selectedSize,
  onColorChange,
}: ColorSelectorProps) {
  // Get unique colors
  const uniqueColors = Array.from(
    new Map(variants.map(v => [v.color, { color: v.color, hex: v.colorHex }])).values()
  );

  // Check if color is available for selected size
  const isColorAvailable = (color: string) => {
    return variants.some(v => v.color === color && v.size === selectedSize && v.inStock);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-neutral-900">
        Color: <span className="text-brand-green-600">{selectedColor}</span>
      </label>
      <div className="flex flex-wrap gap-3">
        {uniqueColors.map(({ color, hex }) => {
          const isAvailable = isColorAvailable(color);
          const isSelected = color === selectedColor;

          return (
            <button
              key={color}
              onClick={() => isAvailable && onColorChange(color)}
              disabled={!isAvailable}
              className={cn(
                'relative w-12 h-12 rounded-full border-4 transition-all',
                'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-green-500 focus:ring-offset-2',
                isSelected && 'border-brand-green-500 scale-110',
                !isSelected && isAvailable && 'border-neutral-300',
                !isAvailable && 'opacity-30 cursor-not-allowed'
              )}
              style={{ backgroundColor: hex }}
              title={color}
              aria-label={`Select ${color} color`}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-neutral-400 rotate-45" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
