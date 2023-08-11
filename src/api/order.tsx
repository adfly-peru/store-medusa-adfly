import axios from "axios";

export const createOrder = async (
  transactiontoken: string,
  purchasenumber: string,
  amount: string
): Promise<string | null> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/store/order`,
      {
        transactiontoken: transactiontoken,
        purchasenumber: purchasenumber,
        amount: amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const status = response.status;
    if (status == 201 || status == 200) {
      return response.data.data.data as string;
    }
    return null;
  } catch (error) {
    return null;
  }
};
