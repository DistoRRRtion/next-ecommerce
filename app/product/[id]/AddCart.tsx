'use client';

import { useCartStore } from '@/store';
import { AddCartType } from '@/types/AddCartType';

export default function AddCard({
  name,
  id,
  image,
  unit_amount,
  quantity,
}: AddCartType) {
  const cartStore = useCartStore();
  // const [added, setAdded] = useState(false);

  return (
    <>
      <button
        onClick={() =>
          cartStore.addProduct({ id, image, unit_amount, quantity, name })
        }
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-500"
      >
        Add to cart
      </button>
    </>
  );
}
