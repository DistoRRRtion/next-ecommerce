'use client';

import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Nav({ user }: Session) {
  return (
    <>
      <nav className="flex justify-between items-center py-8">
        <Link href={'/'}>Logo</Link>
        <ul className="flex gap-12 items-center">
          {!user && (
            <li className="bg-teal-600 text-white px-4 py-2 rounded-md">
              <button onClick={() => signIn()}>Sign in</button>
            </li>
          )}
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
      </nav>
    </>
  );
}
