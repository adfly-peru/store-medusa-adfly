import { Preferences } from "@interfaces/collaborator";
import { surveyQuery } from "api/auth";
import axios from "axios";
import {
  GetCollaboratorQuery,
  useGetCollaboratorQuery,
} from "generated/graphql";
import { signIn, useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  const { data: collaboratorData, refetch } = useGetCollaboratorQuery({
    onCompleted(data) {
      setCollaborator(data.collaborator);
    },
    onError(error) {
      if (error.message === "access denied: user not authenticated")
        setCollaborator(undefined);
    },
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
    if (session?.user?.accessToken) {
      refetch().then((data) => setCollaborator(data.data.collaborator));
    } else {
      setCollaborator(undefined);
    }
  }, [session?.user?.accessToken, refetch]);

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
