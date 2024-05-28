import ErrorMessage from "@modules/components/ErrorMessage";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();
  const { message, data, purchase } = router.query;
  const orderData = (data ? JSON.parse(data as string) : null)?.data;
  return (
    <ErrorMessage purchase={purchase} message={message} orderData={orderData} />
  );
};

export default ErrorPage;
