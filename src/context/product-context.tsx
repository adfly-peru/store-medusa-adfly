import React, { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Brand, Category, Department, Subcategory } from "@interfaces/category";
import {
  GET_BRANDS,
  GET_CATEGORIES,
  GET_DEPARTMENTS,
  GET_SUBCATEGORIES,
} from "@graphql/categories/queries";

interface ProductContext {
  departments: Department[];
  categories: Category[];
  subCategories: Subcategory[];
  brands: Brand[];
}

const ProductContext = createContext<ProductContext | null>(null);

interface ProductProviderProps {
  children?: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
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

  return (
    <ProductContext.Provider
      value={{
        departments: departments?.departments ?? [],
        categories: categories?.categories ?? [],
        subCategories: subcategories?.subcategories ?? [],
        brands: brands?.brands ?? [],
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
