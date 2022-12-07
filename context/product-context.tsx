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
  getProduct: (id: string) => (Product | null)
}

const ProductContext = createContext<ProductContext | null>(null)

interface ProductProviderProps {
  children?: React.ReactNode
}

export const ProductProvider = ({ children }: ProductProviderProps) => {

  const products: Product[] = [
    {
      id: 'gloria1',
      discount: 50,
      imgUrl: ['https://www.gloria.com.pe/uploads/products/lacteos/externa.jpg'],
      brand: 'Gloria',
      name: 'Leche',
      originalPrice: 30,
      finalPrice: 15,
      stars: 5,
      details: {
        stock: 50,
        expirationDate: '2025/05/05',
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. deserunt mollit anim id est laborum.",
      }
    },
    {
      id: 'donofrio1',
      discount: 30,
      imgUrl: ['https://plazavea.vteximg.com.br/arquivos/ids/2633807-1000-1000/20201565.jpg'],
      brand: 'Donofrio',
      name: 'Panetón',
      originalPrice: 40,
      finalPrice: 15,
      stars: 5,
      details: {
        stock: 50,
        expirationDate: '2025/05/05',
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. deserunt mollit anim id est laborum.",
      }
    },
    {
      id: 'gloria2',
      discount: 60,
      imgUrl: ['https://plazavea.vteximg.com.br/arquivos/ids/16382255-1000-1000/20258247.jpg'],
      brand: 'Gloria',
      name: 'Mantequilla',
      originalPrice: 35,
      finalPrice: 15,
      stars: 5,
      details: {
        stock: 50,
        expirationDate: '2025/05/05',
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. deserunt mollit anim id est laborum.",
      }
    },
    {
      id: 'gloria3',
      discount: 20,
      imgUrl: ['https://plazavea.vteximg.com.br/arquivos/ids/361743-1000-1000/1125872001.jpg?v=637310302320330000'],
      brand: 'Gloria',
      name: 'Mermelada',
      originalPrice: 25,
      finalPrice: 15,
      stars: 5,
      details: {
        stock: 50,
        expirationDate: '2025/05/05',
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. deserunt mollit anim id est laborum.",
      }
    },
    {
      id: 'mimaskot1',
      discount: 30,
      imgUrl: ['https://plazavea.vteximg.com.br/arquivos/ids/19551706-1000-1000/20241189.jpg'],
      brand: 'MiMaskot',
      name: 'Comida para perros',
      originalPrice: 30,
      finalPrice: 15,
      stars: 5,
      details: {
        stock: 50,
        expirationDate: '2025/05/05',
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. deserunt mollit anim id est laborum.",
      }
    },
    {
      id: 'product6',
      discount: 60,
      imgUrl: [''],
      brand: 'Marca6',
      name: 'Producto6',
      originalPrice: 80,
      finalPrice: 15,
      stars: 5,
      details: {
        stock: 50,
        expirationDate: '2025/05/05',
        details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. deserunt mollit anim id est laborum.",
      }
    },
    {
      id: 'donofrio2',
      discount: 20,
      imgUrl: [
        'https://wongfood.vteximg.com.br/arquivos/ids/511162-750-750/frontal-5653.jpg?v=637777246844830000',
        'https://d20f60vzbd93dl.cloudfront.net/uploads/tienda_003842/tienda_003842_7e17eddf806b48cbd00065a60019c38a5b193230_producto_large_85.png',
        'https://wongfood.vtexassets.com/arquivos/ids/474916/Helado-de-Crema-Caf-de-Chanchamayo-Frio-Rico-Crocante-D-Onofrio-Pote-930-ml-1-171681496.jpg?v=637686202850730000',
      ],
      brand: 'Donofrio',
      name: 'Helado',
      originalPrice: 50,
      finalPrice: 30,
      stars: 20,
      details: {
        stock: 5,
        expirationDate: '2024/12/24',
        details: 'string',
      },
    }
  ]

  const categories: Category[] = [
    { identifier: 'food', name: 'Comida', icon: <IconToolsKitchen2/> },
    { identifier: 'entertainment', name: 'Entretenimiento', icon: <IconBuildingCarousel/> },
    { identifier: 'health', name: 'Salud', icon: <IconStethoscope/> },
    { identifier: 'technology', name: 'Tecnología', icon: <IconBrandAndroid/> },
    { identifier: 'gaming', name: 'Juegos', icon: <IconBrandAppleArcade/> },
  ]

  const getProduct = (id: string) => {
    for (var product of products) {
      if (product.id == id) {
        return product;
      }
    }
    return null;
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        getProduct,
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
