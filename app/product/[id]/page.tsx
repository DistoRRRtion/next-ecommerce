import Image from 'next/image';
import { SearchParamTypes } from '@/types/SearchParamTypes';
import formatPrice from '@/util/PriceFormat';
import AddCard from './AddCart';

export default async function Product({ searchParams }: SearchParamTypes) {
  // console.log(searchParams);

  return (
    <div className="flex flex-col justify-between gap-24 p-23 text-gray-700 xl:flex-row ">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={400}
        height={400}
        className="object-cover"
      />
      <div className="font-medium text-gray-600">
        <h1 className="text-2xl  py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div>
          <p className="font-bold text-teal-600">
            {searchParams.unit_amount && formatPrice(searchParams.unit_amount)}
          </p>
        </div>
        {/* <button className="bg-teal-600 text-white py-2 px-6 my-10 rounded-md">
          Add To Card
        </button> */}
        <AddCard {...searchParams} />
      </div>
    </div>
  );
}
