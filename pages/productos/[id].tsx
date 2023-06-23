import { NextSeo } from "next-seo";
import Image from "next/image";
import React from "react";
import { GeneralLayout } from "../../components/layouts/GeneralLayout";
import axios from "../../lib/axios";
import { Product } from "../../types";

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  return (
    <GeneralLayout>
      <NextSeo title={`Producto ${product.name}`} />
      <div className="py-16 sm:py-24">
        <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          <div className="lg:row-end-1 lg:col-span-4">
            <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
              <Image
                src={`http://api.inventory-store.test/images/${product.image}`}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Product details */}
          <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {product.name} - {product.brand}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                {/*<p className="text-sm text-gray-500 mt-2">
                  {product.category.name}
                </p>*/}
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
              </div>
            </div>

            <p className="text-gray-500 mt-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At,
              ipsa, praesentium? Accusamus earum ipsam molestias repellendus
              temporibus. Ab commodi cum delectus eligendi eos ex explicabo
              laborum libero non, quam quos, rem repellendus veniam? Eaque error
              ipsum iste iure obcaecati? Esse?
            </p>
            <button
              type="button"
              className="w-full mt-10 bg-sky-700 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
            >
              Pagar ${product.sale_price} USD
            </button>

            <div className="border-t border-gray-200 mt-10 pt-10">
              <h3 className="text-sm font-medium text-gray-900">
                Más sobre nuestro producto
              </h3>
              <div className="mt-4 prose prose-sm text-gray-500">
                <ul role="list">
                  <li>Peso del producto {product.weight}</li>
                  <li>Productos disponibles {product.stock}</li>
                  <li>Valor de distribuidor ${product.purchase_price}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
};

export async function getStaticPaths() {
  const { data } = await axios.get("/products");

  return {
    fallback: false,
    paths: data.map((product: Product) => ({
      params: { id: product.id.toString() },
    })),
  };
}

// @ts-ignore
export async function getStaticProps({ params }) {
  const { data } = await axios.get(`/products/${params.id}`);

  return {
    props: {
      product: data,
    },
  };
}

export default ProductDetails;
