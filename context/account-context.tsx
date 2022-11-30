import { useRouter } from "next/router"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import Customer from "../interfaces/customerInterface"

export enum ACCOUNT_STEPS {
    UNCOMPLETE,
    PROFFILECOMPLETED,
    VERIFIED,
    COMPLETED,    
}

interface AccountContext {
  accountStep: ACCOUNT_STEPS
  updateStep: (nextStep: ACCOUNT_STEPS) => void
  isLogged: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  checkSession: () => boolean
  handleLogin: () => void
  handleLogout: () => void
  currentCustomer: Customer
  updateCustomer: (customer: Customer) => void
}

const AccountContext = createContext<AccountContext | null>(null)

interface AccountProviderProps {
  children?: React.ReactNode
}

export const AccountProvider = ({ children }: AccountProviderProps) => {
  const [ accountStep, setStep ] = useState<ACCOUNT_STEPS>(ACCOUNT_STEPS.COMPLETED)
  const [ currentCustomer, setCustomer ] = useState<Customer>(
    {
      name: 'Juan Vargas',
      documentKind: 'DNI',
      document: '77777777',
      email: 'example@mail.com',
      cellPhone: '',
      workPlace: '',
      workAddress: 'Jr. Dirección N°251',
      acceptPublicity: false
    }
  )
  console.log("Create new account provider")
  const isLogged = useState<boolean>(false)
  const [ authorized, setAuthorized ] = isLogged

  const router = useRouter()

  const updateStep = ( nextStep : ACCOUNT_STEPS ) => {
    setStep(nextStep)
    router.push("/home")
  }

  const handleLogin = () => {
    setAuthorized(true)
    localStorage.setItem("login_token", "logged")
  }

  const handleLogout = () => {
    setAuthorized(false)
    localStorage.removeItem("login_token")
  }

  const updateCustomer = (customer: Customer) => {
    setCustomer(customer)
  }

  const checkSession = () => {
    console.log("check")
    if (authorized) return true
    return false
  }

  useEffect(() => {
    const loggedToken = localStorage.getItem("login_token")
    if (loggedToken) {
      setAuthorized(true)
    } else {
      router.push("/login")
    }
  }, [authorized]);

  return (
    <AccountContext.Provider
      value={{
        accountStep,
        updateStep,
        isLogged,
        checkSession,
        handleLogin,
        handleLogout,
        currentCustomer,
        updateCustomer,
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
