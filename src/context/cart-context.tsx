import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CART } from "@graphql/cart/queries";
import {
  CouponResponse,
  createCart,
  editBillingInfo,
  editDeliveryInfo,
  editDeliveryMethod,
  generateCouponRequest,
  manageItem,
  payCart,
} from "api/cart";
import { Cart, CartItem } from "@interfaces/cart";
import { useAccount } from "./account-context";
import { BillingForm } from "@interfaces/billing";
import { Address, AddressInfoForm } from "@interfaces/address-interface";
import { VariantAttribute } from "@interfaces/productInterface";
import { useRouter } from "next/router";
import { precheckoutQuery } from "api/precheckout";
import { CartPromotions } from "@interfaces/promotion";

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
  searchVariantAttrs: (
    uuidoffer: string,
    uuidbusiness: string,
    attrs: VariantAttribute[]
  ) => CartItem | null;
  generateCoupon: (
    uuid_variant: string,
    uuid_product: string
  ) => Promise<CouponResponse | undefined>;
  getVariantById: (
    uuidvariant: string,
    uuidbusiness: string
  ) => CartItem | null;
  editBilling: (billingform: BillingForm) => Promise<string | null>;
  editDelivery: (
    deliveryform: AddressInfoForm,
    uuidcollaboratoraddress: string
  ) => Promise<string | null>;
  selectDeliveryMethod: (
    uuidcartsuborder: string,
    deliverymethod: string,
    uuidaddress: string
  ) => Promise<string | null>;
  loadingEvent: boolean;
  refetch: () => Promise<void>;
  useStars: boolean;
  setUseStars: (value: boolean) => void;
  payCartWithStars: (
    purchaseNumber: string,
    amount: number,
    stars: number
  ) => Promise<void>;
  checked: string;
  setChecked: (v: string) => void;
  hasAcceptedTerms: boolean;
  setHasAcceptedTerms: (v: boolean) => void;
  handlePrecheckout: (address?: Address) => Promise<void>;
  cartPromotions: CartPromotions | null;
}

const CartContext = createContext<CartContext | null>(null);

interface CartProviderProps {
  children?: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const router = useRouter();
  const [checked, setChecked] = useState("ticket");
  const [cartPromotions, setCartPromotions] = useState<CartPromotions | null>(
    null
  );
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const { collaborator } = useAccount();
  const [collaboratorId, setCollaboratorId] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [useStars, setUseStars] = useState(false);
  const { data, error, loading, refetch } = useQuery<{ getCart: Cart }>(
    GET_CART,
    {
      variables: { collaboratorId },
      skip: !collaboratorId,
    }
  );

  useEffect(() => {
    if (data?.getCart) {
      setCart(data.getCart);
    }
  }, [data]);

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

  const generateCoupon = async (uuid_variant: string, uuid_product: string) => {
    try {
      const response = await generateCouponRequest(uuid_variant, uuid_product);
      await refetch();
      return response;
    } catch (error) {
      console.error("Error on add product: ", error);
      return {
        couponCode: "",
        status: "failed",
      };
    }
  };

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
          quantity: quantity,
          operation: "update",
        });
      }
      await refetch();
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
    await refetch();
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
        quantity: quantity - cartitem.quantity,
        operation: "update",
      });
      if (response != null) {
        console.error("Error on edit product: ", response);
        setCart(cart);
        return;
      }
      await refetch();
    } catch (error) {
      console.error("Error on edit product: ", error);
      setCart(cart);
    }
  };

  const getProductById = (uuidproduct: string, uuidbusiness: string) => {
    if (!data?.getCart?.suborders) return null;
    const suborder = data.getCart.suborders.find(
      (obj) => obj.uuidbusiness == uuidbusiness
    );
    if (!suborder) return null;
    const item = suborder?.items.find(
      (obj) => obj.variant.offer.uuidOffer == uuidproduct
    );
    return item ?? null;
  };

  const getVariantById = (uuidvariant: string, uuidbusiness: string) => {
    if (!data?.getCart?.suborders) return null;
    const suborder = data.getCart.suborders.find(
      (obj) => obj.uuidbusiness == uuidbusiness
    );
    if (!suborder) return null;
    const item = suborder?.items.find((obj) => obj.uuidvariant == uuidvariant);
    return item ?? null;
  };

  const searchVariantAttrs = (
    uuidoffer: string,
    uuidbusiness: string,
    attrs: VariantAttribute[]
  ) => {
    if (!data?.getCart?.suborders) return null;
    const suborder = data.getCart.suborders.find(
      (obj) => obj.uuidbusiness == uuidbusiness
    );
    if (!suborder) return null;
    return (
      suborder.items.find(
        (obj) =>
          obj.uuidoffer === uuidoffer &&
          areVariantAttributesEqual(obj.attributes ?? [], attrs)
      ) ?? null
    );
  };

  const editBilling = async (billingform: BillingForm) => {
    try {
      setLoadingEvent(true);
      if (collaboratorId && cart?.uuidcart) {
        const resp = await editBillingInfo(
          collaboratorId,
          cart?.uuidcart,
          billingform
        );
        await refetch();
        setLoadingEvent(false);
        return resp;
      }
      setLoadingEvent(false);
      return "Error: null collaborator/cart id";
    } catch (error) {
      setLoadingEvent(false);
      return `Error: ${error}`;
    }
  };

  const editDelivery = async (
    deliveryform: AddressInfoForm,
    uuidcollaboratoraddress: string
  ) => {
    try {
      setLoadingEvent(true);
      if (collaboratorId && cart?.uuidcart) {
        const resp = await editDeliveryInfo(
          collaboratorId,
          cart?.uuidcart,
          deliveryform,
          uuidcollaboratoraddress
        );
        await refetch();
        setLoadingEvent(false);
        return resp;
      }
      setLoadingEvent(false);
      return "Error: null collaborator/cart id";
    } catch (error) {
      setLoadingEvent(false);
      return `Error: ${error}`;
    }
  };

  const payCartWithStars = async (
    purchaseNumber: string,
    amount: number,
    stars: number
  ) => {
    if (!cart) return;
    const location =
      (await payCart(purchaseNumber, cart, amount, stars)) ??
      "/error?message=desconocido";
    router.push(location);
  };

  const selectDeliveryMethod = async (
    uuidcartsuborder: string,
    deliverymethod: string,
    uuidaddress: string
  ) => {
    try {
      setLoadingEvent(true);
      if (collaboratorId && cart?.uuidcart) {
        const resp = await editDeliveryMethod(
          uuidcartsuborder,
          deliverymethod,
          uuidaddress
        );
        await refetch();
        setLoadingEvent(false);
        return resp;
      }
      setLoadingEvent(false);
      return "Error: null collaborator/cart id";
    } catch (error) {
      setLoadingEvent(false);
      return `Error: ${error}`;
    }
  };

  const handlePrecheckout = async (address?: Address) => {
    if (!cart) return;
    console.log("hola");

    const response = await precheckoutQuery(cart, address);
    console.log({ response });

    setCartPromotions(response);
  };

  useEffect(() => {
    console.log("data", { cartPromotions });
  }, [cartPromotions]);

  return (
    <CartContext.Provider
      value={{
        handlePrecheckout,
        cartPromotions,
        hasAcceptedTerms,
        setHasAcceptedTerms,
        checked,
        setChecked,
        cart,
        addProduct,
        refetch: async () => {
          await refetch();
        },
        searchVariantAttrs,
        removeProduct,
        editProduct,
        getProductById,
        getVariantById,
        editBilling,
        editDelivery,
        generateCoupon,
        selectDeliveryMethod,
        loadingEvent,
        useStars,
        setUseStars,
        payCartWithStars,
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
