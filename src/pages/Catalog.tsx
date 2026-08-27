import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../app/store';
import { updateQuantity } from '../features/cart/cartSlice';
import ProductCard from '../features/products/components/ProductCard';
import products from '../data/mockProducts.json';
import type { Product } from '../types';

export default function Catalog() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Derive the current quantity from Redux state
  const getQuantity = (productId: string) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">

      <div className='w-full bg-white justify-center align-center flex flex-col'>
        <div className='w-full aspect-[4/2] rounded-lg bg-purple-500'>

        </div>
      </div>

      <h1 className="text-xl font-bold mb-4 text-gray-900">Store Catalog</h1>
      
      {/* Changed to a grid to better suit your ProductCard design */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {(products as Product[]).map((product) => (
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
        ))}
      </div>
    </div>
  );
}