import { ACCOUNT_STEPS, useAccount } from "../../../context/account-context"
import React, { useEffect } from "react"
import { Center, Loader, Modal, Space, Stack, Stepper, Text, useMantineTheme } from "@mantine/core"
import { useRouter } from "next/router"

interface AccountProviderProps {
    children?: React.ReactNode
  }  

const AccountLayout: React.FC<AccountProviderProps> = ({ children }) => {
  const { accountStep, updateStep, isLogged, checkSession } = useAccount()

  const router = useRouter()
  
  useEffect(() => {
    checkSession()
  }, [checkSession])

  if (!isLogged) {
    return (
      <Center>
        <Loader />
      </Center>
    )
  }

  const handleStepper = (stepIndex: number) => {
    if (stepIndex == 0 && accountStep == ACCOUNT_STEPS.UNCOMPLETE) {
        router.push("/account/proffile")
    }else if (stepIndex == 1 && accountStep == ACCOUNT_STEPS.PROFFILECOMPLETED ) {
        updateStep(ACCOUNT_STEPS.VERIFIED)
    }else if (stepIndex == 2 && accountStep == ACCOUNT_STEPS.VERIFIED) {
        router.push("/account/security")
    }
  }

  return (
    <>
        <Modal
            opened={accountStep != ACCOUNT_STEPS.COMPLETED}
            onClose={()=>null}
            overlayOpacity={0.55}
            overlayBlur={3}
            withCloseButton={false}
            centered={true}
            size="50%"
        >
                <Center>
                    <Text sx={({ width: "75%"})} size="lg">Estás a 3 pasos de poder disfrutar de todos los benificios que tenemos para ti.</Text>
                </Center>
                <Space  h="lg"/>
                <Stepper active={accountStep} onStepClick={handleStepper}>
                    <Stepper.Step label="Completar tu perfil"></Stepper.Step>
                    <Stepper.Step label="Verificar email"></Stepper.Step>
                    <Stepper.Step label="Actualizar Contrasena"></Stepper.Step>
                </Stepper>
                <Space  h="lg"/>
                <Center>
                    <Text sx={({ width: "75%"})} size="lg" align="justify">Acuérdate que no podrás acceder a la tienda hasta que completes todos los pasos
                    anteriores. Si necesitas ayuda, escribenos a xx@xx o llamanos al +51 xxxxxxxxx.</Text>
                </Center>
        </Modal>
        {children}
    </>
  )


}

export default AccountLayout
