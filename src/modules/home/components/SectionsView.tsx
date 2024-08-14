import { useDesign } from "@context/design-context";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import Slider from "react-slick";

const getData = (section: string) => {
  switch (section) {
    case "product":
      return {
        title: "Tienda Online",
        subtitle: "La tienda que te mereces",
        icon: "bx:store",
        button: "Comprar ahora",
      };
    case "coupon":
      return {
        title: "Cupones",
        subtitle: "Tus descuentos, tu elección",
        icon: "ic:outline-discount",
        button: "Ver cupones",
      };
    case "benefits":
      return {
        title: "Beneficios Internos",
        subtitle: "Beneficios especiales para ti",
        icon: "material-symbols:stars-outline",
        button: "Comprar ahora",
      };
    case "marketplace":
      return {
        title: "Marketplace",
        subtitle: "Maneja tus propias ventas y compras",
        icon: "mdi:hand-coin-outline",
        button: "Ver Marketplace",
      };
    default:
      return {
        title: "Tienda Online",
        subtitle: "La tienda que te mereces",
        icon: "carbon:next-filled",
        button: "Comprar ahora",
      };
  }
};

const SectionCard = ({
  inverse,
  section,
}: {
  inverse: boolean;
  section: string;
}) => {
  const {
    title,
    subtitle,
    icon: sectionIcon,
    button: sectionButton,
  } = getData(section);
  const router = useRouter();

  return (
    <Card
      sx={(theme) => ({
        display: "flex",
        borderRadius: "20px",
        gap: {
          xs: 0,
          1120: "20px",
        },
        width: "100%",
        justifyContent: "space-between",
        paddingRight: inverse ? "20px" : "0px",
        paddingLeft: inverse ? "0px" : "20px",
        alignItems: "stretch",
        flexDirection: inverse ? "row" : "row-reverse",
        //     gap: "160px",
        //     [theme.breakpoints.down("lg")]: { gap: "120px" },
        //     [theme.breakpoints.down(1261)]: { gap: "70px" },
        //     [theme.breakpoints.down(1121)]: { gap: "20px" },
      })}
    >
      <CardMedia
        component="img"
        image={`/sections/card-${section}.svg`}
        alt={`${section}-card`}
        sx={(theme) => ({
          height: 170,
          width: "auto",
          objectFit: "cover",
          [theme.breakpoints.down(1261)]: {
            height: 160,
          },
          [theme.breakpoints.down(1121)]: {
            height: 150,
          },
          [theme.breakpoints.down(949)]: {
            height: 120,
          },
        })}
      />
      <CardContent
        sx={(theme) => ({
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          alignItems: inverse ? "flex-end" : "flex-start",
          margin: "0px !important",
          padding: "0 !important",
          fontSize: 20,
          [theme.breakpoints.down(949)]: {
            fontSize: 14,
          },
          [theme.breakpoints.down(1121)]: {
            gap: 0,
          },
        })}
      >
        <Stack
          direction={inverse ? "row" : "row-reverse"}
          alignItems="center"
          sx={(theme) => ({
            gap: "10px",
            fontSize: 18,
            [theme.breakpoints.down(949)]: {
              fontSize: 16,
            },
          })}
        >
          <Icon fontSize="inherit" icon={sectionIcon} />
          <Typography
            variant="h2"
            fontSize="inherit"
            color="black"
            fontWeight={600}
            sx={{ lineHeight: "1.5" }}
          >
            {title}
          </Typography>
        </Stack>
        <Typography
          sx={(theme) => ({
            lineHeight: "1.5",
            height: 60,
            width: 165,
            fontSize: 15,
            [theme.breakpoints.down(949)]: {
              height: 42,
              fontSize: 14,
            },
          })}
          textAlign={inverse ? "right" : "left"}
        >
          {subtitle}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          endIcon={<Icon icon="carbon:next-filled" />}
          onClick={() => router.push(`/search?type=${section}`)}
          sx={{ fontWeight: 700, fontSize: 14 }}
        >
          {sectionButton}
        </Button>
      </CardContent>
    </Card>
  );
};

const SectionsView = () => {
  const theme = useTheme();
  const { storeDesign } = useDesign();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { type } = router.query;

  return (
    <Container
      maxWidth={false}
      sx={(theme) => ({
        maxWidth: 1260,
        backgroundColor: "#F2F2F2",
        width: "100%",
        [theme.breakpoints.down(1261)]: {
          maxWidth: 1110,
        },
        [theme.breakpoints.down(1121)]: {
          maxWidth: 948,
        },
        [theme.breakpoints.down(949)]: {
          maxWidth: 802,
        },
        [theme.breakpoints.up("sm")]: {
          paddingLeft: "20px",
          paddingRight: "20px",
        },
      })}
    >
      {isMdDown ? (
        <Stack direction="row" justifyContent="center" alignItems="center">
          <ToggleButtonGroup
            value={type || ""}
            exclusive
            onChange={(_, val) => {
              router.push({
                pathname: "/search",
                query: {
                  type: val,
                },
              });
            }}
            sx={(theme) => ({
              alignSelf: "center",
              marginBottom: "10px !important",
              borderRadius: "20px",
              "& .MuiToggleButton-root": {
                paddingTop: "12px",
                paddingBottom: "12px",
                width: "160px",
                [theme.breakpoints.down(700)]: {
                  width: "120px",
                },
                [theme.breakpoints.down(560)]: {
                  width: "80px",
                },
                fontSize: { xs: 8, 560: 24 },
                borderRight: `1px solid ${theme.palette.grey[200]}`,
                borderLeft: `1px solid ${theme.palette.grey[200]}`,
                borderBottom: "8px solid",
                backgroundColor: "white",
                color: `${theme.palette.primary.main}`,
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
              <ToggleButton key="marketplace" value="marketplace" disabled>
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
            {storeDesign?.ispremium &&
              storeDesign.sections?.internalbenefits && (
                <ToggleButton key="benefits" value="benefits" disabled>
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
      ) : (
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={2}
          slidesToScroll={2}
          className="slick-sections"
        >
          {[
            "product",
            "coupon",
            ...(storeDesign?.ispremium &&
            storeDesign?.sections?.internalbenefits
              ? ["benefits"]
              : []),
            ...(storeDesign?.ispremium && storeDesign?.sections?.marketplace
              ? ["marketplace"]
              : []),
          ].map((section, index) => (
            <SectionCard key={index} section={section} inverse={!(index % 2)} />
          ))}
        </Slider>
      )}
    </Container>
  );
};

export default SectionsView;
