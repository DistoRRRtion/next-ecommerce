import Image from 'next/image';
import { SearchParamTypes } from '@/types/SearchParamTypes';
import formatPrice from '@/util/PriceFormat';
import AddCard from './AddCart';

export default async function Product({ searchParams }: SearchParamTypes) {
  // console.log(searchParams);

  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-24">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={800}
        height={800}
        className="object-cover w-68 xl:w-1/2"
      />
      <div className="font-medium">
        <h1 className="text-2xl  py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div>
          <p className="font-bold text-primary">
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
