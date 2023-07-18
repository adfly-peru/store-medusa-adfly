import { createToken } from "@modules/checkout/components/payment-button";
import { createOrder } from "api/order";
import axios from "axios";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { transactionToken } = req.body;
    const { purchaseNumber, amount } = req.query;

    let accessToken = await createToken();

    const authorizationResponse = await axios.post(
      `https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce/456879852`,
      {
        channel: "web",
        captureType: "manual",
        countable: true,
        order: {
          tokenId: transactionToken,
          purchaseNumber: purchaseNumber,
          amount: amount,
          currency: "PEN",
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }
    );

    if (authorizationResponse.status == 200) {
      const authBody = {
        purchasenumber: authorizationResponse.data.order.purchaseNumber,
        amount: authorizationResponse.data.order.amount,
        installment: authorizationResponse.data.order.installment,
        currency: authorizationResponse.data.order.currency,
        authorizedamount: authorizationResponse.data.order.authorizedAmount,
        transactionid: authorizationResponse.data.dataMap.TRANSACTION_ID,
        transactiondate: authorizationResponse.data.dataMap.TRANSACTION_DATE,
        status: authorizationResponse.data.dataMap.STATUS,
      };
      const response = await createOrder(authBody);
      if (response == null) {
        res
          .status(302)
          .setHeader(
            "Location",
            `/error?message=${encodeURIComponent("Error creating order")}`
          );
        res.end();
      } else {
        res.status(302).setHeader("Location", `/orders/${response}`);
        res.end();
      }
    } else {
      res
        .status(302)
        .setHeader(
          "Location",
          `/error?message=${encodeURIComponent("Error in Niubiz Transaction")}`
        );
      res.end();
    }
  } else {
    // Manejo de otros métodos HTTP
    res.status(405).send({ message: "Method Not Allowed" });
  }
}
