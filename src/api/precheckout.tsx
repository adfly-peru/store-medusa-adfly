import { Address } from "@interfaces/address-interface";
import { Cart } from "@interfaces/cart";
import axios from "axios";

export const precheckoutQuery = async (cartdata: Cart, address?: Address) => {
  try {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("collaboratortoken");
      if (storedToken) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/checkout`,
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
            comb_address: address?.department ?? "",
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
          console.log(response.data.data);
          const responseData = response.data.data.data;
          return {
            CartPromotion: {
              UuidPromotion: responseData.cart_promotion.uuid_promotion,
              Discount: responseData.cart_promotion.discount,
            },
            PartnerPromotions: responseData.partner_promotions.map(
              (partnerPromo: any) => ({
                UUIDPartner: partnerPromo.uuid_partner,
                DiscountPromotion: {
                  UuidPromotion: partnerPromo.discount_promotion.uuid_promotion,
                  Discount: partnerPromo.discount_promotion.discount,
                },
                FreeShippingPromotion: {
                  UuidPromotion:
                    partnerPromo.free_shipping_promotion.uuid_promotion,
                  FreeShipping:
                    partnerPromo.free_shipping_promotion.free_shipping,
                },
              })
            ),
          };
        }
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};
