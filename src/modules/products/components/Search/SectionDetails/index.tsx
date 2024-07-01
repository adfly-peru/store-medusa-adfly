import { useDesign } from "@context/design-context";
import { Icon } from "@iconify/react";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const SectionDetails = () => {
  const router = useRouter();
  const { type, query } = router.query;
  const { storeDesign } = useDesign();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack spacing={2}>
      <img
        src={
          type === "coupon"
            ? "/sections/Foto Cupones.svg"
            : "/sections/Foto Compras Online.svg"
        }
        alt={"Cupones"}
        width={10}
        height={10}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      <Stack
        spacing={1}
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
        })}
      >
        <Typography variant="h3" fontSize={20}>
          Explora dentro de nuestra secciones
        </Typography>
        <ToggleButtonGroup
          value={type || ""}
          exclusive
          onChange={(_, val) => {
            router.push(
              {
                pathname: "/search",
                query: {
                  type: val,
                  query,
                },
              },
              undefined,
              { shallow: true }
            );
          }}
          sx={(theme) => ({
            marginBottom: "10px !important",
            borderRadius: "20px",
            "& .MuiToggleButton-root": {
              paddingTop: "40px",
              paddingBottom: "40px",
              width: "100%",
              fontSize: 24,
              color: theme.palette.primary.main,
              backgroundColor: "white",
              "&.Mui-selected": {
                color: "white",
                backgroundColor: `${theme.palette.primary.main} !important`,
              },
              "&.Mui-disabled": {
                color: "grey",
                backgroundColor: "white",
              },
              "&.MuiToggleButtonGroup-firstButton": {
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              },
              "&.MuiToggleButtonGroup-lastButton": {
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
              },
            },
          })}
        >
          <ToggleButton key="product" value="product">
            <Stack direction="row" alignItems="center" spacing={2}>
              {!isMdDown && (
                <Typography fontSize="inherit" textTransform="none">
                  Tienda
                </Typography>
              )}
              <Icon fontSize={40} icon={"bx:store"} />
            </Stack>
          </ToggleButton>
          <ToggleButton key="coupon" value="coupon">
            <Stack direction="row" alignItems="center" spacing={2}>
              {!isMdDown && (
                <Typography fontSize="inherit" textTransform="none">
                  Cupones
                </Typography>
              )}
              <Icon fontSize={40} icon={"ic:outline-discount"} />
            </Stack>
          </ToggleButton>
          {/* {storeDesign?.ispremium && (
            <ToggleButton key="marketplace" value="marketplace" disabled>
              <Stack direction="row" alignItems="center" spacing={2}>
                {!isMdDown && (
                  <Typography fontSize="inherit" textTransform="none">
                    Marketplace
                  </Typography>
                )}
                <Icon fontSize={40} icon={"mdi:hand-coin-outline"} />
              </Stack>
            </ToggleButton>
          )}
          {storeDesign?.ispremium && (
            <ToggleButton key="benefits" value="benefits" disabled>
              <Stack direction="row" alignItems="center" spacing={2}>
                {!isMdDown && (
                  <Typography fontSize="inherit" textTransform="none">
                    Beneficios
                  </Typography>
                )}
                <Icon fontSize={40} icon="material-symbols:stars-outline" />
              </Stack>
            </ToggleButton>
          )} */}
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};

export default SectionDetails;
