'use client';

import Image from 'next/image';
import { useCartStore } from '@/store';
import formatPrice from '@/util/PriceFormat';

export default function Cart() {
  const cartStore = useCartStore();
  // console.log(cartStore);
  return (
    <div
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        <h1>Here's your shopping list 📃</h1>
        {cartStore.cart.map((el) => (
          <div key={el.id} className="flex p-4 gap-4">
            <Image
              src={el.image}
              alt={el.name}
              width={100}
              height={100}
              className="rounded-md h-24"
            />
            <div>
              <h2>{el.name}</h2>
              <h2>Quantity: {el.quantity}</h2>
              <p>{el.unit_amount && formatPrice(el.unit_amount)}</p>
            </div>
          </div>
        ))}
        <button className="py-2 mt-4 bg-teal-600 w-full rounded-md text-white">
          Checkout
        </button>
      </div>
    </div>
  );
}
