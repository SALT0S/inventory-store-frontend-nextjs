import { NextPage, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { GeneralLayout } from '../../components/layouts';
import ProductsTable from '../../components/ui/ProductsTable';
import CategoriesTable from '../../components/ui/CategoriesTable';
import axios from '../../lib/axios';

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
  };
}

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

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

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const productsResponse = await axios.get('/products');
    const categoriesResponse = await axios.get('/categories');
    const products: Product[] = productsResponse.data;
    const categories: Category[] = categoriesResponse.data;

    return {
      props: {
        products,
        categories,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        products: [],
        categories: [],
      },
    };
  }
};

export default ManagePage;
