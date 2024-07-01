import SuccessMessage from "@modules/components/Success";
import { useRouter } from "next/router";

const SuccesPage = () => {
  const router = useRouter();
  const { number, id, data } = router.query;
  const orderData = data
    ? JSON.parse(data === "undefined" ? "{}" : (data as string))
    : null;
  return <SuccessMessage number={number} id={id} niubizData={orderData} />;
};

export default SuccesPage;
