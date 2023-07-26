import './globals.css';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Nav from './components/Nav';
import Hydrate from './components/Hydrate';
import { Roboto, Lobster_Two } from 'next/font/google';

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });

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
      <body className={`mx-64 ${roboto.className} `}>
        <Hydrate>
          <Nav user={session?.user} expires={session?.expires as string} />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
