import { useState } from 'react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { GeneralLayout } from '../../components/layouts';
import axios  from '../../lib/axios';
import {ProductCard} from "../../components/ui/ProductCard";
import CategoryCard from "../../components/ui/CategoryCard";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Props {
  categories: Category[];
}

const CategoryHomePage: NextPage<Props> = ({ categories }) => {
  return (
    <GeneralLayout>
      <NextSeo title='Categorias' />
      <h2 className="text-2xl font-bold text-gray-900">Categorias</h2>

      <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </GeneralLayout>
  );
};

export async function getStaticProps() {
  const { data } = await axios.get('/categories');

  return {
    props: {
      categories: data,
    },
  };
}

export default CategoryHomePage;
