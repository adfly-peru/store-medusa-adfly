import Address from "@interfaces/address-interface";
import axios from "axios";

export const createAddress = async (
  collaboratorid: string,
  address: Address
): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("collaboratortoken");
      if (storedToken && collaboratorid) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/address`,
          {
            uuidcollaborator: collaboratorid,
            alias: address.alias,
            address: address.address,
            lat: address.lat,
            lng: address.lng,
            district: address.district,
            province: address.province,
            department: address.department,
            country: address.country,
            additional: address.additional,
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
    return "Error creating cart";
  } catch (error) {
    return "Error creating cart";
  }
};
