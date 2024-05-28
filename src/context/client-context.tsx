import {
  HttpLink,
  ApolloClient,
  from,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useSession } from "next-auth/react";
import { createContext, useContext, useMemo } from "react";

interface IClientContext {}

const ClientContext = createContext<IClientContext | null>(null);

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL_URL, // Reemplaza con tu URI de API
});

export const ClientProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const apolloClient = useMemo(() => {
    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        Authorization: token ?? "",
      },
    }));

    return new ApolloClient({
      link: from([authLink, httpLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: "cache-first",
        },
      },
    });
  }, [token]);

  return (
    <ClientContext.Provider value={{}}>
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);

  if (context === null) {
    throw new Error("useClient must be used within an ClientProvider");
  }
  return context;
};
