import { Button, Typography } from "@mui/material";
import React from "react";
import BaseModal from "@modules/components/BaseModal";
import { useRegister } from "./Context";

const VerificationModal = React.forwardRef<HTMLDivElement>(() => {
  const { onClose, registerForm } = useRegister();

  return (
    <BaseModal title={"Verifica tu correo"} onClose={onClose}>
      <Typography variant="subtitle2" fontSize={13}>
        Te hemos enviado un link de verificación a{" "}
        <Typography variant="inherit" component="span" fontWeight={700}>
          {registerForm.email}
        </Typography>{" "}
        para confirmar tu cuenta.
      </Typography>
      <Button fullWidth variant="contained" onClick={onClose}>
        Volver al inicio
      </Button>
      <Typography textAlign="center" fontSize={10} fontWeight="lighter">
        ¿No has recibido el correo?
        <br />
      </Typography>
    </BaseModal>
  );
});

VerificationModal.displayName = "VerificationModal";

export default VerificationModal;
