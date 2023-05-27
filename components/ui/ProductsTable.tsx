import React from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
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

interface Props {
  products: Product[];
}

const ProductsTable: React.FC<Props> = ({ products }) => {
  const handleDelete = async (id: number) => {
    try {
      // Realiza una llamada a la API para eliminar el producto con el ID proporcionado
      await axios.delete(`/products/${id}`);

      // Realiza una nueva solicitud para obtener la lista actualizada de productos después de eliminar
      const response = await axios.get('/products');
      const updatedProducts: Product[] = response.data;

      // Actualiza el estado o realiza cualquier otra acción necesaria con los productos actualizados
      // ...

    } catch (error) {
      console.error('Error deleting product:', error);
      // Maneja el error de acuerdo a tus necesidades
    }
  };


  const handleEdit = (id: number) => {
    // Lógica para editar un producto
  };

  return (
    <div className="flex flex-col">
      <div className="py-2 align-middle inline-block min-w-full">
        <div className="pb-6 flex justify-between">
          <h2 className="text-xl font-semibold">Tabla de Productos</h2>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Agregar producto
          </button>
        </div>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Marca
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Peso
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Precio de compra
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Precio de venta
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Categoría
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Acciones
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.purchase_price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sale_price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="text-indigo-600 hover:text-indigo-900 ml-3"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
