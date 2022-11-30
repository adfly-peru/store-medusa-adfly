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
  const [ accountStep, setStep ] = useState<ACCOUNT_STEPS>(ACCOUNT_STEPS.UNCOMPLETE)
  const [ currentCustomer, setCustomer ] = useState<Customer>(
    {
      name: 'Juan Vargas',
      documentKind: 'DNI',
      document: '77777777',
      email: '',
      cellPhone: '',
      workPlace: '',
      workAddress: 'Jr. Dirección N°251',
      acceptPublicity: false
    }
  )
  const isLogged = useState<boolean>(false)
  const [ authorized, setAuthorized ] = isLogged

  const router = useRouter()

  const updateStep = ( nextStep : ACCOUNT_STEPS ) => {
    setStep(nextStep)
    localStorage.setItem("adfly_account", JSON.stringify({ currentStep: nextStep, currentCustomer: currentCustomer }))
    router.push("/home")
  }

  const handleLogin = () => {
    setAuthorized(true)
    localStorage.setItem("login_token", "logged")
  }

  const handleLogout = () => {
    setAuthorized(false)
    setStep(ACCOUNT_STEPS.UNCOMPLETE)
    localStorage.removeItem("login_token")
    localStorage.removeItem("adfly_account")
  }

  const updateCustomer = (customer: Customer) => {
    setCustomer(customer)
    localStorage.setItem("adfly_account", JSON.stringify({ currentStep: accountStep, currentCustomer: customer }))
  }

  const checkSession = () => {
    if (authorized) return true
    return false
  }

  useEffect(() => {
    const accountInfo = localStorage.getItem("adfly_account")
    if (accountInfo) {
      const accountJson = (JSON.parse(accountInfo) as { currentStep: ACCOUNT_STEPS, currentCustomer: Customer })
      setStep(accountJson.currentStep)
      setCustomer(accountJson.currentCustomer)
    }
  }, []);

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
