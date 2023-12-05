import {
  Grid,
  LoadingOverlay,
  BackgroundImage,
  MediaQuery,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useAccount } from "@context/account-context";
import { useEffect } from "react";
import { useDesign } from "@context/design-context";
import RecoveryPage from "@modules/login/templates/recovery";
import RecoveryFormPage from "@modules/login/templates/recovery-form";

const RegisterPage = () => {
  const router = useRouter();
  const { token } = router.query;
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
