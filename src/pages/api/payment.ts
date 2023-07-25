import axios, { AxiosError, AxiosResponse } from "axios";

interface AdflyResponse {
  success: boolean;
  message: string;
  token: string;
  data: any;
}

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { transactionToken } = req.body;
    const { purchaseNumber, amount } = req.query;

    try {
      const response: AxiosResponse<AdflyResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/store/order`,
        {
          transactiontoken: transactionToken,
          purchasenumber: purchaseNumber,
          amount: Number(amount),
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
