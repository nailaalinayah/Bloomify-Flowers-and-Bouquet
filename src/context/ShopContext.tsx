
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

type CartItem = {
  flowerId: number;
  quantity: number;
};

type ShopContextType = {
  favorites: number[];
  cart: CartItem[];
  toggleFavorite: (id: number) => void;
  addToCart: (id: number, quantity?: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const addToCart = (id: number, quantity = 1) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.flowerId === id);

      if (existing) {
        return previous.map((item) =>
          item.flowerId === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...previous, { flowerId: id, quantity }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((previous) =>
        previous.filter((item) => item.flowerId !== id)
      );
      return;
    }

    setCart((previous) =>
      previous.map((item) =>
        item.flowerId === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart((previous) =>
      previous.filter((item) => item.flowerId !== id)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <ShopContext.Provider
      value={{
        favorites,
        cart,
        toggleFavorite,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop harus digunakan di dalam ShopProvider');
  }

  return context;
}
