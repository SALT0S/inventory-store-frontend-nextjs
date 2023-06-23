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

export const updateCategory = async (
  id: number | undefined,
  name: string,
  image: File
): Promise<Category> => {
  const response = await axios.put<CategoryResponse>(
    `/categories/${id}`,
    {
      name,
      image,
    },
    {
      headers: {
        ContentType: "multipart/form-data",
      },
    }
  );

  return response.data.data.category;
};

export const deleteCategory = async (id: number) => {
  await axios.delete(`/categories/${id}`);
  const response = await axios.get("/categories");

  return response.data;
};
