import React, { createContext, useContext } from "react";
import { Product } from "@interfaces/productInterface";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@graphql/products/queries";
import { Brand, Category, Department, Subcategory } from "@interfaces/category";
import {
  GET_BRANDS,
  GET_CATEGORIES,
  GET_DEPARTMENTS,
  GET_SUBCATEGORIES,
} from "@graphql/categories/queries";

interface ProductContext {
  products: Product[];
  departments: Department[];
  categories: Category[];
  subCategories: Subcategory[];
  getProduct: (id: string) => Product | undefined;
  getProductsByFilter: (filter: string) => Product[];
  brands: Brand[];
}

interface ProductResult {
  products: Product[];
  totalProducts: number;
}

const ProductContext = createContext<ProductContext | null>(null);

interface ProductProviderProps {
  children?: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const { data: productsQuery } = useQuery<{ products: ProductResult }>(
    GET_PRODUCTS
  );
  const { data: departments } = useQuery<{ departments: Department[] }>(
    GET_DEPARTMENTS
  );
  const { data: categories } = useQuery<{ categories: Category[] }>(
    GET_CATEGORIES
  );
  const { data: subcategories } = useQuery<{ subcategories: Subcategory[] }>(
    GET_SUBCATEGORIES
  );
  const { data: brands } = useQuery<{ brands: Brand[] }>(GET_BRANDS);

  const getProduct = (id: string) => {
    return productsQuery?.products?.products.find(
      (product) => product.uuidProduct === id
    );
  };

  const getProductsByFilter = (filter: string) => {
    return (
      productsQuery?.products?.products.filter((product) => {
        if (product.department.name.toLowerCase().includes(filter)) {
          return true;
        }
        if (product.category.name.toLowerCase().includes(filter)) {
          return true;
        }
        if (product.subCategory.name.toLowerCase().includes(filter)) {
          return true;
        }
        return product.productName.toLowerCase().includes(filter);
      }) ?? []
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products: productsQuery?.products?.products ?? [],
        departments: departments?.departments ?? [],
        categories: categories?.categories ?? [],
        subCategories: subcategories?.subcategories ?? [],
        brands: brands?.brands ?? [],
        getProduct,
        getProductsByFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  if (context === null) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
