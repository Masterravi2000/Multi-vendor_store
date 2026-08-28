import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { ShoppingBag } from "lucide-react"; // Make sure lucide-react is installed, or use any icon

export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  // Calculate total item quantity
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white px-4 py-3 border-b border-gray-100">
      <h1 className="text-xl font-bold text-gray-900">My Store</h1>
      
      <div className="relative p-2 rounded-full bg-gray-50 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
        <ShoppingBag className="w-5 h-5 text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {totalItems}
          </span>
        )}
      </div>
    </header>
  );
}