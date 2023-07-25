import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AddCartType } from './types/AddCartType';

// type CartItem = {
//   name: string;
//   id: string;
//   images?: string[];
//   description?: string;
//   unit_amount: number;
//   quantity: number;
// };

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
  toggleCart: () => void;
  // clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  // paymantIntent: string;
  // onCheckout: string;
  // setPaymantIntent: (val: string) => void;
  // setCheckout: (val: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            // remove item from cart
            const filteredCard = state.cart.filter((el) => el.id !== item.id);
            return { cart: filteredCard };
          }
        }),
    }),
    { name: 'cart-store' }
  )
);
