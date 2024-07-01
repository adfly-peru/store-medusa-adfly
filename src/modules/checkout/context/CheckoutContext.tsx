import { useAccount } from "@context/account-context";
import { useCart } from "@context/cart-context";
import { AddressInfoForm } from "@interfaces/address-interface";
import { BillingForm } from "@interfaces/billing";
import { CartPromotions } from "@interfaces/promotion";
import {
  editDeliveryInfo,
  editDeliveryMethod,
  editBillingInfo,
} from "api/cart";
import { precheckoutQuery } from "api/precheckout";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface DeliveryInfo {
  selectedMethod: string;
  deliveryPrice: number;
  selectedStore?: string;
}

interface ICheckoutContext {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  address: null | string;
  handleCheckAddress: (uuidaddress: string) => void;
  ordersDeliveryInfo: Record<string, DeliveryInfo>;
  setOrdersDeliveryInfo: React.Dispatch<
    React.SetStateAction<Record<string, DeliveryInfo>>
  >;
  deliveryStep: number;
  setDeliveryStep: React.Dispatch<React.SetStateAction<number>>;
  goToOrdersSection: (department?: string | null) => Promise<void>;
  deliveryInfo: AddressInfoForm;
  setDeliveryInfo: React.Dispatch<React.SetStateAction<AddressInfoForm>>;
  billingInfo: BillingForm;
  setBillingInfo: React.Dispatch<React.SetStateAction<BillingForm>>;
  handleDeliveryInformation: () => Promise<void>;
  handlerBillingInfo: (formData?: { phone: string }) => Promise<void>;
  promotions: CartPromotions;
  receiver: string;
  setReceiver: React.Dispatch<React.SetStateAction<string>>;
  totalDelivery: number;
  partnersPromotionsDiscount?: number;
  finalPrice: number;
  terms: boolean;
  setTerms: React.Dispatch<React.SetStateAction<boolean>>;
  onlinePay: boolean;
  setOnlinePay: React.Dispatch<React.SetStateAction<boolean>>;
  useStars: boolean;
  setUseStars: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutContext = createContext<ICheckoutContext | null>(null);

export const CheckoutProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const { collaborator } = useAccount();
  const { selectAddress, cart, refetchCart } = useCart();
  const [step, setStep] = useState(1);
  const [deliveryStep, setDeliveryStep] = useState(1);
  const [address, setAddress] = useState<null | string>(null);
  const [ordersDeliveryInfo, setOrdersDeliveryInfo] = useState<
    Record<string, DeliveryInfo>
  >({});
  const [terms, setTerms] = useState(false);
  const [onlinePay, setOnlinePay] = useState(false);
  const [useStars, setUseStars] = useState(false);
  const [receiver, setReceiver] = useState("current");
  const [deliveryInfo, setDeliveryInfo] = useState<AddressInfoForm>({
    receivername: "",
    receiverdocumentkind: "",
    receiverdocumentnumber: "",
    receiverphone: "",
  });
  const [billingInfo, setBillingInfo] = useState<BillingForm>({
    phone: "",
    ruc: "",
    businessname: "",
    fiscaladdress: "",
  });
  const [promotions, setPromotions] = useState<CartPromotions>({});

  const getPromotionsForCart = async (department?: string | null) => {
    if (!session?.user?.accessToken) return;
    if (!cart) return;
    const response = await precheckoutQuery(
      session.user.accessToken,
      cart,
      department
    );
    setPromotions(response);
  };

  const handleCheckAddress = (uuidaddress: string) => {
    setAddress(
      uuidaddress === address || uuidaddress === "" ? null : uuidaddress
    );
  };

  const goToOrdersSection = async (department?: string | null) => {
    // const error = await selectAddress(address ?? "");
    if (!session?.user?.id) return;
    if (!session?.user?.accessToken) return;
    if (!cart) return;

    const error = await editDeliveryInfo(
      session.user.id,
      cart.uuidcart,
      deliveryInfo,
      address ?? "",
      session.user.accessToken
    );
    if (error) throw new Error(error);
    await refetchCart();
    await getPromotionsForCart(department);
    setDeliveryStep(2);
  };

  const handleDeliveryInformation = async () => {
    if (!session?.user?.id) return;
    if (!session?.user?.accessToken) return;
    if (!cart) return;

    const error = await editDeliveryInfo(
      session.user.id,
      cart.uuidcart,
      deliveryInfo,
      address ?? "",
      session.user.accessToken
    );

    if (error) throw Error(error);

    await Promise.all(
      cart.suborders.map(async (suborder) => {
        const deliveryData = ordersDeliveryInfo[suborder.uuidbusiness];
        if (!deliveryData) throw new Error("Empty option for a suborder");
        const uuidPromotion = promotions.PartnerPromotions?.find(
          (p) => p.UUIDPartner === suborder.uuidbusiness
        )?.FreeShippingPromotion?.UuidPromotion;

        const error2 = await editDeliveryMethod(
          session.user?.accessToken ?? "",
          suborder.uuidcartsuborder,
          deliveryData.selectedMethod,
          deliveryData.selectedStore ?? "",
          deliveryData.selectedMethod === "onhome" ? uuidPromotion : undefined
        );
        if (error2) throw new Error(error2);
      })
    );

    await refetchCart();
    setStep(3);
  };

  const totalDelivery = useMemo(
    () =>
      Object.values(ordersDeliveryInfo).reduce(
        (acc, info) => acc + info.deliveryPrice,
        0
      ),
    [ordersDeliveryInfo]
  );

  const partnersPromotionsDiscount = useMemo(
    () =>
      promotions.PartnerPromotions?.reduce(
        (acc, promotion) => acc + (promotion.DiscountPromotion?.Discount ?? 0),
        0
      ),
    [promotions.PartnerPromotions]
  );

  const finalPrice = useMemo(
    () =>
      (cart?.total ?? 0) +
      (totalDelivery ?? 0) -
      (promotions.CartPromotion?.Discount ?? 0) -
      (partnersPromotionsDiscount ?? 0),
    [
      cart?.total,
      totalDelivery,
      promotions.CartPromotion?.Discount,
      partnersPromotionsDiscount,
    ]
  );

  const handlerBillingInfo = async (formData?: { phone: string }) => {
    if (!session?.user?.id) return;
    if (!session?.user?.accessToken) return;
    if (!cart) return;

    const updatedBillingInfo = {
      ...billingInfo,
      phone: formData?.phone ?? billingInfo.phone,
    };

    const error = await editBillingInfo(
      session.user.id,
      cart.uuidcart,
      updatedBillingInfo,
      session.user.accessToken
    );

    if (error) throw Error(error);

    await refetchCart();
  };

  useEffect(() => {
    if (!cart) return;
    setOrdersDeliveryInfo(
      cart.suborders.reduce(
        (acc, item) => (
          (acc[item.uuidbusiness] = {
            deliveryPrice: item.deliveryprice ?? 0,
            selectedMethod: item.deliverymethod ?? "",
            selectedStore: item.uuidaddress ?? undefined,
          }),
          acc
        ),
        {} as Record<string, DeliveryInfo>
      )
    );
    setAddress(
      cart.deliveryInfo?.collaboratoraddress?.uuidcollaboratoraddress ?? null
    );
    if (cart?.deliveryInfo?.receivername) setReceiver("other");
    if (cart.deliveryInfo) {
      setDeliveryInfo({
        receivername: cart.deliveryInfo?.receivername ?? "",
        receiverdocumentkind: cart.deliveryInfo?.receiverdocumentkind ?? "",
        receiverdocumentnumber: cart.deliveryInfo?.receiverdocumentnumber ?? "",
        receiverphone: cart.deliveryInfo?.receiverphone ?? "",
      });
    }
    if (cart.billingInfo)
      setBillingInfo((prev) => ({
        phone:
          cart.billingInfo?.phone ?? collaborator?.phonenumber ?? prev.phone,
        ruc: cart.billingInfo?.ruc ?? prev.ruc,
        businessname: cart.billingInfo?.businessname ?? prev.businessname,
        fiscaladdress: cart.billingInfo?.fiscaladdress ?? prev.fiscaladdress,
      }));
  }, [cart, collaborator]);

  return (
    <CheckoutContext.Provider
      value={{
        onlinePay,
        setOnlinePay,
        step,
        setStep,
        address,
        handleCheckAddress,
        ordersDeliveryInfo,
        setOrdersDeliveryInfo,
        deliveryStep,
        setDeliveryStep,
        goToOrdersSection,
        deliveryInfo,
        setDeliveryInfo,
        billingInfo,
        setBillingInfo,
        handleDeliveryInformation,
        handlerBillingInfo,
        promotions,
        receiver,
        setReceiver,
        totalDelivery,
        partnersPromotionsDiscount,
        finalPrice,
        terms,
        setTerms,
        useStars,
        setUseStars,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (context === null) {
    throw new Error("useCheckout must be used within an CheckoutProvider");
  }
  return context;
};
