import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { products } from '../data/products';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'shopsphere-cart';

function validateCartItem(item) {
  // Check if product still exists
  const product = products.find((p) => p.id === item.id);
  if (!product) return null;
  
  // Validate quantity doesn't exceed current stock
  const validQuantity = Math.min(item.quantity, product.stock);
  if (validQuantity <= 0) return null; // Remove if stock is 0
  
  return { ...item, quantity: validQuantity, stock: product.stock };
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CART': {
      // Validate all items when loading from storage
      const validatedItems = action.payload.items
        .map(validateCartItem)
        .filter((item) => item !== null);
      return { items: validatedItems };
    }
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.min(item.quantity + action.payload.quantity, action.payload.stock) }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload }],
      };
    }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: Math.max(1, Math.min(action.payload.quantity, item.stock)),
                }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo(() => {
    const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const shipping = subtotal > 0 ? (subtotal >= 150 ? 0 : 12.99) : 0;
    const tax = subtotal * 0.13;
    const total = subtotal + shipping + tax;

    return {
      items: state.items,
      itemCount,
      subtotal,
      shipping,
      tax,
      total,
      addToCart: (product, quantity = 1) =>
        dispatch({
          type: 'ADD_ITEM',
          payload: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            stock: product.stock,
            category: product.category,
            quantity,
          },
        }),
      updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
