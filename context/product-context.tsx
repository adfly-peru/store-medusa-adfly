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
      imgUrl: 'https://www.gloria.com.pe/uploads/products/lacteos/externa.jpg',
      brand: 'Gloria',
      name: 'Leche',
      originalPrice: 30,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 30,
      imgUrl: 'https://plazavea.vteximg.com.br/arquivos/ids/2633807-1000-1000/20201565.jpg',
      brand: 'Donofrio',
      name: 'Panetón',
      originalPrice: 40,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 60,
      imgUrl: 'https://plazavea.vteximg.com.br/arquivos/ids/16382255-1000-1000/20258247.jpg',
      brand: 'Gloria',
      name: 'Mantequilla',
      originalPrice: 35,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 20,
      imgUrl: 'https://plazavea.vteximg.com.br/arquivos/ids/361743-1000-1000/1125872001.jpg?v=637310302320330000',
      brand: 'Gloria',
      name: 'Mermelada',
      originalPrice: 25,
      finalPrice: 15,
      stars: 5,
    },
    {
      discount: 30,
      imgUrl: 'https://plazavea.vteximg.com.br/arquivos/ids/19551706-1000-1000/20241189.jpg',
      brand: 'MiMaskot',
      name: 'Comida para perros',
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
