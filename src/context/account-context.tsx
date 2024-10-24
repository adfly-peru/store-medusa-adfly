import { useApolloClient } from "@apollo/client";
import { Preferences } from "@interfaces/collaborator";
import { surveyQuery } from "api/auth";
import axios from "axios";
import {
  GetCollaboratorQuery,
  useGetCollaboratorQuery,
} from "generated/graphql";
import { signIn, useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";

interface AccountContext {
  collaborator: GetCollaboratorQuery["collaborator"] | undefined;
  isOpenSignIn: boolean;
  isOpenSignUp: boolean;
  setIsOpenSignIn: (v: boolean) => void;
  setIsOpenSignUp: (v: boolean) => void;
  handleAuthentication: () => void;
  survey: (preferences: Preferences) => Promise<string | null>;
}

const AccountContext = createContext<AccountContext | null>(null);

interface AccountProviderProps {
  children?: React.ReactNode;
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const [collaborator, setCollaborator] =
    useState<GetCollaboratorQuery["collaborator"]>();
  const { data: session } = useSession();
  const client = useApolloClient();
  const { data: collaboratorData, refetch } = useGetCollaboratorQuery({
    onCompleted(data) {
      setCollaborator(data.collaborator);
    },
    onError(error) {
      if (error.message === "access denied: user not authenticated")
        setCollaborator(undefined);
    },
    skip: !session?.user?.accessToken,
  });

  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);

  const handleAuthentication = () => {
    if (!!session?.user?.accessToken) return;
    else if (session?.user?.completeregistration) setIsOpenSignIn(true);
    else setIsOpenSignUp(true);
  };

  const survey = async (preferences: Preferences) => {
    const response = await surveyQuery({
      preferences: {
        whatdoyouwant:
          preferences.whatdoyouwant ??
          collaboratorData?.collaborator?.preferences?.whatdoyouwant ??
          undefined,
        topproducts:
          preferences.topproducts ??
          collaboratorData?.collaborator?.preferences?.topproducts ??
          undefined,
        topservices:
          preferences.topservices ??
          collaboratorData?.collaborator?.preferences?.topservices ??
          undefined,
        toppromotions:
          preferences.toppromotions ??
          collaboratorData?.collaborator?.preferences?.toppromotions ??
          undefined,
        prefercommunication:
          preferences.prefercommunication ??
          collaboratorData?.collaborator?.preferences?.prefercommunication ??
          undefined,
        otherprefercommunication:
          preferences.otherprefercommunication ??
          collaboratorData?.collaborator?.preferences
            ?.otherprefercommunication ??
          undefined,
      },
    });
    await refetch();
    return response;
  };

  useEffect(() => {
    if (collaborator) {
      const identify = new amplitude.Identify();
      identify.set("id", collaborator.uuidcollaborator);
      identify.set("dni", collaborator.documentnumber);
      identify.set("email", collaborator.email ?? "No Email");
      identify.set("status", "Identificado con correo");
      amplitude.identify(identify);
      amplitude.track("User Logged In");
    }
  }, [collaborator]);

  useEffect(() => {
    if (session?.user?.accessToken) {
      // client.refetchQueries({
      //   include: "all",
      // });
      refetch().then((data) => setCollaborator(data.data.collaborator));
    } else {
      if (session?.user) {
        const identify = new amplitude.Identify();
        identify.set("id", session.user.id ?? "");
        identify.set("dni", session.user.dni ?? "");
        identify.set("email", session.user.email ?? "");
        if (session.user.completeregistration)
          identify.set("status", "idenficado con dni (registro completo)");
        else
          identify.set("status", "idenficado con dni (registro por completar)");
        amplitude.identify(identify);
      } else {
        const identify = new amplitude.Identify();
        amplitude.identify(identify);
      }
      setCollaborator(undefined);
    }
  }, [session?.user, refetch, client]);

  useEffect(() => {
    const verifySession = async () => {
      if (
        session?.user?.provider === "dni" &&
        session.user.documenttype &&
        session.user.dni &&
        session.user.sub_domain &&
        !session.user.completeregistration
      ) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_API}/collaborators/checkaccess`,
            {
              documenttype: session.user.documenttype,
              documentnumber: session.user.dni,
              sub_domain: session.user.sub_domain,
            }
          );

          if (response.status === 200 || response.status === 201) {
            const { complete_registration, email } = response.data.data.data;

            if (
              session.user.completeregistration !== complete_registration ||
              session.user.email !== email
            ) {
              await signIn("dni", {
                documenttype: session.user.documenttype,
                documentnumber: session.user.dni,
                sub_domain: session.user.sub_domain,
                callbackUrl: "/",
                redirect: false,
              });
            }
          }
        } catch (error) {
          console.error("Session verification error:", error);
        }
      }
    };

    if (session?.user?.provider === "dni") {
      verifySession();
    }
  }, [session]);

  return (
    <AccountContext.Provider
      value={{
        collaborator,
        isOpenSignIn,
        isOpenSignUp,
        setIsOpenSignIn,
        setIsOpenSignUp,
        handleAuthentication,
        survey,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);

  if (context === null) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
};
