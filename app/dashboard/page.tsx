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
    where: { userId: user?.user?.id },
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
      <div className="font-medium">
        {orders.map((order) => (
          <div className="rounded-lg mb-12 bg-gray-100 p-4" key={order.id}>
            <h2>Order Reference: {order.id}</h2>
            <p>Time: {order.createdDate.toLocaleString()}</p>
            <p className="text-md p-y2">
              Status:
              <span
                className={`${
                  order.status === 'complete' ? 'bg-green-500' : 'bg-red-500'
                } text-white px-2 py-1 rounded-md text-sm ml-2`}
              >
                {order.status}
              </span>
            </p>
            <p className="font-medium">Total: {formatPrice(order.amount)}</p>
            <div className="flex gap-8">
              {order.products.map((prod) => (
                <div className="py-2 " key={prod.id}>
                  <h2 className="py-2">{prod.name}</h2>
                  <p>Quantity: {prod.quantity}</p>
                  <p>Price: {formatPrice(prod.unit_amount)}</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={prod.image!}
                      alt={prod.name}
                      width={50}
                      height={50}
                    ></Image>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
