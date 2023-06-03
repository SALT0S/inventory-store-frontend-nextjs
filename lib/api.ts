import { Category, CategoryResponse } from "../types";
import axios from "./axios";

export const createCategory = async (
  name: string,
  image: File
): Promise<Category> => {
  const formData = new FormData();
  formData.append("name", name);
  if (image) {
    formData.append("image", image);
  }

  const response = await axios.post<CategoryResponse>("/categories", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data.category;
};

export const deleteCategory = async (id: number) => {
  await axios.delete(`/categories/${id}`);

  const response = await axios.get("/categories");
  return response.data;
};

const updateCategory = async (id: number, name: string, image?: File) => {
  const formData = new FormData();
  formData.append("name", name);
  if (image) {
    formData.append("image", image);
  }

  await axios.put(`/categories/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const response = await axios.get("/categories");
  return response.data;
};

export const createProduct = async (
  name: string,
  brand: string,
  weight: string,
  purchase_price: string,
  sale_price: string,
  stock: string,
  category_id: string,
  image?: File | null
) => {
  const formData = new FormData();
  formData.append("category_id", String(category_id));
  formData.append("name", name);
  formData.append("brand", brand);
  formData.append("weight", weight);
  formData.append("purchase_price", String(purchase_price));
  formData.append("sale_price", String(sale_price));
  formData.append("stock", String(stock));
  if (image) {
    formData.append("image", image);
  }

  const response = await axios.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export default {
  updateCategory,
};
