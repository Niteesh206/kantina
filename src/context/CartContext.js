import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((prevCart) => {
      const stallItems = prevCart[item.stallId] || [];
      const existingItem = stallItems.find((i) => i.id === item.id);

      if (existingItem) {
        // Update quantity for existing item
        return {
          ...prevCart,
          [item.stallId]: stallItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      // Add new item
      return {
        ...prevCart,
        [item.stallId]: [...stallItems, { ...item, quantity: 1 }],
      };
    });
  };

  const decreaseQuantity = (itemId, stallId) => {
    setCart((prevCart) => {
      const stallItems = prevCart[stallId] || [];
      const updatedItems = stallItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );

      // Remove items with quantity 0
      return {
        ...prevCart,
        [stallId]: updatedItems.filter((item) => item.quantity > 0),
      };
    });
  };

  // Mock implementation of saveOrder
  const saveOrder = () => {
    const orderId = `ORD${Math.floor(Math.random() * 1000000)}`; // Generate random order ID
    setCart({}); // Clear the cart after saving the order
    return { orderId };
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, saveOrder }}>
      {children}
    </CartContext.Provider>
  );
};
