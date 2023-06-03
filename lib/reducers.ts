import { combineReducers } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  // Agrega más reducers aquí si los tienes
});

export default rootReducer;
