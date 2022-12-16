import ProductDetails from "./productDetails";

interface Product {
  id: string;
  discount: number;
  imgUrl: string[];
  brand: string;
  name: string;
  originalPrice: number;
  finalPrice: number;
  stars: number;
  details: ProductDetails;
  category: string;
  subCategory: string;
  tags: string[];
}

export default Product;
