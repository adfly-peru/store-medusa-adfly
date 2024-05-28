import { Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import BaseModal from "@modules/components/BaseModal";
import { useRegister } from "./Context";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const getGoogleData = (token: string) => {
  return axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const ProviderModal = React.forwardRef<HTMLDivElement>(() => {
  const { onClose, setRegisterForm, registerForm, setStep } = useRegister();
  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getGoogleData(tokenResponse.access_token).then((response) => {
        setRegisterForm({
          ...registerForm,
          email: response?.email || "",
          token: tokenResponse.access_token,
          mode: "google",
        });
        setStep(2);
      });
    },
  });
  const nextStep = () => {
    setRegisterForm({
      ...registerForm,
      email,
      token: "",
      mode: "password",
    });
    setStep(2);
  };

  return (
    <BaseModal title={"Regístrate"} onClose={onClose}>
      <div>
        <Typography fontWeight={600} fontSize={15}>
          {`Hola ${session?.user?.name ?? ""}`}
        </Typography>
        <Typography variant="subtitle2" fontSize={13}>
          Regístrate para disfrutar de todos los beneficios que tenemos para ti.
        </Typography>
      </div>
      <Button
        sx={(_) => ({
          color: "gray",
          borderColor: "gray",
          textTransform: "unset",
          fontWeight: 400,
          fontSize: 12,
          justifyContent: "flex-start",
          gap: "10px",
        })}
        variant="outlined"
        startIcon={<Icon icon="devicon:google" />}
        onClick={() => googleLogin()}
      >
        Regístrate con G-mail
      </Button>
      <Button
        sx={(_) => ({
          color: "gray",
          borderColor: "gray",
          textTransform: "unset",
          fontWeight: 400,
          fontSize: 12,
          justifyContent: "flex-start",
          gap: "10px",
        })}
        variant="outlined"
        startIcon={<Icon icon="logos:microsoft-icon" />}
      >
        Regístrate con Microsoft
      </Button>
      <Divider
        sx={{
          fontWeight: 600,
          fontSize: 16,
          color: "gray",
          marginTop: "-10px",
          marginBottom: "-10px",
        }}
      >
        o
      </Divider>
      <Typography>Email</Typography>
      <TextField
        placeholder="example@gmail.com"
        autoComplete="off"
        variant="outlined"
        fullWidth
        size="small"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{
          marginTop: "-10px",
        }}
      />
      <Button fullWidth variant="contained" onClick={nextStep}>
        Regístrate
      </Button>
      <Typography textAlign="center" fontSize={10} fontWeight="lighter">
        Si necesitas ayuda, escríbenos a hola@adfly.pe o llámanos al +51 970 802
        065
      </Typography>
    </BaseModal>
  );
});

ProviderModal.displayName = "ProviderModal";

export default ProviderModal;
