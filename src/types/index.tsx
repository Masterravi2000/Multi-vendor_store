export interface Product {
  id: string;
  store_id: string;
  store_name: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  imageUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}