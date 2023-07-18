import React, { createContext, useContext, useState } from "react";
import { Product } from "@interfaces/productInterface";
import { useProduct } from "@context/product-context";

interface FilterContext {
  filters: string[];
  addFilter: (filter: string) => void;
  rangePrices: [number, number];
  setRange: (minPrice: number, maxPrice: number) => void;
  filteredProducts: Product[];
  categories: Map<string, number>;
  brands: Map<string, number>;
  category: string[];
  setCategory: (newValue: string[]) => void;
  brand: string[];
  setBrand: (newValue: string[]) => void;
  seller: string[];
  setSeller: (newValue: string[]) => void;
  delivery: string[];
  setDelivery: (newValue: string[]) => void;
}
const FilterContext = createContext<FilterContext | null>(null);

interface FilterProviderProps {
  children?: React.ReactNode;
  filter: string;
}

export const FilterProvider = ({ children, filter }: FilterProviderProps) => {
  const { getProductsByFilter } = useProduct();
  const filteredProducts = getProductsByFilter(
    typeof filter == "string" ? filter.toLowerCase() : ""
  );
  const filters: string[] = [];
  const [rangePrices, setRangePrices] = useState<[number, number]>([0, 1000]);
  const addFilter = (filter: string) => {
    filters.push(filter);
  };
  const setRange = (minPrice: number, maxPrice: number) => {
    setRangePrices([minPrice, maxPrice]);
  };
  const categories: Map<string, number> = new Map<string, number>();
  const brands: Map<string, number> = new Map<string, number>();
  filteredProducts.map((p) => {
    categories.set(
      p.subCategory.name,
      (categories.get(p.subCategory.name) ?? 0) + 1
    );
    brands.set(p.brand.name, (brands.get(p.brand.name) ?? 0) + 1);
  });

  const [category, setCategory] = useState<string[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [seller, setSeller] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<string[]>([]);
  return (
    <FilterContext.Provider
      value={{
        filters,
        addFilter,
        rangePrices,
        setRange,
        filteredProducts,
        categories,
        brands,
        category,
        setCategory,
        brand,
        setBrand,
        seller,
        setSeller,
        delivery,
        setDelivery,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (context === null) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
