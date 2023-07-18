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
