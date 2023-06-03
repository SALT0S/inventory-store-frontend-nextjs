import React from "react";
import { GeneralLayout } from "../../components/layouts/GeneralLayout";
import { Product } from "../../types";

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  return (
    <GeneralLayout>
      <h1>s</h1>
    </GeneralLayout>
  );
};

export default ProductDetails;
