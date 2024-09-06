import { useAccount } from "@context/account-context";
import { Icon } from "@iconify/react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { forwardRef } from "react";

const RegisterBenefitsModal = forwardRef<
  HTMLDivElement,
  {
    onClose: () => void;
  }
>((props, _) => {
  const { handleAuthentication } = useAccount();
  const handleAction = () => {
    props.onClose();
    handleAuthentication();
  };

  return (
    <Box
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      maxWidth="100vw"
      overflow="auto"
    >
      <Box width={644} borderRadius="20px" overflow="hidden">
        <Box bgcolor="primary.main" p="15px 50px">
          <Typography
            variant="body1"
            color="white"
            fontSize={26}
            fontWeight={700}
            lineHeight="normal"
            textAlign="center"
            fontFamily={'"Montserrat", sans-serif'}
          >
            Regístrate ahora y aprovecha todos los beneficios que tenemos para
            ti:
          </Typography>
        </Box>
        <Box
          height="100%"
          bgcolor="white"
          p="30px"
          display="flex"
          flexDirection="column"
          gap="40px"
        >
          <Box display="flex" gap="40px">
            <Box
              width={267.63}
              component={Paper}
              elevation={3}
              borderRadius="20px"
              p="15px 25px"
              display="flex"
              gap="14px"
            >
              <Image
                src="/modals/reg_ben/ripley.svg"
                alt="ripley_modal_img"
                width={10}
                height={10}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
              <Box>
                <Typography fontSize={23} fontWeight={700} lineHeight="normal">
                  Dscto de
                </Typography>
                <Typography
                  color="primary.main"
                  fontSize={49}
                  fontWeight={700}
                  lineHeight="normal"
                >
                  40%
                </Typography>
              </Box>
            </Box>
            <Box
              width={267.63}
              component={Paper}
              elevation={3}
              borderRadius="20px"
              p="15px 25px"
              display="flex"
              gap="14px"
            >
              <Image
                src="/modals/reg_ben/pizzahut.svg"
                alt="pizzahut_modal_img"
                width={10}
                height={10}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
              <Box>
                <Typography fontSize={23} fontWeight={700} lineHeight="normal">
                  Dscto de
                </Typography>
                <Typography
                  color="primary.main"
                  fontSize={49}
                  fontWeight={700}
                  lineHeight="normal"
                >
                  47%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display="flex" gap="40px">
            <Box
              width={267.63}
              component={Paper}
              elevation={3}
              borderRadius="20px"
              p="15px 25px"
              display="flex"
              gap="14px"
            >
              <Image
                src="/modals/reg_ben/bking.svg"
                alt="burgerking_modal_img"
                width={10}
                height={10}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
              <Box>
                <Typography fontSize={23} fontWeight={700} lineHeight="normal">
                  Dscto de
                </Typography>
                <Typography
                  color="primary.main"
                  fontSize={49}
                  fontWeight={700}
                  lineHeight="normal"
                >
                  33%
                </Typography>
              </Box>
            </Box>
            <Box
              width={267.63}
              component={Paper}
              elevation={3}
              borderRadius="20px"
              p="15px 25px"
              display="flex"
              gap="14px"
            >
              <Image
                src="/modals/reg_ben/kfc.svg"
                alt="kfc_modal_img"
                width={10}
                height={10}
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
              <Box>
                <Typography fontSize={23} fontWeight={700} lineHeight="normal">
                  Dscto de
                </Typography>
                <Typography
                  color="primary.main"
                  fontSize={49}
                  fontWeight={700}
                  lineHeight="normal"
                >
                  33%
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box alignSelf="center" color="primary.main" pb="44px">
            <Box width="fit-content">
              <Button
                variant="contained"
                sx={{
                  fontWeight: 700,
                  fontSize: 27,
                  p: "10px 27px",
                  borderRadius: "20px",
                  height: 53,
                }}
                onClick={handleAction}
              >
                REGISTRARME AHORA
              </Button>
              <Icon
                icon="streamline:cursor-click-solid"
                fontSize={44}
                style={{
                  position: "absolute",
                  bottom: "44px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

RegisterBenefitsModal.displayName = "RegisterBenefitsModal";

export default RegisterBenefitsModal;
