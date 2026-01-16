import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // دالة مقارنة مرنة للعناصر (تدعم selectedSize كـ obj أو كقيمة بسيطة)
  const sameItem = (a, b) => {
    const sizeA = a?.selectedSize?.id ?? a?.selectedSize;
    const sizeB = b?.selectedSize?.id ?? b?.selectedSize;
    const colorA = a?.selectedColor?.id ?? a?.selectedColor;
    const colorB = b?.selectedColor?.id ?? b?.selectedColor;

    return (
      a.id === b.id &&
      String(sizeA ?? '') === String(sizeB ?? '') &&
      String(colorA ?? '') === String(colorB ?? '')
    );
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => sameItem(item, product));

    if (existing) {
      setCart((prev) =>
        prev.map((item) =>
          sameItem(item, product)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  // يدعم تمرير رقم (id) للتماشي مع النداءات القديمة — أو تمرير المنتج نفسه لتمييز بالمقاس/اللون
  const removeFromCart = (productOrId) => {
    if (typeof productOrId === 'number') {
      setCart((prev) => prev.filter((item) => item.id !== productOrId));
      return;
    }
    setCart((prev) => prev.filter((item) => !sameItem(item, productOrId)));
  };

  const increaseQuantity = (productOrId) => {
    if (typeof productOrId === 'number') {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productOrId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        sameItem(item, productOrId)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productOrId) => {
    if (typeof productOrId === 'number') {
      setCart((prev) =>
        prev
          .map((item) =>
            item.id === productOrId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(Boolean)
      );
      return;
    }

    setCart((prev) =>
      prev
        .map((item) => {
          if (!sameItem(item, productOrId)) return item;
          if (item.quantity > 1) return { ...item, quantity: item.quantity - 1 };
          return null; // لو الكمية هتبقى 0 نحذف العنصر
        })
        .filter(Boolean)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
