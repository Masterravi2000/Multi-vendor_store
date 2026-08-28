import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { updateQuantity } from "../../features/cart/cartSlice";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import type { Product } from "../../types";

export default function ProductCheckout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Group items by store_name
  const groupedByStore = cartItems.reduce((acc, item) => {
    const storeName = item.store_name || "Other Store";
    if (!acc[storeName]) {
      acc[storeName] = [];
    }
    acc[storeName].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-300 mb-3" />
        <p className="text-sm font-semibold text-gray-800">Your cart is empty</p>
        <p className="text-xs text-gray-500 mt-1">Add items from the catalog to start shopping.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-20">
      {Object.entries(groupedByStore).map(([storeName, items]) => (
        <div key={storeName} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Store: <span className="text-gray-900 font-extrabold">{storeName}</span>
            </h3>
            <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="flex flex-col divide-y divide-gray-100">
            {items.map((item) => {
              const product: Product = {
                id: item.id,
                store_id: item.store_id,
                store_name: item.store_name,
                name: item.name,
                category: item.category,
                price: item.price,
                unit: item.unit,
                imageUrl: item.imageUrl,
              };

              return (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-100 bg-gray-50 shrink-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-900">{item.name}</p>
                      <p className="text-[10px] text-gray-500">{item.unit}</p>
                      <p className="text-xs font-bold text-gray-900 mt-0.5">₹{item.price * item.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => dispatch(updateQuantity({ product, quantity: item.quantity - 1 }))}
                      className="p-1 rounded hover:bg-white text-gray-600 transition-colors"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-red-500" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(updateQuantity({ product, quantity: item.quantity + 1 }))}
                      className="p-1 rounded hover:bg-white text-gray-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}