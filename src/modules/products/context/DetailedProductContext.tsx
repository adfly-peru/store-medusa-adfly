import { useAccount } from "@context/account-context";
import { useCart } from "@context/cart-context";
import { CouponResponse, generateCouponRequest } from "api/cart";
import { CartItem, ProductQuery, Variant } from "generated/graphql";
import { useSession } from "next-auth/react";
import { createContext, useContext, useMemo, useState } from "react";

interface IDetailedProductContext {
  product: NonNullable<ProductQuery["offerForCollaborator"]>["offer"];
  lastcoupon?: string | null;
  value: number;
  setValue: (v: number) => void;
  attributeSelections: Record<string, string>;
  handleAttributeSelection: (attributeName: string, value: string) => void;
  itemFromCart: CartItem | null;
  stock: number;
  maxUnitsPerUser: number;
  selectedVariant?: Variant;
  handleAddProduct: () => Promise<void>;
  handleGenerateCoupon: () => Promise<void>;
  couponResponse: CouponResponse | null;
  couponOpen: boolean;
  setCouponOpen: (v: boolean) => void;
  unitsOrdered: number;
}

const DetailedProductContext = createContext<IDetailedProductContext | null>(
  null
);

export const DetailedProductProvider = ({
  children,
  offerForCollaborator,
  refetchFunction,
}: {
  children?: React.ReactNode;
  offerForCollaborator: NonNullable<ProductQuery["offerForCollaborator"]>;
  refetchFunction: () => Promise<void>;
}) => {
  const { data: session } = useSession();
  const { collaborator, handleAuthentication } = useAccount();
  const product = offerForCollaborator.offer;
  const unitsOrdered = offerForCollaborator.totalLastPeriod ?? 0;
  const lastcoupon = offerForCollaborator.lastcoupon;

  const { getVariant, addProduct } = useCart();

  const [value, setValue] = useState<number>(0);

  const [couponResponse, setCouponResponse] = useState<CouponResponse | null>(
    null
  );
  const [couponOpen, setCouponOpen] = useState(false);

  const defaultAttributeSelections: Record<string, string> = product.variant[0]
    ? product.variant[0].attributes.reduce(
        (acc: Record<string, string>, attr) => {
          acc[attr.attributeName] = attr.value;
          return acc;
        },
        {}
      )
    : {};
  const [attributeSelections, setAttributeSelections] = useState<
    Record<string, string>
  >(defaultAttributeSelections);
  const handleAttributeSelection = (attributeName: string, value: string) => {
    setAttributeSelections((prev) => ({ ...prev, [attributeName]: value }));
  };

  const currentVariants = useMemo(
    () =>
      product.variant.filter((variant) =>
        variant.attributes.every(
          (attr) => attributeSelections[attr.attributeName] === attr.value
        )
      ),
    [attributeSelections, product.variant]
  );

  const itemFromCart = useMemo(() => {
    const firstVariant = currentVariants.at(0);
    if (!firstVariant) return null;
    return getVariant(
      firstVariant.uuidVariant,
      product.business.uuidbusiness,
      firstVariant.attributes
    );
  }, [currentVariants, getVariant, product.business.uuidbusiness]);

  const stock = useMemo(
    () =>
      currentVariants.reduce((p, c) => p + c.stock, 0) -
      (itemFromCart?.quantity ?? 0),
    [currentVariants, itemFromCart]
  );

  const maxUnitsPerUser = useMemo(() => {
    const firstVariant = currentVariants.at(0);
    if (!firstVariant) return 0;

    const maxUnitsPerVariant = Math.max(
      (firstVariant.maxQuantity ?? 0) -
        (unitsOrdered + (itemFromCart?.quantity ?? 0)),
      0
    );

    return Math.min(maxUnitsPerVariant, stock);
  }, [currentVariants, stock, unitsOrdered, itemFromCart?.quantity]);

  const selectedVariant = currentVariants.at(0);

  const handleAddProduct = async () => {
    if (!selectedVariant) return;
    if (!collaborator) {
      handleAuthentication();
      return;
    }
    try {
      await addProduct(
        selectedVariant.uuidVariant,
        product.business.uuidbusiness,
        value
      );
      setValue(0);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleGenerateCoupon = async () => {
    if (!selectedVariant) return;
    if (!collaborator) {
      handleAuthentication();
      return;
    }
    if (!session?.user?.accessToken) return;

    try {
      const response = await generateCouponRequest(
        selectedVariant.uuidVariant,
        product.uuidOffer,
        session.user.accessToken
      );
      await refetchFunction();
      setCouponResponse(response ?? null);
      setCouponOpen(true);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <DetailedProductContext.Provider
      value={{
        product,
        lastcoupon,
        value,
        setValue,
        attributeSelections,
        handleAttributeSelection,
        itemFromCart,
        stock,
        maxUnitsPerUser,
        selectedVariant,
        handleAddProduct,
        unitsOrdered,
        handleGenerateCoupon,
        couponResponse,
        couponOpen,
        setCouponOpen,
      }}
    >
      {children}
    </DetailedProductContext.Provider>
  );
};

export const useDetailedProduct = () => {
  const context = useContext(DetailedProductContext);

  if (context === null) {
    throw new Error(
      "useDetailedProduct must be used within an DetailedProductProvider"
    );
  }
  return context;
};
