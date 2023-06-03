import { GetServerSideProps, NextPage } from "next";
import { NextSeo } from "next-seo";
import { GeneralLayout } from "../../components/layouts/GeneralLayout";
import { CategoriesTable } from "../../components/ui/category/CategoriesTable";
import ProductsTable from "../../components/ui/products/ProductsTable";
import axios from "../../lib/axios";
import { Category, Product } from "../../types";

interface Props {
  products: Product[];
  categories: Category[];
}

const ManagePage: NextPage<Props> = ({ products, categories }) => {
  return (
    <GeneralLayout>
      <NextSeo title="Gestionar productos y categorías" />
      <CategoriesTable categories={categories} />
      <ProductsTable products={products} />
    </GeneralLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const productsResponse = await axios.get("/products");
    const categoriesResponse = await axios.get("/categories");
    const products: Product[] = productsResponse.data;
    const categories: Category[] = categoriesResponse.data;

    return {
      props: {
        products,
        categories,
      },
    };
  } catch (error) {
    return {
      props: {
        products: [],
        categories: [],
      },
    };
  }
};

export default ManagePage;
