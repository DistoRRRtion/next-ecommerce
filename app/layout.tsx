import './globals.css';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Nav from './components/Nav';
import Hydrate from './components/Hydrate';
import { Roboto, Lobster_Two } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});
// const lobster = Lobster_Two({
//   weight: ['700'],
//   subsets: ['latin'],
//   variable: '--font-lobster',
// });

export const metadata = {
  title: 'econ',
  description: 'econ next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //fetch the user
  const session = await getServerSession(authOptions);
  // console.log(session);

  return (
    <html className={`${roboto.className}`} lang="en">
      <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </Hydrate>
    </html>
  );
}
