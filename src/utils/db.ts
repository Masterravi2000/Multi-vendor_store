export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('StoreDB', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('cartStore');
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveCartToDB = async (items: any[]) => {
  const db = await initDB();
  db.transaction('cartStore', 'readwrite')
    .objectStore('cartStore')
    .put(items, 'cartItems'); // 'cartItems' is our key
};

export const loadCartFromDB = async (): Promise<any[]> => {
  const db = await initDB();
  return new Promise((resolve) => {
    const request = db.transaction('cartStore', 'readonly')
      .objectStore('cartStore')
      .get('cartItems');
    request.onsuccess = () => resolve(request.result || []);
  });
};