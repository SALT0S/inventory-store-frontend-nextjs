import React, { useCallback, useState } from "react";
import { createProduct } from "../../../lib/productApi";
import { Category, Product } from "../../../types";
import { ImageUpload } from "../ImageUpload";

interface AddProductModalProps {
  isOpen: boolean;
  categories: Category[];
  onRequestClose: () => void;
  onProductAdded: (newProduct: Product) => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = (props) => {
  const { isOpen, onRequestClose, onProductAdded, categories } = props;

  const [category_id, setCategoryId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [purchase_price, setPurchasePrice] = useState<number | null>(null);
  const [sale_price, setSalePrice] = useState<number | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setErrorMessage(null);
      if (
        category_id &&
        name &&
        brand &&
        weight &&
        purchase_price &&
        sale_price &&
        stock &&
        image
      ) {
        try {
          const newProduct = await createProduct(
            category_id,
            name,
            brand,
            weight,
            purchase_price,
            sale_price,
            stock,
            image
          );
          onProductAdded(newProduct);
          setCategoryId(null);
          setName("");
          setBrand("");
          setWeight("");
          setPurchasePrice(null);
          setSalePrice(null);
          setStock(null);
          setImage(null);
          setPreview("");
          onRequestClose();
        } catch (error) {
          // @ts-ignore TODO: fix this TS error
          setErrorMessage(error.response?.data.message);
        }
      }
    },
    [
      category_id,
      name,
      brand,
      weight,
      purchase_price,
      sale_price,
      stock,
      image,
      onProductAdded,
      onRequestClose,
    ]
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryId(parseInt(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrand(event.target.value);
  };

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value + " " + weightUnit);
  };

  const handleWeightUnitChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWeightUnit(event.target.value);
    // Update the weight state to include the new unit
    const [currentWeight] = weight.split(" "); // Extract the numeric part of weight
    setWeight(currentWeight + " " + event.target.value);
  };

  const handlePurchasePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPurchasePrice(parseInt(event.target.value));
  };

  const handleSalePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSalePrice(parseInt(event.target.value));
  };

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStock(parseInt(event.target.value));
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
          <form onSubmit={onSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Agregar producto
                  </h3>

                  <div className="mt-5 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-cyan-600 focus-within:border-cyan-600">
                    <label
                      htmlFor="category_id"
                      className="block text-xs font-medium text-gray-900"
                    >
                      Categoría
                    </label>
                    <select
                      id="category_id"
                      name="category_id"
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      onChange={handleCategoryChange}
                    >
                      <option>Seleccionar categoría</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-5 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-cyan-600 focus-within:border-cyan-600">
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-gray-900"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      onChange={handleNameChange}
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="Manzana"
                    />
                  </div>

                  <div className="mt-5 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-cyan-600 focus-within:border-cyan-600">
                    <label
                      htmlFor="brand"
                      className="block text-xs font-medium text-gray-900"
                    >
                      Marca
                    </label>
                    <input
                      type="text"
                      name="brand"
                      id="brand"
                      required
                      onChange={handleBrandChange}
                      className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                      placeholder="La Favorita"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="mt-5 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-cyan-600 focus-within:border-cyan-600">
                      <label
                        htmlFor="weight"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Peso
                      </label>

                      <div className="mt-1 relative rounded-md">
                        <input
                          type="text"
                          name="weight"
                          id="weight"
                          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          placeholder="7.4"
                          required
                          onChange={handleWeightChange}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center">
                          <label htmlFor="kg-lbs" className="sr-only">
                            Peso
                          </label>
                          <select
                            id="kg-lbs"
                            name="kg-lbs"
                            autoComplete="kg-lbs"
                            className="focus:ring-cyan-500 focus:border-cyan-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                            onChange={handleWeightUnitChange}
                          >
                            <option>kg</option>
                            <option>lbs</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-cyan-600 focus-within:border-cyan-600">
                      <label
                        htmlFor="stock"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Stock
                      </label>

                      <div className="mt-1 relative rounded-md">
                        <input
                          type="text"
                          name="stock"
                          id="stock"
                          required
                          onChange={handleStockChange}
                          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                          placeholder="100"
                        />
                        <div className="absolute inset-y-0 right-0">
                          <p className="text-gray-500 sm:text-sm">Unidades</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="mt-5 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-cyan-600 focus-within:border-cyan-600">
                      <label
                        htmlFor="purchase_price"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Precio de compra
                      </label>

                      <div className="mt-1 relative rounded-md">
                        <input
                          type="text"
                          name="purchase_price"
                          id="purchase_price"
                          required
                          onChange={handlePurchasePriceChange}
                          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0">
                          <p className="text-gray-500 sm:text-sm">USD</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-cyan-600 focus-within:border-cyan-600">
                      <label
                        htmlFor="sale_price"
                        className="block text-xs font-medium text-gray-900"
                      >
                        Precio de venta
                      </label>

                      <div className="mt-1 relative rounded-md">
                        <input
                          type="text"
                          name="sale_price"
                          id="sale_price"
                          required
                          onChange={handleSalePriceChange}
                          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0">
                          <p className="text-gray-500 sm:text-sm">USD</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ImageUpload
                    id="productImage"
                    name="productImage"
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
