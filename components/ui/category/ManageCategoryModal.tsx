import React, { useCallback, useEffect, useState } from "react";
import { createCategory, updateCategory } from "../../../lib/categoryApi";
import { Category } from "../../../types";
import { ImageUpload } from "../ImageUpload";

interface CategoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCategoryChange: (category: Category) => void;
  category?: Category;
  isEditing?: boolean;
}

export const ManageCategoryModal: React.FC<CategoryModalProps> = (props) => {
  const {
    isOpen,
    onRequestClose,
    onCategoryChange,
    category,
    isEditing = false,
  } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setErrorMessage(null);
      if (name && (image || isEditing)) {
        setIsSubmitting(true);
        try {
          const categoryResult = isEditing
            ? await updateCategory(category?.id, name, image as File)
            : await createCategory(name, image as File);

          onCategoryChange(categoryResult);
          setName("");
          setImage(null);
          setPreview("");
          onRequestClose();
        } catch (error) {
          // @ts-ignore TODO: fix this TS error
          setErrorMessage(error.response?.data.message);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [name, image, onCategoryChange, onRequestClose, isEditing, category]
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [setImage, setPreview]
  );

  useEffect(() => {
    setName(isEditing && category ? category.name : "");
    // setImage(isEditing && category ? category.image : null);
  }, [isEditing, category]);

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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
              <form onSubmit={onSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-headline"
                      >
                        {isEditing
                          ? `Editar categoría ${category?.name} - ID#${category?.id}`
                          : "Crear categoría"}
                      </h3>

                      <div className="mt-5 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-cyan-600 focus-within:border-cyan-600">
                        <label
                          htmlFor="categoryName"
                          className="block text-xs font-medium text-gray-900"
                        >
                          Nombre de la categoría
                        </label>
                        <input
                          type="text"
                          name="categoryName"
                          id="categoryName"
                          required
                          onChange={handleNameChange}
                          value={name} // use the name state as value, not placeholder
                          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        />
                      </div>

                      <ImageUpload
                        id="categoryImage"
                        name="categoryImage"
                        image={image}
                        preview={preview}
                        onImageChange={onImageChange}
                        onImageRemove={() => {
                          setImage(null);
                          setPreview("");
                        }}
                      />
                    </div>
                  </div>
                  {errorMessage && (
                    <p className="mt-4 text-red-500">{errorMessage}</p>
                  )}
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-800 text-base font-medium text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Guardar cambios
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
      )}
    </>
  );
};
