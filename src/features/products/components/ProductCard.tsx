import { useState } from "react";
import { ImageOff, Minus, Plus } from "lucide-react";

export interface ProductCardProps {
  imageUrl?: string;
  productName: string;
  vendorName: string;
  price: number;
  unit: string;
  currencySymbol?: string;
  quantity?: number; // Changed from initialQuantity
  maxQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
  onCardClick?: () => void;
}

export default function ProductCard({
  imageUrl,
  productName,
  vendorName,
  price,
  unit,
  currencySymbol = "₹",
  quantity = 0, // Now directly controlled by parent
  maxQuantity,
  onQuantityChange,
}: ProductCardProps) {
  const [imageError, setImageError] = useState<boolean>(false);

  const updateQuantity = (next: number) => {
    const clamped = Math.max(
      0,
      maxQuantity ? Math.min(next, maxQuantity) : next,
    );
    onQuantityChange?.(clamped); // Directly tell Redux to update
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(quantity - 1);
  };

  const isMaxed = maxQuantity !== undefined && quantity >= maxQuantity;

  return (
    <div
      className="flex flex-col w-full h-full rounded-xl border border-gray-300 bg-white overflow-hidden
                 transition-shadow duration-150
                 dark:bg-neutral-900 dark:border-neutral-800"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-gray-50 dark:bg-neutral-800 flex items-center justify-center overflow-hidden">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={productName}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <ImageOff
            aria-hidden="true"
            className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 dark:text-neutral-600"
            strokeWidth={1.5}
          />
        )}
      </div>

      {/* Details Container */}
      <div className="flex flex-col flex-1 gap-1 p-2.5 sm:p-3">
        <h3 className="text-md sm:text-[15px] font-bold text-gray-900 dark:text-neutral-100 leading-snug line-clamp-2">
          {productName}
        </h3>
        <p className="text-[11px] sm:text-xs font-semibold text-gray-800 dark:text-neutral-400 truncate">
          {vendorName}
        </p>
        <p className="text-[11px] sm:text-xs text-gray-600 dark:text-neutral-500">
          {unit}
        </p>

        {/* Price + Action Row */}
        <div className=" flex items-center justify-between gap-2">
          <span className="text-xl sm:text-base font-bold text-gray-900 dark:text-neutral-100">
            {currencySymbol}
            {price}
          </span>

          {quantity === 0 ? (
            <button
              type="button"
              onClick={handleAdd}
              className="rounded-lg bg-gray-900 font-medium
                         px-4.5 h-7.5 transition-colors hover:bg-gray-800 flex justify-center items-center"
            >
              <span className="font-semibold text-white sm:text-md text-xs">Add</span>
            </button>
          ) : (
            <div className="flex h-7.5 items-center gap-1 rounded-lg border border-gray-600 p-1">
              <button
                type="button"
                onClick={handleDecrement}
                className="px-1.5 py-1 flex items-center justify-center rounded-md hover:bg-gray-50"
              >
                <Minus
                  className="w-3 h-3 text-gray-700 sm:w-4 sm:h-4"
                  strokeWidth={2.5}
                />
              </button>
              <span className="min-w-[1rem] text-center text-xs sm:text-sm font-medium text-gray-700">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                disabled={isMaxed}
                className="px-1.5 py-1 flex items-center justify-center rounded-md hover:bg-gray-50"
              >
                <Plus
                  className="w-3 text-gray-700 h-3 sm:w-4 sm:h-4"
                  strokeWidth={2.5}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
