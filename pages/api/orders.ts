import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { prisma } from '@/util/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // получаем пользователя
      const user = await getServerSession(req, res, authOptions);
      if (!user) {
        res.status(403).json({ message: 'Not logged in' });
      }

      // получаем заказы пользователя
      const orders = await prisma.order.findMany({
        where: {
          userId: user?.user?.id,
        },
        include: {
          products: true,
        },
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch orders' });
      console.log(err, '💥');
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Methods not allowed');
  }
}
