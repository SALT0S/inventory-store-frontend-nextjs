import { PhotoIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
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
  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // new state for error message

  const onSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setErrorMessage(null);
      if (name && image) {
        try {
          const newCategory = await createCategory(name, image);
          onCategoryAdded(newCategory);
          setName("");
          setImage(null);
          setPreview("");
          onRequestClose();
        } catch (error) {
          // @ts-ignore TODO: fix this TS error
          setErrorMessage(error.response?.data.message);
        }
      }
    },
    [name, image, onCategoryAdded, onRequestClose]
  );

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const onImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    },
    []
  );

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  useEffect(() => {
    const preventDefault = (event: DragEvent) => event.preventDefault();
    window.addEventListener("dragover", preventDefault);
    window.addEventListener("drop", preventDefault);
    return () => {
      window.removeEventListener("dragover", preventDefault);
      window.removeEventListener("drop", preventDefault);
    };
  }, []);

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
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
                    Agregar nueva categoría
                  </h3>
                  <div className="mt-8 relative border border-gray-300 rounded-md px-3 py-2 shadow-sm">
                    <label
                      htmlFor="name"
                      className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      onChange={handleNameChange}
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 sm:text-sm"
                      placeholder="Enlatados"
                    />
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Imagen de la categoría
                    </label>
                    {!preview && (
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                          <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                          />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Subir una imagen</span>
                              <input
                                key={preview}
                                onChange={onImageChange}
                                onDrop={onDrop}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">o arrastra y suelta</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PNG, JPG, GIF max 10MB
                          </p>
                        </div>
                      </div>
                    )}
                    {preview && (
                      <div className="mt-4">
                        <Image
                          src={preview}
                          alt="Preview"
                          width={500}
                          height={250}
                          className="rounded-md"
                        />
                        <button
                          onClick={() => {
                            setImage(null);
                            setPreview("");
                          }}
                          type="button"
                          className="mt-2 w-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        >
                          Eliminar imagen
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {errorMessage && (
                <p className="mt-4 text-red-500">{errorMessage}</p>
              )}
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
