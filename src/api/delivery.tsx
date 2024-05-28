import axios from "axios";
import { CollaboratorAddress } from "generated/graphql";

export const createAddress = async (
  collaboratorid: string,
  address: CollaboratorAddress,
  storedToken: string
): Promise<void> => {
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
    return;
  }
  throw new Error("Error creating delivery");
};

export const updateAddressQuery = async (
  address: CollaboratorAddress,
  storedToken: string
): Promise<void> => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/address/${address.uuidcollaboratoraddress}`,
    {
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
    return;
  }
  throw new Error("Error on update delivery");
};

export const deleteAddressQuery = async (
  uuidcollaboratoraddress: string,
  storedToken: string
): Promise<void> => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/address/${uuidcollaboratoraddress}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: storedToken,
      },
    }
  );
  const status = response.status;
  if (status == 201 || status == 200) {
    return;
  }
  throw new Error("Error removing delivery");
};
