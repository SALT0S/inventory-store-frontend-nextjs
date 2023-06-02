import React from 'react';
import Link from 'next/link';
import Image from "next/image";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Props {
  category: Category;
}

const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <div className="group relative mb-8">
      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-200 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
        <Image src={`http://api.inventory-store.test/images/${category.image}`} alt={category.name} width={500} height={500} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-base font-semibold text-gray-900">
        <Link href={`/categorias/${category.id}`}>
          <span className="absolute inset-0" />
          {category.name}
        </Link>
      </h3>
    </div>
  );
};

export default CategoryCard;
