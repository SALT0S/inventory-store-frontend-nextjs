import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../lib/api";
import { addProduct } from "../../../lib/slices/productSlice";

interface AddProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = (props) => {
  const { isOpen, onRequestClose } = props;

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [weight, setWeight] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      categoryId &&
      name &&
      brand &&
      weight &&
      purchasePrice &&
      salePrice &&
      stock &&
      image
    ) {
      const newProduct = await createProduct(
        categoryId,
        name,
        brand,
        weight,
        purchasePrice,
        salePrice,
        stock,
        image
      );
      dispatch(addProduct(newProduct));
    }

    // Reset fields and close modal
    setCategoryId("");
    setName("");
    setBrand("");
    setWeight("");
    setPurchasePrice("");
    setSalePrice("");
    setStock("");
    setImage(null);
    onRequestClose();
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryId(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(event.target.value);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handlePurchasePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPurchasePrice(event.target.value);
  };

  const handleSalePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSalePrice(event.target.value);
  };

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStock(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file ? file : null);
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
                    Agregar producto
                  </h3>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="category"
                      >
                        Categoría
                      </label>
                      <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                      >
                        <option value="">Selecciona una categoría</option>
                        <option value="1">Categoría 1</option>
                        <option value="2">Categoría 2</option>
                        <option value="3">Categoría 3</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        Nombre
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Nombre del producto"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="brand"
                      >
                        Marca
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="brand"
                        type="text"
                        placeholder="Marca del producto"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="weight"
                      >
                        Peso
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="weight"
                        type="text"
                        placeholder="Peso del producto"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="purchase_price"
                      >
                        Precio de compra
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="purchase_price"
                        type="text"
                        placeholder="Precio de compra del producto"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="sale_price"
                      >
                        Precio de venta
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="sale_price"
                        type="text"
                        placeholder="Precio de venta del producto"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="stock"
                      >
                        Existencia
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="stock"
                        type="text"
                        placeholder="Existencia del producto"
                      />
                    </div>
                    <div className="mb-2">
                      <input
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
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={onRequestClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
