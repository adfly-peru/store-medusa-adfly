import axios from "axios";
import { getExtension, uploadImage } from "./commons";
import { MarketPlaceItemForm } from "@modules/marketplace/Creation";

export const requestMarketplaceItem = async (
  token: string,
  payload: {
    uuid_business: string;
    uuid_marketplace_item: string;
    name: string;
    last_name: string;
    email: string;
    phone: string;
    include_phone: boolean;
    message: string;
  }
) => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/marketplace/request`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
};

export const createMarketplace = async (
  token: string,
  uuid_business: string,
  payload: MarketPlaceItemForm
) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/marketplace`,
    {
      uuid_business,
      title: payload.title,
      price: Number(payload.price),
      brand: payload.brand,
      status: payload.status?.value,
      description: payload.description,
      country: payload.country,
      department: payload.department.map((d) => d.departamento).join(","),
      shipping_method: payload.shipping_method.join(","),
      workplace_delivery: payload.workplace_delivery
        .map((w) => w.uuidworkplace)
        .join(","),
      payment_method: payload.payment_method.join(","),
      other_payment_method: payload.other_payment_method,
      valid_period: new Date(
        Date.now() + Number(payload.valid_period?.value) * 24 * 60 * 60 * 1000
      ).toISOString(),
      number_images: 0,
      extension_images: getExtension(payload.images[0].type),
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  const status = response.status;
  if (status == 201 || status == 200) {
    // Put image
    if (response.data) {
      console.log({ response: response.data });
      const { images: imgUrls } = response.data.data.data;
      for (let i = 0; i < imgUrls.length; i++) {
        const imgurl = imgUrls[i] as string;
        if (imgurl && payload.images[i]) {
          const responseImg = await uploadImage(imgurl, payload.images[i]);
          console.log(responseImg);
        }
      }
    }
    return;
  }
  throw new Error("There was no url for file");
};
