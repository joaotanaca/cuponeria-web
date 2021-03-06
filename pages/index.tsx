import Head from 'next/head';
import React from 'react';
import { ProductI } from 'src/interfaces/products';
import { ContainerProducts } from 'styles/pages';
import CardProduct from 'src/components/CardProduct';
import api from 'src/services/api';
import { useProducts } from 'src/contexts/Products';

interface HomeProps {
  data: ProductI[];
}

export default function Home({ data }: HomeProps) {
  const { filterProducts } = useProducts();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <ContainerProducts>
        {filterProducts(data).map(({ image, price, title, id, category }) => (
          <CardProduct
            key={id}
            image={image}
            price={price}
            title={title}
            link={`/product/${category}/${title}/${id}`}
          />
        ))}
      </ContainerProducts>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await api.get('/products');
  return {
    props: {
      data,
    },
  };
}
