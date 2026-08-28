import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { ArrowRight } from "lucide-react";

export default function BottomNavBar() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate total items and total price
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Hide the bar completely if the cart is empty
  if (totalItems === 0) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">
          {totalItems} {totalItems === 1 ? "item" : "items"} added
        </p>
        <p className="text-xl sm:text-base font-bold text-gray-900">
          ₹{totalPrice}
        </p>
      </div>

      <button
        type="button"
        className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm sm:text-sm font-semibold hover:bg-gray-800"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}