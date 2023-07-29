'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import dance from '@/public/dance.gif';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { useEffect } from 'react';

export default function OrderConfirmed() {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent('');
    cartStore.clearCart();
  }, []);

  const checkoutOrder = () => {
    setTimeout(() => {
      cartStore.setCheckout('cart');
    }, 1000);
    cartStore.toggleCart();
  };

  return (
    <motion.div
      className="flex items-center justify-center my-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="p-12 text-center ">
        <h1 className="text-2xl">Your order has been placed ✅</h1>
        <h2 className="font-sm my-3">Check your email for the receipt.</h2>
        <Image
          src={dance}
          alt="dancing"
          width={500}
          height={500}
          className="py-8 "
        />
        <div className="flex justify-center gap-12">
          <Link href={'/dashboard'}>
            <button onClick={checkoutOrder}>Check your order</button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
