import { CartPromotions } from "@interfaces/promotion";
import axios from "axios";
import { CartQuery } from "generated/graphql";

export const precheckoutQuery = async (
  storedToken: string,
  cartdata: NonNullable<CartQuery["cart"]>,
  department?: string | null
) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/adfly/promotion/checkout`,
    {
      partner_products: cartdata.suborders.map(
        ({ uuidcartsuborder, uuidbusiness, items }) => ({
          uuid_partner: uuidbusiness,
          uuid_cart: cartdata.uuidcart,
          uuid_cart_item: uuidcartsuborder,
          products: items.map((item) => ({
            uuid_variant: item.uuidvariant,
            uuid_category: item.variant.offer.uuiddepartment,
            quantity: item.quantity,
            uuid_department: item.variant.offer.uuiddepartment,
            uuid_campaign: item.variant.offer.uuidcampaign,
            value:
              item.variant.offerPrice ?? 0 !== 0
                ? item.variant.offerPrice ?? 0
                : item.variant.adflyPrice ?? 0,
          })),
        })
      ),
      comb_address: department ?? "",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: storedToken,
      },
    }
  );
  const status = response.status;
  if (status == 201 || status == 200) {
    const responseData = response.data.data.data;
    const cartresponse: CartPromotions = {
      CartPromotion: responseData.cart_promotion
        ? {
            UuidPromotion: responseData.cart_promotion.uuid_promotion,
            Discount: responseData.cart_promotion.discount,
          }
        : undefined,
      PartnerPromotions: responseData.partner_promotions?.map(
        (partnerPromo: any) =>
          partnerPromo
            ? {
                UUIDPartner: partnerPromo.uuid_partner,
                DiscountPromotion: partnerPromo.discount_promotion
                  ? {
                      UuidPromotion:
                        partnerPromo.discount_promotion.uuid_promotion,
                      Discount: partnerPromo.discount_promotion.discount,
                    }
                  : undefined,
                FreeShippingPromotion: partnerPromo.free_shipping_promotion
                  ? {
                      UuidPromotion:
                        partnerPromo.free_shipping_promotion.uuid_promotion,
                      FreeShipping:
                        partnerPromo.free_shipping_promotion.free_shipping,
                    }
                  : undefined,
              }
            : undefined
      ),
    };
    return cartresponse;
  }
  throw new Error("Error checking promotions");
};
