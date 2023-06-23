import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../../../types";

interface Props {
  products: Product[];
}

export const ProductCard: React.FC<Props> = ({ products }) => {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="group relative mb-8">
          <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
            <Image
              src={`http://api.inventory-store.test/images/${product.image}`}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">
            <Link href={`/productos/${product.id}`}>
              <span className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          {/*<p className="mt-1 text-sm text-gray-500">{product.category.name}</p>*/}
          <p className="mt-1 text-sm font-medium text-gray-900">
            ${product.sale_price}
          </p>
        </div>
      ))}
    </>
  );
};
