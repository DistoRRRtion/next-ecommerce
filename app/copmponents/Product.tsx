import Image from 'next/image';

export default function Product({ name, image, price }) {
  return (
    <>
      <Image src={image} alt={name} width={300} height={300} />
      <h1>{name}</h1>
      <p>{price} $</p>
    </>
  );
}
