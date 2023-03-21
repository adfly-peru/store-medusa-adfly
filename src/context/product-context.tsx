import {
  IconBrandAndroid,
  IconBrandAppleArcade,
  IconBuildingCarousel,
  IconDogBowl,
  IconStethoscope,
  IconToolsKitchen2,
} from "@tabler/icons";
import React, { createContext, useContext } from "react";
import { Product } from "@interfaces/productInterface";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@graphql/products/queries";

interface Category {
  identifier: string;
  name: string;
  icon?: React.ReactNode;
}

interface ProductContext {
  products: Product[];
  categories: Category[];
  getProduct: (id: string) => Product | undefined;
  getProductsByFilter: (filter: string) => Product[];
  subCategories: string[];
  brands: string[];
}

const ProductContext = createContext<ProductContext | null>(null);

interface ProductProviderProps {
  children?: React.ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const { data } = useQuery<{ products: Product[] }>(GET_PRODUCTS);

  const categories: Category[] = [
    { identifier: "food", name: "Comida", icon: <IconToolsKitchen2 /> },
    {
      identifier: "entertainment",
      name: "Entretenimiento",
      icon: <IconBuildingCarousel />,
    },
    { identifier: "health", name: "Salud", icon: <IconStethoscope /> },
    {
      identifier: "technology",
      name: "Tecnología",
      icon: <IconBrandAndroid />,
    },
    { identifier: "gaming", name: "Juegos", icon: <IconBrandAppleArcade /> },
    { identifier: "pets", name: "Mascotas", icon: <IconDogBowl /> },
  ];

  const subCategories: string[] = [
    "Helados y Postres",
    "no category",
    "Comida para mascotas",
    "Mermeladas y Mieles",
    "Mantequillas y Margarinas",
    "Panes",
    "Lácteos",
  ];

  const brands: string[] = ["Gloria", "Donofrio", "MiMaskot", "Marca6"];

  const getProduct = (id: string) => {
    return data?.products.find((product) => product.uuidProduct === id);
  };

  const getProductsByFilter = (filter: string) => {
    return (
      data?.products.filter((product) => {
        if (product.department.name.toLocaleLowerCase().includes(filter)) {
          return true;
        }
        if (product.category.name.toLocaleLowerCase().includes(filter)) {
          return true;
        }
        if (product.subCategory.name.toLocaleLowerCase().includes(filter)) {
          return true;
        }
        return product.productName.toLowerCase().includes(filter);
      }) ?? []
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products: data?.products ?? [],
        categories,
        getProduct,
        getProductsByFilter,
        subCategories,
        brands,
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
