import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { GeneralLayout } from "../components/layouts/GeneralLayout";
import { CategoryPromoSection } from "../components/ui/category/CategoryPromoSection";
import { ProductCard } from "../components/ui/products/ProductCard";
import axios from "../lib/axios";
import { Category, Product } from "../types";

interface Props {
  products: Product[];
  categories: Category[];
}

const HomePage: NextPage<Props> = ({ products, categories }) => {
  return (
    <GeneralLayout>
      <NextSeo title="Inventario UG" />

      <CategoryPromoSection categories={categories} />

      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Navega en nuestros productos
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        <ProductCard products={products} />
      </div>
    </GeneralLayout>
  );
};

export async function getStaticProps() {
  const { data: products } = await axios.get("/products");
  const { data: categories } = await axios.get("/categories");

  return {
    props: {
      products,
      categories,
    },
  };
}

export default HomePage;
