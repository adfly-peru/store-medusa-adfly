/* eslint-disable @next/next/no-img-element */
import { useDesign } from "@context/design-context";
import { Icon } from "@iconify/react";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const SectionDetails = () => {
  const router = useRouter();
  const { storeDesign } = useDesign();
  const { type, query } = router.query;

  return (
    <Stack spacing={2}>
      <img
        src={
          type === "coupon"
            ? "/sections/fondo_cupones.svg"
            : type === "benefits"
            ? "/sections/fondo_benefits.svg"
            : type === "marketplace"
            ? "/sections/fondo_marketplace.svg"
            : "/sections/fondo_store.svg"
        }
        alt={"Section Background"}
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
            if (!val) return;
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
            alignSelf: "center",
            marginBottom: "10px !important",
            borderRadius: "20px",
            "& .MuiToggleButton-root": {
              paddingTop: "12px",
              paddingBottom: "12px",
              width: "264px",
              [theme.breakpoints.down("lg")]: {
                width: "210px",
              },
              [theme.breakpoints.down("md")]: {
                width: "93px",
              },
              fontSize: 24,
              color: theme.palette.grey[400],
              borderRight: `1px solid ${theme.palette.grey[200]}`,
              borderLeft: `1px solid ${theme.palette.grey[200]}`,
              borderBottom: "8px solid",
              backgroundColor: "white",
              "&.Mui-selected": {
                color: `${theme.palette.primary.main}`,
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
            <Stack
              alignItems="center"
              spacing={2}
              sx={(theme) => ({
                fontSize: 40,
                [theme.breakpoints.down("lg")]: {
                  fontSize: 36,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 30,
                },
              })}
            >
              <Icon fontSize="inherit" icon={"bx:store"} />
              <Typography
                sx={(theme) => ({
                  fontSize: 20,
                  [theme.breakpoints.down("lg")]: {
                    fontSize: 16,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 14,
                  },
                })}
                fontWeight={600}
                textTransform="none"
              >
                Tienda
              </Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton key="coupon" value="coupon">
            <Stack
              alignItems="center"
              spacing={2}
              sx={(theme) => ({
                fontSize: 40,
                [theme.breakpoints.down("lg")]: {
                  fontSize: 36,
                },
                [theme.breakpoints.down("md")]: {
                  fontSize: 30,
                },
              })}
            >
              <Icon fontSize="inherit" icon={"ic:outline-discount"} />
              <Typography
                sx={(theme) => ({
                  fontSize: 20,
                  [theme.breakpoints.down("lg")]: {
                    fontSize: 16,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 14,
                  },
                })}
                fontWeight={600}
                textTransform="none"
              >
                Cupones
              </Typography>
            </Stack>
          </ToggleButton>
          {storeDesign?.ispremium && storeDesign.sections?.marketplace && (
            <ToggleButton key="marketplace" value="marketplace">
              <Stack
                alignItems="center"
                spacing={2}
                sx={(theme) => ({
                  fontSize: 40,
                  [theme.breakpoints.down("lg")]: {
                    fontSize: 36,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 30,
                  },
                })}
              >
                <Icon fontSize="inherit" icon={"mdi:hand-coin-outline"} />
                <Typography
                  sx={(theme) => ({
                    fontSize: 20,
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 16,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 14,
                    },
                  })}
                  fontWeight={600}
                  textTransform="none"
                >
                  Marketplace
                </Typography>
              </Stack>
            </ToggleButton>
          )}
          {storeDesign?.ispremium && storeDesign.sections?.internalbenefits && (
            <ToggleButton key="benefits" value="benefits">
              <Stack
                alignItems="center"
                spacing={2}
                sx={(theme) => ({
                  fontSize: 40,
                  [theme.breakpoints.down("lg")]: {
                    fontSize: 36,
                  },
                  [theme.breakpoints.down("md")]: {
                    fontSize: 30,
                  },
                })}
              >
                <Icon
                  fontSize="inherit"
                  icon="material-symbols:stars-outline"
                />
                <Typography
                  sx={(theme) => ({
                    fontSize: 20,
                    [theme.breakpoints.down("lg")]: {
                      fontSize: 16,
                    },
                    [theme.breakpoints.down("md")]: {
                      fontSize: 14,
                    },
                  })}
                  fontWeight={600}
                  textTransform="none"
                >
                  Beneficios
                </Typography>
              </Stack>
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};

export default SectionDetails;
