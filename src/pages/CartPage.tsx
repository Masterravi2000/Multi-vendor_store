import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import ProductCheckout from "../components/common/ProductCheckout";
import { ArrowLeft } from "lucide-react";

interface CartPageProps {
  onBack: () => void;
}

export default function CartPage({ onBack }: CartPageProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 25 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="p-4 pb-32 bg-gray-50 h-[100dvh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {/* Top Header */}
      <div className="flex items-center gap-3 mb-4 sticky top-0 bg-gray-50 py-2 z-10 border-b border-gray-100">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-gray-700" />
        </button>
        <h1 className="text-sm font-bold text-gray-900">Checkout Cart</h1>
      </div>

      {/* Grouped Products List */}
      <ProductCheckout />

      {/* Bill Details Summary */}
      {cartItems.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm mt-4">
          <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">Bill Details</h3>
          <div className="flex flex-col gap-2 text-xs text-gray-600 border-b border-gray-100 pb-3">
            <div className="flex justify-between">
              <span>Items Total ({totalItems} items)</span>
              <span className="font-semibold text-gray-900">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span className="font-semibold text-gray-900">₹{deliveryFee}</span>
            </div>
          </div>
          <div className="flex justify-between items-center pt-3 text-sm font-bold text-gray-900">
            <span>Grand Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <button
            type="button"
            className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl text-xs font-semibold hover:bg-gray-800 transition-colors shadow-sm"
          >
            Proceed to Payment ₹ {grandTotal}
          </button>
        </div>
      )}
    </div>
  );
}