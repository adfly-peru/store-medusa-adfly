import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createCartRequest,
  editBillingInfo,
  editDeliveryInfo,
  manageItem,
  selectAddressMethod,
} from "api/cart";
import {
  CartItem,
  CartQuery,
  ResumeCartItem,
  SimpleCartQuery,
  VariantAttribute,
  useCartQuery,
  useSimpleCartQuery,
} from "generated/graphql";
import { useSession } from "next-auth/react";
import { BillingForm } from "@interfaces/billing";
import { AddressInfoForm } from "@interfaces/address-interface";

function areVariantAttributesEqual(
  list1: VariantAttribute[],
  list2: VariantAttribute[]
): boolean {
  if (list1.length !== list2.length) {
    return false;
  }
  const comparison1 = list1.every((attr1) =>
    list2.some(
      (attr2) =>
        attr1.attributeName === attr2.attributeName &&
        attr1.value === attr2.value
    )
  );
  const comparison2 = list2.every((attr2) =>
    list1.some(
      (attr1) =>
        attr1.attributeName === attr2.attributeName &&
        attr1.value === attr2.value
    )
  );

  return comparison1 && comparison2;
}

interface CartContext {
  cart: CartQuery["cart"] | undefined;
  loading: boolean;
  refetchCart: () => Promise<void>;
  getVariant: (
    uuidVariant: string,
    uuidbusiness: string,
    attrs: VariantAttribute[]
  ) => null | CartItem;
  addProduct: (
    uuidvariant: string,
    uuidbusiness: string,
    quantity: number
  ) => Promise<void>;
  removeProduct: (uuidcartitem: string, uuidbusiness: string) => Promise<void>;
  editProduct: (
    cartitem: CartItem,
    uuidbusiness: string,
    quantity: number
  ) => Promise<void>;
  selectAddress: (uuidcollaboratoraddress: string) => Promise<string | null>;
  setBilling: (billingform: BillingForm) => Promise<string | null>;
  setDeliveryInfo: (deliveryform: AddressInfoForm) => Promise<string | null>;
}

const CartContext = createContext<CartContext | null>(null);

interface CartProviderProps {
  children?: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { data: session } = useSession();
  const { data, refetch, loading } = useCartQuery({
    skip: !session?.user?.accessToken,
    onCompleted: (response) => {
      if (!response.cart) createCart();
      else console.log("Current Cart", { cart: response });
    },
  });

  const createCart = async () => {
    if (!session?.user?.accessToken) return;
    const response = await createCartRequest(session.user.accessToken);
    if (!response) await refetch();
  };

  const getVariant = (
    uuidVariant: string,
    uuidbusiness: string,
    attrs: VariantAttribute[]
  ) => {
    if (!data?.cart) return null;
    const suborder = data.cart.suborders.find(
      (obj) => obj.uuidbusiness == uuidbusiness
    );
    if (!suborder) return null;
    return (
      suborder.items.find(
        (obj) =>
          obj.variant.uuidVariant === uuidVariant &&
          areVariantAttributesEqual(obj.variant.attributes ?? [], attrs)
      ) ?? null
    );
  };

  const addProduct = async (
    uuidvariant: string,
    uuidbusiness: string,
    quantity: number
  ) => {
    try {
      const suborder = data?.cart?.suborders?.find(
        (obj) => obj.uuidbusiness == uuidbusiness
      );
      const cartitem = suborder?.items.find(
        (obj) => obj.variant.uuidVariant == uuidvariant
      );
      if (typeof cartitem == "undefined") {
        await manageItem({
          uuiditem: "",
          uuidcart: data?.cart?.uuidcart!,
          uuidvariant: uuidvariant,
          uuidbusiness: uuidbusiness,
          quantity: quantity,
          operation: "add",
        });
      } else {
        await manageItem({
          uuiditem: cartitem.uuidcartitem,
          uuidcart: data?.cart?.uuidcart!,
          uuidvariant: uuidvariant,
          uuidbusiness: uuidbusiness,
          quantity: quantity,
          operation: "update",
        });
      }
      await refetch();
    } catch (error) {
      console.error("Error on add product: ", error);
      throw error;
    }
  };

  const removeProduct = async (
    uuidcartitem: string,
    uuidcartsuborder: string
  ) => {
    if (!data?.cart) return;
    const subOrderIndex = data.cart.suborders.find(
      (subOrder) => subOrder.uuidcartsuborder === uuidcartsuborder
    );
    await manageItem({
      uuiditem: uuidcartitem,
      uuidcart: data.cart.uuidcart!,
      uuidvariant: "",
      uuidbusiness: subOrderIndex?.uuidbusiness!,
      quantity: 0,
      operation: "remove",
    });
    await refetch();
  };

  const editProduct = async (
    cartitem: CartItem,
    uuidcartsuborder: string,
    quantity: number
  ) => {
    if (!data?.cart) return;
    const subOrderIndex = data.cart.suborders.findIndex(
      (subOrder) => subOrder.uuidcartsuborder === uuidcartsuborder
    );
    if (subOrderIndex === -1) return;
    const itemIndex = data.cart.suborders[subOrderIndex].items.findIndex(
      (item) => item.uuidcartitem === cartitem.uuidcartitem
    );
    if (itemIndex === -1) return;

    try {
      await manageItem({
        uuiditem: cartitem.uuidcartitem,
        uuidcart: data.cart.uuidcart,
        uuidvariant: cartitem.uuidvariant,
        uuidbusiness: data.cart.suborders[subOrderIndex].uuidbusiness,
        quantity: quantity - cartitem.quantity,
        operation: "update",
      });
      await refetch();
    } catch (error) {
      console.error("Error on edit product: ", error);
      throw error;
    }
  };

  const selectAddress = async (uuidcollaboratoraddress: string) => {
    if (!session?.user?.id) return "Method is not available";
    if (!session?.user?.accessToken) return "Method is not available";
    if (!data?.cart) return "Method is not available";
    try {
      const resp = await selectAddressMethod(
        data.cart.uuidcart,
        session.user.id,
        uuidcollaboratoraddress,
        session.user.accessToken
      );
      await refetch();
      return resp;
    } catch (error) {
      return `Error: ${error}`;
    }
  };

  const setBilling = async (billingform: BillingForm) => {
    if (!session?.user?.id) return "Method is not available";
    if (!session?.user?.accessToken) return "Method is not available";
    if (!data?.cart) return "Method is not available";
    try {
      const resp = await editBillingInfo(
        session.user.id,
        data.cart.uuidcart,
        billingform,
        session.user.accessToken
      );
      await refetch();
      return resp;
    } catch (error) {
      return `Error: ${error}`;
    }
  };

  const setDeliveryInfo = async (deliveryform: AddressInfoForm) => {
    if (!session?.user?.id) return "Method is not available";
    if (!session?.user?.accessToken) return "Method is not available";
    if (!data?.cart) return "Method is not available";
    try {
      const resp = await editDeliveryInfo(
        session.user.id,
        data.cart.uuidcart,
        deliveryform,
        data.cart.deliveryInfo?.collaboratoraddress?.uuidcollaboratoraddress ??
          "",
        session.user.accessToken
      );
      await refetch();
      return resp;
    } catch (error) {
      return `Error: ${error}`;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: data?.cart,
        loading,
        getVariant,
        addProduct,
        removeProduct,
        editProduct,
        selectAddress,
        setBilling,
        setDeliveryInfo,
        refetchCart: async () => {
          await refetch();
        },
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
