import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
