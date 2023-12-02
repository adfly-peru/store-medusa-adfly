import {
  Text,
  Grid,
  Stack,
  Button,
  TextInput,
  Image,
  Space,
  Title,
  LoadingOverlay,
  Loader,
  Alert,
  Group,
  BackgroundImage,
  MediaQuery,
  Popover,
  Progress,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useAccount } from "@context/account-context";
import { useEffect, useState } from "react";
import { useDesign } from "@context/design-context";
import {
  PasswordRequirement,
  doesPasswordMeetRequirements,
  getStrength,
  requirements,
} from "@modules/account/components/security-form-register";
import RecoveryPage from "@modules/login/templates/recovery";
import RecoveryFormPage from "@modules/login/templates/recovery-form";

const RegisterPage = () => {
  const router = useRouter();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [error, setError] = useState("");
  const { token } = router.query;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginDesign } = useDesign();
  const { status } = useAccount();

  useEffect(() => {
    if (status == "authenticated") {
      router.push("/home");
    }
  });

  return (
    <>
      <LoadingOverlay
        visible={status != "unauthenticated"}
        overlayBlur={2}
        overlayOpacity={0.9}
      />
      <Grid m={0} style={{ height: "100vh" }}>
        <Grid.Col
          span="auto"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MediaQuery
            smallerThan="sm"
            styles={{
              paddingLeft: 10,
              paddingRight: 10,
              h1: {
                fontSize: "20px",
              },
            }}
          >
            {token ? (
              <RecoveryFormPage
                token={typeof token == "string" ? token : token.join("")}
              />
            ) : (
              <RecoveryPage />
            )}
          </MediaQuery>
        </Grid.Col>
        <MediaQuery
          smallerThan="md"
          styles={{
            display: "none",
          }}
        >
          <Grid.Col span={6} style={{ margin: 0, padding: 0 }}>
            <BackgroundImage
              src={loginDesign?.bannerurl ?? ""}
              style={{
                height: "100%",
                width: "100%",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </>
  );
};

export default RegisterPage;
