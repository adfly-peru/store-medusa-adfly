import React, { createContext, useContext, useState } from "react";
import { Product } from "@interfaces/productInterface";
export interface ProductCart {
  product: Product;
  quantity: number;
}

interface CartContext {
  products: ProductCart[];
  addProduct: (product: Product, quantity: number) => boolean;
  removeProduct: (product: Product) => boolean;
  editProduct: (product: Product, quantity: number) => void;
  length: number;
  getProductById: (id: string) => ProductCart | undefined;
}

const CartContext = createContext<CartContext | null>(null);

interface CartProviderProps {
  children?: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const initialProducts: ProductCart[] = [];
  const [products, setProducts] = useState(initialProducts);
  const [length, setLength] = useState(initialProducts.length);

  const addProduct = (product: Product, quantity: number) => {
    const found = products.find((obj) => {
      return obj.product.uuidProduct == product.uuidProduct;
    });
    if (typeof found == "undefined") {
      const newState = products;
      newState.push({ product, quantity });
      setProducts(newState);
      setLength(newState.length);
      return true;
    }
    return false;
  };

  const removeProduct = (product: Product) => {
    const newState = products.filter(
      (obj) => obj.product.uuidProduct != product.uuidProduct
    );
    if (newState.length == products.length) {
      return false;
    }
    setProducts(newState);
    setLength(newState.length);
    return true;
  };

  const editProduct = (product: Product, quantity: number) => {
    var exist = false;
    const newState = products.map((obj) => {
      if (obj.product.uuidProduct == product.uuidProduct) {
        exist = true;
        return { product: product, quantity: quantity };
      }
      return obj;
    });
    if (!exist) {
      newState.push({ product, quantity });
    }
    setProducts(newState);
    setLength(newState.length);
  };

  const getProductById = (id: string) => {
    const found = products.find((obj) => {
      return obj.product.uuidProduct == id;
    });
    return found;
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        editProduct,
        length,
        getProductById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
