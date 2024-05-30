import { Button, Link, Typography } from "@mui/material";
import React from "react";
import BaseModal from "@modules/components/BaseModal";
import { useRegister } from "./Context";

const VerificationModal = React.forwardRef<HTMLDivElement>(() => {
  const { onClose, registerForm, handleRegister, setStep } = useRegister();

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
      <Typography textAlign="center" fontSize={12} fontWeight="lighter">
        ¿No has recibido el correo?
        <br />
        <Link
          display="inline"
          component="button"
          fontWeight={600}
          onClick={(e) => {
            e.preventDefault();
            handleRegister(registerForm);
          }}
        >
          Reenviar verificación
        </Link>
        {" o "}
        <Link
          display="inline"
          component="button"
          fontWeight={600}
          onClick={(e) => {
            e.preventDefault();
            setStep(2);
          }}
        >
          Cambiar correo
        </Link>
      </Typography>
    </BaseModal>
  );
});

VerificationModal.displayName = "VerificationModal";

export default VerificationModal;
