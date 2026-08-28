import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { updateQuantity } from "../features/cart/cartSlice";
import ProductCard from "../features/products/components/ProductCard";
import products from "../data/mockProducts.json";
import type { Product } from "../types";
import Category from "../components/common/Category";
import { useState } from "react";
import Banner from "../components/common/Banner";
import Header from "../components/common/Header";
import BottomNavBar from "../components/common/BottomNavBar";
import CartPage from "./CartPage";

const CATEGORIES = [
  "All",
  "Dairy",
  "Groceries",
  "Vegetables",
  "Snacks",
  "Beauty",
];

export default function Catalog() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentView, setCurrentView] = useState<"catalog" | "cart">("catalog");
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Derive the current quantity from Redux state
  const getQuantity = (productId: string) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const filteredProducts = (products as Product[]).filter((product) => {
    if (selectedCategory === "All") return true;
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Render Cart Page if view is set to 'cart'
  if (currentView === "cart") {
    return <CartPage onBack={() => setCurrentView("catalog")} />;
  }

  return (
    <div className="pb-24 bg-gray-50 h-[100dvh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {/* Header section */}
      <Header onCartClick={() => setCurrentView("cart")} />

      {/* Banner section */}
      <Banner />

      {/* Main body */}
      <div className="w-full flex p-2 flex-col">
        {/* Category component */}
        <div className="w-full mb-4">
          <Category
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Product section */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                imageUrl={product.imageUrl}
                productName={product.name}
                vendorName={product.store_name}
                price={product.price}
                unit={product.unit}
                quantity={getQuantity(product.id)}
                onQuantityChange={(newQty) =>
                  dispatch(updateQuantity({ product, quantity: newQty }))
                }
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 text-gray-500 text-xs">
              No products found in this category.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <BottomNavBar onCheckoutClick={() => setCurrentView("cart")} />
    </div>
  );
}
