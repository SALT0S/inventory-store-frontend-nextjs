import React, { useState } from "react";
import { createCategory } from "../../../lib/api";
import { Category } from "../../../types";

interface AddCategoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCategoryAdded: (newCategory: Category) => void;
}
export const AddCategoryModal: React.FC<AddCategoryModalProps> = (props) => {
  const { isOpen, onRequestClose, onCategoryAdded } = props;
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null); // Añade esta línea

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (name && image) {
      try {
        const newCategory = await createCategory(name, image);
        console.log(newCategory);
        onCategoryAdded(newCategory);
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }

    setName("");
    setImage(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }

    onRequestClose();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Agregar nueva categoría
                  </h3>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Nombre de la categoría"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Agregar
              </button>
              <button
                onClick={onRequestClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
