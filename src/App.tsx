import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './app/store';
import { setCart } from './features/cart/cartSlice';
import { loadCartFromDB, saveCartToDB } from './utils/db';
import Catalog from './pages/Catalog';

function App() {
  const dispatch = useDispatch();
  const { items, isLoaded } = useSelector((state: RootState) => state.cart);
  const isFirstRender = useRef(true);

  // 1. Load from IndexedDB on mount
  useEffect(() => {
    loadCartFromDB().then((savedCart) => {
      dispatch(setCart(savedCart));
    });
  }, [dispatch]);

  // 2. Auto-save to IndexedDB whenever items change (skip first render to avoid overwriting)
  useEffect(() => {
    if (isLoaded) {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      saveCartToDB(items);
    }
  }, [items, isLoaded]);

  if (!isLoaded) return null; // Or a subtle loading spinner

  return (
    <div className="bg-white shadow-xl min-h-screen relative overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Catalog />} />
      </Routes>
    </div>
  );
}

export default App;