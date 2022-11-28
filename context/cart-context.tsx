import { useRouter } from "next/router"
import React, { createContext, useCallback, useContext, useState } from "react"
import Product from "../interfaces/productInterface"
interface ProductCart {
  product: Product
  quantity: number
}

interface CartContext {
  products: ProductCart[]
}

const CartContext = createContext<CartContext | null>(null)

interface CartProviderProps {
  children?: React.ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {

  const products: ProductCart [] = []

  return (
    <CartContext.Provider
      value={{
        products
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === null) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
