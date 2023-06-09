import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { GeneralLayout } from "../../components/layouts/GeneralLayout";
import { ProductCard } from "../../components/ui/products/ProductCard";
import axios from "../../lib/axios";
import { Category, Product } from "../../types";

interface Props {
  products: Product[];
  category: Category;
}

const CategoryPage: NextPage<Props> = ({ category, products }) => {
  return (
    <GeneralLayout>
      <NextSeo title={`Categoria ${category.name}`} />
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Categoria - {category.name}
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
        <ProductCard products={products} />
      </div>
    </GeneralLayout>
  );
};

export async function getStaticPaths() {
  const { data } = await axios.get("/categories");

  return {
    fallback: false,
    paths: data.map((category: Category) => ({
      params: { id: category.id.toString() },
    })),
  };
}

// @ts-ignore
export async function getStaticProps({ params }) {
  const { data: products } = await axios.get(
    `/products?category_id=${params.id}`
  );
  const { data: category } = await axios.get(`/categories/${params.id}`);

  return {
    props: {
      products,
      category,
    },
  };
}

export default CategoryPage;
