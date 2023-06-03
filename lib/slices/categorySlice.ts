import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../types";

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
  },
});

export const { addCategory } = categorySlice.actions;

export default categorySlice.reducer;
