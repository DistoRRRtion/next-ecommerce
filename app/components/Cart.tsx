'use client';

import Image from 'next/image';
import { useCartStore } from '@/store';
import formatPrice from '@/util/PriceFormat';
import {
  IoAddCircle,
  IoRemoveCircle,
  IoArrowUndoOutline,
  IoBasketOutline,
} from 'react-icons/io5';
import basket from '@/public/pngaaa.com-293011.png';
import { motion, AnimatePresence } from 'framer-motion';
import Checkout from './Checkout';
import OrderConfirmed from './OrderConfirmed';

export default function Cart() {
  const cartStore = useCartStore();

  // total price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-full lg:w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        {cartStore.onCheckout === 'cart' && (
          <button
            onClick={() => cartStore.toggleCart()}
            className="text-sm font-bold pb-12 flex gap-2"
          >
            <IoArrowUndoOutline />
            Back to store
          </button>
        )}

        {cartStore.onCheckout === 'checkout' && (
          <button
            onClick={() => cartStore.setCheckout('cart')}
            className="text-sm font-bold pb-12 flex gap-2"
          >
            Check your cart
            <IoBasketOutline />
          </button>
        )}

        {/* Cart Items */}
        {cartStore.onCheckout === 'cart' && (
          <>
            {cartStore.cart.map((el) => (
              <motion.div layout key={el.id} className="flex p-4 gap-4">
                <Image
                  src={el.image}
                  alt={el.name}
                  width={100}
                  height={100}
                  className="rounded-md h-24"
                />
                <div>
                  <h2>{el.name}</h2>
                  <div className="flex gap-3">
                    <h2>Quantity: {el.quantity}</h2>
                    <button
                      className="text-2xl"
                      onClick={() =>
                        cartStore.removeProduct({
                          id: el.id,
                          image: el.image,
                          name: el.name,
                          unit_amount: el.unit_amount,
                          quantity: el.quantity,
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>
                    <button
                      className="text-2xl"
                      onClick={() =>
                        cartStore.addProduct({
                          id: el.id,
                          image: el.image,
                          name: el.name,
                          unit_amount: el.unit_amount,
                          quantity: el.quantity,
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>
                  <p>{el.unit_amount && formatPrice(el.unit_amount)}</p>
                </div>
              </motion.div>
            ))}
          </>
        )}

        <motion.div layout>
          {cartStore.cart.length > 0 && cartStore.onCheckout === 'cart' ? (
            <button
              onClick={() => cartStore.setCheckout('checkout')}
              className="py-2 mt-4 bg-teal-600 w-full rounded-md text-white"
            >
              Checkout: {formatPrice(totalPrice)}
            </button>
          ) : null}
        </motion.div>

        {/* checkout form */}
        {cartStore.onCheckout === 'checkout' && <Checkout />}
        {cartStore.onCheckout === 'success' && <OrderConfirmed />}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === 'cart' && (
            <motion.div
              initial={{ scale: 0, rotateZ: -50, opacity: 0 }}
              animate={{ scale: 1, rotateZ: 0, opacity: 1 }}
              exit={{ scale: 0, rotateZ: -100, opacity: 0 }}
              className="flex flex-col items-center gap-12 text-2xl pt-64"
            >
              <h1>Uhhh ohhh... it's empty</h1>
              <Image src={basket} alt="empty cart" width={200} height={200} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
