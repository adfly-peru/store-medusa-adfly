import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import Address from "@interfaces/address-interface";
import Customer from "@interfaces/customerInterface";

export enum ACCOUNT_STEPS {
  UNCOMPLETE,
  PROFFILECOMPLETED,
  VERIFIED,
  COMPLETED,
}

interface AccountContext {
  accountStep: ACCOUNT_STEPS;
  updateStep: (nextStep: ACCOUNT_STEPS) => void;
  checkSession: () => boolean;
  handleLogin: (values: { email: string; password: string }) => void;
  handleLogout: () => void;
  currentCustomer: Customer;
  updateCustomer: (customer: Customer) => void;
  status: string;
  addresses: Address[];
  editAddresses: (newAddresses: Address[]) => void;
}

const AccountContext = createContext<AccountContext | null>(null);

interface AccountProviderProps {
  children?: React.ReactNode;
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const { status } = useSession();
  const [accountStep, setStep] = useState<ACCOUNT_STEPS>(
    ACCOUNT_STEPS.UNCOMPLETE
  );
  const [currentCustomer, setCustomer] = useState<Customer>({
    name: "Juan Vargas",
    documentKind: "DNI",
    document: "77777777",
    email: "",
    cellPhone: "",
    workPlace: "",
    workAddress: "Jr. Dirección N°251",
    acceptPublicity: false,
  });
  const [addresses, setAddresses] = useState<Address[]>([]);

  const router = useRouter();

  const updateStep = (nextStep: ACCOUNT_STEPS) => {
    setStep(nextStep);
    localStorage.setItem(
      "adfly_account",
      JSON.stringify({
        currentStep: nextStep,
        currentCustomer: currentCustomer,
      })
    );
    router.push("/home");
  };

  const handleLogin = (values: { email: string; password: string }) => {
    signIn("credentials", {
      redirect: false,
      username: values.email,
      password: values.password,
    });
  };

  const handleLogout = () => {
    signOut();
    setStep(ACCOUNT_STEPS.UNCOMPLETE);
    localStorage.removeItem("adfly_account");
  };

  const updateCustomer = (customer: Customer) => {
    setCustomer(customer);
    localStorage.setItem(
      "adfly_account",
      JSON.stringify({ currentStep: accountStep, currentCustomer: customer })
    );
  };

  const checkSession = () => {
    if (status == "authenticated") return true;
    return false;
  };

  const editAddresses = (newAddress: Address[]) => {
    setAddresses(newAddress);
  };

  useEffect(() => {
    const accountInfo = localStorage.getItem("adfly_account");
    if (accountInfo) {
      const accountJson = JSON.parse(accountInfo) as {
        currentStep: ACCOUNT_STEPS;
        currentCustomer: Customer;
      };
      setStep(accountJson.currentStep);
      setCustomer(accountJson.currentCustomer);
    }
  }, []);

  return (
    <AccountContext.Provider
      value={{
        accountStep,
        updateStep,
        checkSession,
        handleLogin,
        handleLogout,
        currentCustomer,
        updateCustomer,
        status,
        addresses,
        editAddresses,
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
