import { Product, ProductResponse } from "../types";
import axios from "./axios";

export const createProduct = async (
  category_id: number,
  name: string,
  brand: string,
  weight: string,
  purchase_price: number,
  sale_price: number,
  stock: number,
  image: File
) => {
  const formData = new FormData();
  formData.append("category_id", category_id.toString());
  formData.append("name", name);
  formData.append("brand", brand);
  formData.append("weight", weight);
  formData.append("purchase_price", purchase_price.toString());
  formData.append("sale_price", sale_price.toString());
  formData.append("stock", stock.toString());
  if (image) {
    formData.append("image", image);
  }

  const response = await axios.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data.product;
};

export const updateProduct = async (
  id: number | undefined,
  category_id: number,
  name: string,
  brand: string,
  weight: string,
  purchase_price: number,
  sale_price: number,
  stock: number,
  image: File
): Promise<Product> => {
  const response = await axios.put<ProductResponse>(
    `/products/${id}`,
    {
      category_id,
      name,
      brand,
      weight,
      purchase_price,
      sale_price,
      stock,
      image,
    },
    {
      headers: {
        ContentType: "multipart/form-data",
      },
    }
  );

  return response.data.data.product;
};

export const deleteProduct = async (id: number) => {
  await axios.delete(`/products/${id}`);
  const response = await axios.get("/products");

  return response.data;
};
