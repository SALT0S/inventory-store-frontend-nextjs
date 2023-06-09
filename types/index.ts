export interface Product {
  id: number;
  category_id: number;
  name: string;
  brand: string;
  weight: string;
  purchase_price: number;
  sale_price: number;
  stock: number;
  image: string;
}

export interface ProductResponse {
  data: {
    product: Product;
    image_url: string;
  };
  message: string;
  success: boolean;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  data: {
    category: Category;
    image_url: string;
  };
  message: string;
  success: boolean;
}
