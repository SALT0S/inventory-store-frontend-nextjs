import { useState } from 'react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { GeneralLayout } from '../components/layouts';
import axios  from '../lib/axios';
import {ProductCard} from "../components/ui/ProductCard";

interface Product {
  id: number;
  category_id: number;
  name: string;
  brand: string;
  weight: string;
  purchase_price: number;
  sale_price: number;
  stock: number;
  category: {
    name: string;
  }
  image: string;
}

interface Props {
  inventory: Product[];
}

const HomePage: NextPage<Props> = ({ inventory }) => {
  return (
    <GeneralLayout>
      <NextSeo title='Inventario UG' />
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Navega en nuestros productos</h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          <ProductCard products={inventory} />
        </div>
    </GeneralLayout>
  );
};

export async function getStaticProps() {
  const { data } = await axios.get('/products');

  return {
    props: {
      inventory: data,
    },
  };
}

export default HomePage;
