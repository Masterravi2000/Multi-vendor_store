import products from '../data/mockProducts.json';
import type { Product } from '../types';

export default function Catalog() {
  return (
    <div className="p-4 pb-24 bg-white min-h-screen">
      <h1 className="text-xl font-bold mb-4">Store Catalog</h1>
      
      <div className="flex flex-col gap-4">
        {(products as Product[]).map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-sm flex justify-between items-center bg-gray-50">
            <div>
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.store_name}</p>
              <p className="text-sm text-gray-400">{product.unit}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-green-600">₹{product.price}</span>
              <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded-md text-sm">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}