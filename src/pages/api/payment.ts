import { GET_CART } from "@graphql/cart/queries";
import { Cart } from "@interfaces/cart";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL,
    fetchOptions: {
      method: "POST", // o 'POST'
    },
  }),
  cache: new InMemoryCache(),
});

interface AdflyResponse {
  success: boolean;
  message: string;
  token: string;
  data: any;
  error: any;
}

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { transactionToken } = req.body;
    const { purchaseNumber, amount, collaboratorid } = req.query;

    try {
      const { data } = await client.query<{ getCart: Cart }>({
        query: GET_CART,
        variables: { collaboratorId: collaboratorid },
      });
      const cartdata = data.getCart;
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
          transactionToken: transactionToken,
          uuiddeliveryinfo: cartdata.deliveryInfo?.uuiddeliveryinfo,
          uuidbillinginfo: cartdata.billingInfo?.uuidbillinginfo,
          isreceiver: hasReceiverName,
          isbilling: hasRUC,
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
        res.status(302).setHeader("Location", location);
        res.end();
      } else {
        if (response.data.data) {
          res
            .status(302)
            .setHeader(
              "Location",
              `/error?message=${encodeURIComponent(
                JSON.stringify(response.data.data)
              )}`
            );
          res.end();
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
            errorToSend = `${JSON.stringify(
              axiosError.response.data.data.data
            )}`;
            errorDataResponse = JSON.stringify(
              axiosError.response.data.data.data
            );
          }
        } else if (axiosError.response.data.error) {
          errorToSend = `${JSON.stringify(axiosError.response.data.error)}`;
        }
      }
      res
        .status(302)
        .setHeader(
          "Location",
          `/error?message=${encodeURIComponent(
            errorToSend
          )}&data=${encodeURIComponent(
            errorDataResponse
          )}&purchase=${encodeURIComponent(purchaseNumber)}`
        );
      res.end();
    }
  } else {
    // Manejo de otros métodos HTTP
    res.status(405).send({ message: "Method Not Allowed" });
  }
}
