import { AddressInfoForm } from "@interfaces/address-interface";
import { BillingForm } from "@interfaces/billing";
import { Cart } from "@interfaces/cart";
import axios, { AxiosError, AxiosResponse } from "axios";

export const createCart = async (
  collaboratorid: string
): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      if (collaboratorid) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/store/cart`,
          {
            uuidcollaborator: collaboratorid,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const status = response.status;
        if (status == 201 || status == 200) {
          return null;
        }
      }
    }
    return "Error creating cart";
  } catch (error) {
    return "Error creating cart";
  }
};

export interface CouponResponse {
  couponCode: string;
  status: string;
}

export const generateCouponRequest = async (
  uuid_variant: string,
  uuid_product: string
): Promise<CouponResponse> => {
  try {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("collaboratortoken");
      if (storedToken) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/store/order/coupon`,
          {
            uuid_variant,
            uuid_product,
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
          const { data } = response.data;
          console.log(data);
          return { couponCode: data.couponCode, status: "success" };
        }
      }
    }
    return { couponCode: "", status: "failed" };
  } catch (error) {
    return { couponCode: "", status: "failed" };
  }
};

interface ManageItemBody {
  uuiditem: string;
  uuidcart: string;
  uuidvariant: string;
  uuidbusiness: string;
  quantity: number;
  operation: string;
}

export const manageItem = async (
  data: ManageItemBody
): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/store/cart`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const status = response.status;
      if (status == 201 || status == 200) {
        return null;
      }
    }
    return "Error in manage item";
  } catch (error) {
    return "Error in manage item";
  }
};

export const editBillingInfo = async (
  uuidcollaborator: string,
  uuidcart: string,
  billingform: BillingForm
): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("collaboratortoken");
      if (storedToken) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/store/cart/billing-info`,
          {
            uuidcollaborator: uuidcollaborator,
            uuidcart: uuidcart,
            phone: billingform.phone == "" ? null : billingform.phone,
            ruc: billingform.ruc == "" ? null : billingform.ruc,
            businessname:
              billingform.businessname == "" ? null : billingform.businessname,
            fiscaladdress:
              billingform.fiscaladdress == ""
                ? null
                : billingform.fiscaladdress,
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
          return null;
        }
      }
    }
    return "Error in billing info";
  } catch (error) {
    return "Error in billing info";
  }
};

export const editDeliveryInfo = async (
  uuidcollaborator: string,
  uuidcart: string,
  addressinfo: AddressInfoForm,
  uuidcollaboratoraddress: string
): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("collaboratortoken");
      if (storedToken) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/store/cart/delivery-info`,
          {
            uuidcollaborator: uuidcollaborator,
            uuidcart: uuidcart,
            uuidcollaboratoraddress: uuidcollaboratoraddress,
            receivername:
              addressinfo.receivername == "" ? null : addressinfo.receivername,
            receiverdocumentkind:
              addressinfo.receiverdocumentkind == ""
                ? null
                : addressinfo.receiverdocumentkind,
            receiverdocumentnumber:
              addressinfo.receiverdocumentnumber == ""
                ? null
                : addressinfo.receiverdocumentnumber,
            phonenumber:
              addressinfo.receiverphone == ""
                ? null
                : addressinfo.receiverphone,
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
          return null;
        }
      }
    }
    return "Error in delivery info";
  } catch (error) {
    return "Error in delivery info";
  }
};

export const editDeliveryMethod = async (
  uuidcartsuborder: string,
  deliverymethod: string,
  uuidaddress: string
): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("collaboratortoken");
      if (storedToken) {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/store/cart/delivery-method`,
          {
            uuidcartsuborder: uuidcartsuborder,
            deliverymethod: deliverymethod,
            uuidadddress: uuidaddress,
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
          return null;
        }
      }
    }
    return "Error in delivery info";
  } catch (error) {
    return "Error in delivery info";
  }
};

interface AdflyResponse {
  success: boolean;
  message: string;
  token: string;
  data: any;
  error: any;
}

export const payCart = async (
  purchaseNumber: string,
  cartdata: Cart,
  amount: number,
  stars: number
) => {
  try {
    const hasReceiverName =
      (cartdata.deliveryInfo?.receivername?.length ?? 0) > 0;
    const hasRUC = (cartdata.billingInfo?.ruc?.length ?? 0) > 0;
    const response: AxiosResponse<AdflyResponse> = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/store/order`,
      {
        purchaseNumber,
        suborders: cartdata.suborders,
        uuidcollaborator: cartdata.uuidcollaborator,
        total: cartdata.total,
        uuidcart: cartdata.uuidcart,
        amount: Number(amount),
        transactionToken: "",
        uuiddeliveryinfo: cartdata.deliveryInfo?.uuiddeliveryinfo,
        uuidbillinginfo: cartdata.billingInfo?.uuidbillinginfo,
        isreceiver: hasReceiverName,
        isbilling: hasRUC,
        stars: Number(stars),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status >= 200 && response.status < 300) {
      // const pNumber = response.data.data.data.purchaseNumber;
      const orderid = response.data.data.data.orderid;
      const niubizdata = response.data.data.data.niubizResponse;
      const location = `/success?id=${encodeURIComponent(
        orderid
      )}&data=${encodeURIComponent(
        JSON.stringify(niubizdata)
      )}&number=${encodeURIComponent(purchaseNumber)}`;
      return location;
    } else {
      if (response.data.data) {
        return `/error?message=${encodeURIComponent(
          JSON.stringify(response.data.data)
        )}`;
      }
    }
  } catch (error) {
    const axiosError = error as AxiosError<AdflyResponse>;
    let errorToSend = `Error al hacer la solicitud: ${JSON.stringify(error)}`;
    let errorDataResponse = JSON.stringify(axiosError);
    if (axiosError && axiosError.response) {
      errorToSend = `Error: ${JSON.stringify(axiosError.response.data)}`;
      errorDataResponse = JSON.stringify(axiosError.response.data);
      if (axiosError.response.data.data) {
        errorToSend = `${JSON.stringify(axiosError.response.data.data)}`;
        errorDataResponse = JSON.stringify(axiosError.response.data.data);
        if (axiosError.response.data.data.data) {
          errorToSend = `${JSON.stringify(axiosError.response.data.data.data)}`;
          errorDataResponse = JSON.stringify(
            axiosError.response.data.data.data
          );
        }
      } else if (axiosError.response.data.error) {
        errorToSend = `${JSON.stringify(axiosError.response.data.error)}`;
      }
    }
    return `/error?message=${encodeURIComponent(
      errorToSend
    )}&data=${encodeURIComponent(
      errorDataResponse
    )}&purchase=${encodeURIComponent(purchaseNumber)}`;
  }
};
