import { useRouter } from "next/router"
import React, { createContext, useCallback, useContext, useState } from "react"

export enum ACCOUNT_STEPS {
    UNCOMPLETE,
    PROFFILECOMPLETED,
    VERIFIED,
    COMPLETED,    
}

export interface Customer {
  name: String
  documentKind: String,
  document: String,
}

interface AccountContext {
  accountStep: ACCOUNT_STEPS
  updateStep: (nextStep: ACCOUNT_STEPS) => void
  isLogged: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  checkSession: () => void
  handleLogout: () => void
  currentCustomer: Customer
}

const AccountContext = createContext<AccountContext | null>(null)

interface AccountProviderProps {
  children?: React.ReactNode
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const [ accountStep, setStep ] = useState<ACCOUNT_STEPS>(ACCOUNT_STEPS.UNCOMPLETE)
  const isLogged = useState<boolean>(false)

  const router = useRouter()

  const updateStep = ( nextStep : ACCOUNT_STEPS ) => {
    setStep(nextStep)
    router.push("/home")
  }

  const checkSession = useCallback(() => {
    if (!isLogged) {
      router.push("/login")
    }
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  const currentCustomer: Customer = {
    name: 'Juan Vargas',
    documentKind: 'DNI',
    document: '77777777',
  }

  return (
    <AccountContext.Provider
      value={{
        accountStep,
        updateStep,
        isLogged,
        checkSession,
        handleLogout,
        currentCustomer,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export const useAccount = () => {
  const context = useContext(AccountContext)

  if (context === null) {
    throw new Error("useAccount must be used within a AccountProvider")
  }
  return context
}
