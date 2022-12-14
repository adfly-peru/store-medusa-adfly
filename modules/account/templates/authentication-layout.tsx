import { ACCOUNT_STEPS, useAccount } from "../../../context/account-context"
import React, { useEffect } from "react"
import { Center, Loader, LoadingOverlay, Modal, Space, Stack, Stepper, Text, Tooltip, useMantineTheme } from "@mantine/core"
import { useRouter } from "next/router"
import { IconMailOpened, IconShieldCheck, IconUserCheck } from "@tabler/icons"

interface AccountProviderProps {
    children?: React.ReactNode
  }  

const AuthLayout: React.FC<AccountProviderProps> = ({ children }) => {
  const { status } = useAccount()
  const router = useRouter()

  useEffect(() => {
    if (status == "unauthenticated") {
        router.push("/login")
    }
  });


  return (
    <>
        <LoadingOverlay visible={status != "authenticated"} overlayBlur={2} overlayOpacity={0.9}
 />
        {children}
    </>
  )


}

export default AuthLayout
