import { useEffect } from "react";
import { useRouter } from "next/router";

const Recovery = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      router.push(`/home?recoverytoken=${token}`);
    } else router.push("/home");
  }, [token]);

  return null;
};

export default Recovery;
