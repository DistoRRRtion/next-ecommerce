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
import DarkLight from './DarkLight';

export default function Nav({ user }: Session) {
  const cartStore = useCartStore();
  return (
    <>
      <nav className="flex justify-between items-center py-8">
        <Link href={'/'}>
          <h1 className="font-roboto">Logo</h1>
        </Link>
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
                  className="bg-primary text-white text-sm font-medium w-7 h-7 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
                >
                  {cartStore.cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </li>

          {/*Dark mode*/}
          <li>
            <DarkLight />
          </li>

          {/*if user is not signed in */}
          {!user && (
            <li className="bg-primary text-white px-4 py-2 rounded-md">
              <button onClick={() => signIn()}>Sign in</button>
            </li>
          )}

          {/*if user is signed in*/}
          {user && (
            <>
              <li>
                <div className="dropdown dropdown-end cursor-pointer">
                  <Image
                    className="rounded-full"
                    src={user?.image as string}
                    alt={user.name as string}
                    width={48}
                    height={48}
                    tabIndex={0}
                  />
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72"
                  >
                    <Link
                      className="hover:bg-base-300 rounded-md p-4"
                      href={'/dashboard'}
                      onClick={() => {
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                      }}
                    >
                      Orders
                    </Link>
                    <li
                      className="hover:bg-base-300 rounded-md p-4"
                      onClick={() => {
                        if (document.activeElement instanceof HTMLElement) {
                          document.activeElement.blur();
                        }
                        signOut();
                      }}
                    >
                      Sign Out
                    </li>
                  </ul>
                </div>
              </li>
            </>
          )}
        </ul>
        <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
      </nav>
    </>
  );
}
