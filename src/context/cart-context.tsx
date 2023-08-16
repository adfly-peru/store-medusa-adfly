import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CART } from "@graphql/cart/queries";
import { createCart, manageItem } from "api/cart";
import { Cart, CartItem } from "@interfaces/cart";
import { useAccount } from "./account-context";

interface CartContext {
  cart: Cart | null;
  addProduct: (
    uuidvariant: string,
    uuidbusiness: string,
    quantity: number
  ) => void;
  removeProduct: (uuidcartitem: string, uuidbusiness: string) => void;
  editProduct: (
    cartitem: CartItem,
    uuidbusiness: string,
    quantity: number
  ) => void;
  getProductById: (
    uuidproduct: string,
    uuidbusiness: string
  ) => CartItem | null;
}

const CartContext = createContext<CartContext | null>(null);

interface CartProviderProps {
  children?: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { collaborator } = useAccount();
  const [collaboratorId, setCollaboratorId] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const { data, error, loading, refetch } = useQuery<{ getCart: Cart }>(
    GET_CART,
    {
      variables: { collaboratorId },
      skip: !collaboratorId,
      onCompleted: (data) => setCart(data?.getCart),
    }
  );

  useEffect(() => {
    if (!data?.getCart && !loading && collaboratorId) {
      createCart(collaboratorId).then(() => {
        refetch();
      });
    }
  }, [data, loading]);

  useEffect(() => {
    if (error) {
      console.error("Error al obtener los productos:", error);
    }
  }, [error]);

  useEffect(() => {
    if (collaborator?.uuidcollaborator)
      setCollaboratorId(collaborator?.uuidcollaborator);
  }, [collaborator]);

  const addProduct = async (
    uuidvariant: string,
    uuidbusiness: string,
    quantity: number
  ) => {
    try {
      const suborder = data?.getCart.suborders.find(
        (obj) => obj.uuidbusiness == uuidbusiness
      );
      const cartitem = suborder?.items.find(
        (obj) => obj.uuidvariant == uuidvariant
      );
      if (typeof cartitem == "undefined") {
        await manageItem({
          uuiditem: "",
          uuidcart: data?.getCart.uuidcart!,
          uuidvariant: uuidvariant,
          uuidbusiness: uuidbusiness,
          quantity: quantity,
          operation: "add",
        });
      } else {
        await manageItem({
          uuiditem: cartitem.uuidcartitem,
          uuidcart: data?.getCart.uuidcart!,
          uuidvariant: uuidvariant,
          uuidbusiness: uuidbusiness,
          quantity: quantity + cartitem.quantity,
          operation: "update",
        });
      }
      refetch();
    } catch (error) {
      console.error("Error on add product: ", error);
    }
  };

  const removeProduct = async (uuidcartitem: string, uuidbusiness: string) => {
    await manageItem({
      uuiditem: uuidcartitem,
      uuidcart: data?.getCart.uuidcart!,
      uuidvariant: "",
      uuidbusiness: uuidbusiness,
      quantity: 0,
      operation: "remove",
    });
    refetch();
  };

  const editProduct = async (
    cartitem: CartItem,
    uuidbusiness: string,
    quantity: number
  ) => {
    if (!cart) return;
    const newCart: Cart = JSON.parse(JSON.stringify(cart));
    const subOrderIndex = newCart.suborders.findIndex(
      (subOrder) => subOrder.uuidbusiness === uuidbusiness
    );
    if (subOrderIndex === -1) return;
    const itemIndex = newCart.suborders[subOrderIndex].items.findIndex(
      (item) => item.uuidcartitem === cartitem.uuidcartitem
    );
    if (itemIndex === -1) return;
    newCart.suborders[subOrderIndex].items[itemIndex].quantity = quantity;
    setCart(newCart);

    try {
      const response = await manageItem({
        uuiditem: cartitem.uuidcartitem,
        uuidcart: data?.getCart.uuidcart!,
        uuidvariant: cartitem.uuidvariant,
        uuidbusiness: uuidbusiness,
        quantity: quantity,
        operation: "update",
      });
      if (response != null) {
        console.error("Error on edit product: ", response);
        setCart(cart);
        return;
      }
      refetch();
    } catch (error) {
      console.error("Error on edit product: ", error);
      setCart(cart);
    }
  };

  const getProductById = (uuidproduct: string, uuidbusiness: string) => {
    const suborder = data?.getCart.suborders.find(
      (obj) => obj.uuidbusiness == uuidbusiness
    );
    const item = suborder?.items.find(
      (obj) => obj.variant.product.uuidProduct == uuidproduct
    );
    return item ?? null;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        editProduct,
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
