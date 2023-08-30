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
}

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { transactionToken } = req.body;
    const { purchaseNumber, amount, collaboratorid } = req.query;

    try {
      const { collaboratorid } = req.query;

      const { data } = await client.query<{ getCart: Cart }>({
        query: GET_CART,
        variables: { collaboratorId: collaboratorid },
      });
      const cartdata = data.getCart;

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
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        res
          .status(302)
          .setHeader("Location", `/orders/${response.data.data.data}`);
        res.end();
      } else {
        // La solicitud fue exitosa, pero el código de estado indica un problema
        console.error(`Error: ${response.data.message}`);
        if (response.data.data) {
          res
            .status(302)
            .setHeader(
              "Location",
              `/error?message=${encodeURIComponent(response.data.data.data)}`
            );
          res.end();
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<AdflyResponse>;
      let errorToSend = `Error al hacer la solicitud: ${error}`;
      if (axiosError && axiosError.response) {
        errorToSend = `Error: ${axiosError.response.data}`;
        if (axiosError.response.data.data.data) {
          errorToSend = `${axiosError.response.data.data.data}`;
        }
      }
      console.error(errorToSend);
      res
        .status(302)
        .setHeader(
          "Location",
          `/error?message=${encodeURIComponent(errorToSend)}`
        );
      res.end();
    }
  } else {
    // Manejo de otros métodos HTTP
    res.status(405).send({ message: "Method Not Allowed" });
  }
}
