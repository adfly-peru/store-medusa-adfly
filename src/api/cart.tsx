import { AddressInfoForm } from "@interfaces/address-interface";
import { BillingForm } from "@interfaces/billing";
import axios from "axios";

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
  uuidcollaboratoraddress: string,
  addressinfo: AddressInfoForm
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
  deliverymethod: string
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
