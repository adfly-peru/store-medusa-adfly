import apolloClient from "@lib/apollo-config";
import Home from "@modules/home/templates";
import { StoreDesignDocument, StoreDesignQuery } from "generated/graphql";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

interface HomeProps {
  storeDesign: StoreDesignQuery["storeDesign"] | null;
}

export default function HomePage({ storeDesign }: HomeProps) {
  const title = storeDesign?.commercialname || "";

  return (
    <>
      <Head>
        <title>{`${title} - Mi Tienda de Beneficios`}</title>
      </Head>
      <div>
        <Home />
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const subdomain = req.headers.host?.split(".")[0];

  const { data } = await apolloClient.query<StoreDesignQuery>({
    query: StoreDesignDocument,
    variables: { subdomain: subdomain ?? "" },
  });

  return {
    props: {
      storeDesign: data?.storeDesign || null,
    },
  };
}
