import Image from "next/image";
import Link from "next/link";
import React from "react";
import CategoryPromoSectionBG from "../../../public/assets/category-promo-section-01.jpg";
import { Category } from "../../../types";

interface Props {
  categories: Category[];
}

export const CategoryPromoSection: React.FC<Props> = ({ categories }) => {
  if (!categories || !Array.isArray(categories) || categories.length < 3) {
    return null;
  }

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="hidden absolute inset-0 sm:flex sm:flex-col"
      >
        <div className="flex-1 relative w-full bg-gray-800">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={CategoryPromoSectionBG}
              alt="category promo section"
              width={1440}
              height={678}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gray-900 opacity-50" />
        </div>
        <div className="w-full bg-white h-32 md:h-40 lg:h-48" />
      </div>

      <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col sm:hidden"
        >
          <div className="flex-1 relative w-full bg-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={CategoryPromoSectionBG}
                alt="category promo section"
                width={768}
                height={432}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 opacity-50" />
          </div>
          <div className="w-full bg-white h-48" />
        </div>
        <div className="relative py-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Nueva categoría de productos
          </h1>
          <div className="mt-4 sm:mt-6">
            <Link
              href="/categorias"
              className="inline-block bg-sky-800 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-sky-700"
            >
              Comprar ahora
            </Link>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="collection-heading"
        className="-mt-96 relative sm:mt-0"
      >
        <h2 id="collection-heading" className="sr-only">
          Categorias
        </h2>
        <div className="max-w-md mx-auto grid grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:px-6 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:px-8 lg:gap-x-8">
          {categories.slice(0, 3).map((category) => (
            <div
              key={category.id}
              className="group relative h-96 bg-white rounded-lg shadow-xl sm:h-auto sm:aspect-w-4 sm:aspect-h-5"
            >
              <div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                    <Image
                      src={`http://api.inventory-store.test/images/${category.image}`}
                      alt={category.name}
                      width={500}
                      height={500}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                </div>
                <div className="absolute inset-0 rounded-lg p-6 flex items-end">
                  <div>
                    <p aria-hidden="true" className="text-sm text-white">
                      Compra ahora
                    </p>
                    <h3 className="mt-1 font-semibold text-white">
                      <Link href={`/categorias/${category.id}`}>
                        <span className="absolute inset-0" />
                        {category.name}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
