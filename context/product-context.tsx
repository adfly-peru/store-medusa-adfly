import { IconBrandAndroid, IconBrandAppleArcade, IconBuildingCarousel, IconStethoscope, IconToolsKitchen2 } from "@tabler/icons"
import { useRouter } from "next/router"
import React, { createContext, useCallback, useContext, useState } from "react"

export interface Product {
  identifier: String
  name: String
  price: number
  categories: String[]
}

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
    { identifier: 'milk', name: 'Leche', price: 10.0, categories: ['food'] },
    { identifier: 'bread', name: 'Pan', price: 8.5, categories: ['food'] },
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
