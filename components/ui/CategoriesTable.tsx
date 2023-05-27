import React, {useState} from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import axios from '../../lib/axios';
import AddCategoryModal from './AddCategoryModal';

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  categories: Category[];
}

const CategoriesTable: React.FC<Props> = ({ categories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/categories/${id}`);
      const response = await axios.get('/categories');
      const updatedCategories: Category[] = response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (id: number) => {
    // Lógica para editar una categoría
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div className="flex flex-col mb-8">
        <div className="py-2 align-middle inline-block min-w-full">
          <div className="pb-6 flex justify-between">
            <h2 className="text-xl font-semibold">Tabla de Categorias</h2>
            <button
              onClick={handleOpenModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Agregar categoría
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
                  Fecha de creación
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha de actualización
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Acciones
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.created_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.updated_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(category.id)}
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

      <AddCategoryModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default CategoriesTable;
