'use client';

import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Cart from './Cart';
import { useCartStore } from '@/store';
import { AiFillShopping } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  return (
    <>
      <nav className="flex justify-between items-center py-8">
        <Link href={'/'}>Logo</Link>
        <ul className="flex gap-12 items-center">
          {/*Togle the card*/}
          <li
            onClick={() => cartStore.toggleCart()}
            className="flex items-center text-3xl relative cursor-pointer"
          >
            <AiFillShopping />
            <AnimatePresence>
              {cartStore.cart.length > 0 && (
                <motion.span
                  animate={{ scale: 1 }}
                  initial={{ scale: 0 }}
                  // exit={{ scale: 0 }}
                  className="bg-teal-500 text-white text-sm font-medium w-7 h-7 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
                >
                  {cartStore.cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </li>

          {/*if user is not signed in */}
          {!user && (
            <li className="bg-teal-600 text-white px-4 py-2 rounded-md">
              <button onClick={() => signIn()}>Sign in</button>
            </li>
          )}

          {/*if user is signed in*/}
          {user && (
            <>
              <li className="bg-red-500 text-white px-4 py-2 rounded-md">
                <button onClick={() => signOut()}>Sign Out</button>
              </li>
              <li>
                <Image
                  className="rounded-full"
                  src={user?.image as string}
                  alt={user.name as string}
                  width={48}
                  height={48}
                />
              </li>
            </>
          )}
        </ul>
        <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
      </nav>
    </>
  );
}
