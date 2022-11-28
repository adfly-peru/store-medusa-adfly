import { IconBrandAndroid, IconBrandAppleArcade, IconBuildingCarousel, IconStethoscope, IconToolsKitchen2 } from "@tabler/icons"
import { useRouter } from "next/router"
import React, { createContext, useCallback, useContext, useState } from "react"
import Product from "../interfaces/productInterface"

interface Category {
  identifier: String
  name: String
  icon?: React.ReactNode
}

interface ProductContext {
  products: Product[]
  categories: Category[]
}

const ProductContext = createContext<ProductContext | null>(null)

interface ProductProviderProps {
  children?: React.ReactNode
}

export const ProductProvider = ({ children }: ProductProviderProps) => {

  const products: Product[] = [
    {
      discount: 50,
      imgUrl: '',
      brand: 'Marca1',
      name: 'Producto1',
      originalPrice: 30,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 30,
      imgUrl: '',
      brand: 'Marca2',
      name: 'Producto2',
      originalPrice: 40,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 60,
      imgUrl: '',
      brand: 'Marca3',
      name: 'Producto3',
      originalPrice: 35,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 20,
      imgUrl: '',
      brand: 'Marca4',
      name: 'Producto4',
      originalPrice: 25,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 30,
      imgUrl: '',
      brand: 'Marca5',
      name: 'Producto5',
      originalPrice: 30,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 60,
      imgUrl: '',
      brand: 'Marca6',
      name: 'Producto6',
      originalPrice: 80,
      finalPrice: 15,
      stars: 5,
    }
  ]

  const categories: Category[] = [
    { identifier: 'food', name: 'Comida', icon: <IconToolsKitchen2/> },
    { identifier: 'entertainment', name: 'Entretenimiento', icon: <IconBuildingCarousel/> },
    { identifier: 'health', name: 'Salud', icon: <IconStethoscope/> },
    { identifier: 'technology', name: 'Tecnología', icon: <IconBrandAndroid/> },
    { identifier: 'gaming', name: 'Juegos', icon: <IconBrandAppleArcade/> },
  ]

  return (
    <ProductContext.Provider
      value={{
        products,
        categories
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProduct = () => {
  const context = useContext(ProductContext)

  if (context === null) {
    throw new Error("useProduct must be used within a ProductProvider")
  }
  return context
}
