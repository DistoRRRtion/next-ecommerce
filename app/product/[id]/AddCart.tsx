'use client';

import { useCartStore } from '@/store';
import { AddCartType } from '@/types/AddCartType';
import { useState } from 'react';

export default function AddCard({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  // const [added, setAdded] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ id, image, unit_amount, quantity, name });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="my-4 btn btn-primary w-full"
        disabled={added}
      >
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart 🚀</span>}
      </button>
    </>
  );
}
