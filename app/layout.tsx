import './globals.css';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import Nav from './components/Nav';

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
    <html lang="en">
      <body className="mx-64">
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </body>
    </html>
  );
}
