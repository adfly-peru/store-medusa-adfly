import Layout from "@modules/layout/templates";
import CheckoutTemplate from "@modules/checkout/templates";
import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";

const CheckoutPage = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (window.google) {
      setIsScriptLoaded(true); // Si Google ya se ha cargado anteriormente.
    }
  }, []);
  return (
    <Layout>
      {!isScriptLoaded ? (
        <LoadScript
          googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
          libraries={["places"]}
          onLoad={() => setIsScriptLoaded(true)}
        >
          <CheckoutTemplate />
        </LoadScript>
      ) : (
        <CheckoutTemplate />
      )}
    </Layout>
  );
};

export default CheckoutPage;
