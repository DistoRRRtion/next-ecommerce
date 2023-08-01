import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import formatPrice from '@/util/PriceFormat';
import Image from 'next/image';

export const revalidate = 0;

const fetchOrders = async () => {
  const prisma = new PrismaClient();

  const user = await getServerSession(authOptions);

  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: { userId: user?.user?.id, status: 'complete' },
    include: { products: true },
  });

  return orders;
};

export default async function Dashboard() {
  const orders = await fetchOrders();

  if (orders === null) {
    return (
      <div>
        <h1>You need to be logged in to view your orders</h1>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div>
        <h1>Not Orders</h1>
      </div>
    );
  }

  return (
    <div>
      <div>
        {orders.map((order) => (
          <div
            className="rounded-lg my-8 bg-base-200 p-4 space-y-2"
            key={order.id}
          >
            <h2 className="text-xs font-medium">Order Reference: {order.id}</h2>
            <p className="text-xs">
              Status:
              <span
                className={`${
                  order.status === 'complete' ? 'bg-green-500' : 'bg-orange-500'
                } text-white px-2 py-1 rounded-md text-sm ml-2`}
              >
                {order.status}
              </span>
            </p>
            <p className="text-xs">
              Time: {order.createdDate.toLocaleString()}
            </p>
            <div className="text-sm lg:flex gap-8 items-center">
              {order.products.map((prod) => (
                <div className="py-2" key={prod.id}>
                  <h2 className="py-2">{prod.name}</h2>
                  <div className="flex gap-6 items-center">
                    <Image
                      src={prod.image!}
                      alt={prod.name}
                      width={50}
                      height={50}
                    ></Image>
                    <p>Price: {formatPrice(prod.unit_amount)}</p>
                    <p>Quantity: {prod.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-medium">Total: {formatPrice(order.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
