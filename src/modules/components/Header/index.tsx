import {
  AccountCircleOutlined,
  LocalMallOutlined,
  PlaceOutlined,
  ShoppingCartOutlined,
  Menu as MenuIcon,
  LocationOnOutlined,
  NavigateNext,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Menu,
  Stack,
  Typography,
  Modal,
  Drawer,
  Badge,
  Breadcrumbs,
  Link,
} from "@mui/material";
import Image from "next/image";
import SearchComponent from "./algolia-search";
import { signOut, useSession } from "next-auth/react";
import { useAccount } from "@context/account-context";
import { useMemo, useState } from "react";
import LoginModal from "@modules/authentication/templates/login";
import { useRouter } from "next/router";
import CategoriesDrawer from "./categories-drawer";
import RegisterModal from "@modules/authentication/components/Register";
import { useCart } from "@context/cart-context";
import { useDesign } from "@context/design-context";

const AppHeader = () => {
  const router = useRouter();
  const { type } = router.query;
  const { storeDesign } = useDesign();
  const { data: session } = useSession();
  const {
    collaborator,
    isOpenSignIn,
    isOpenSignUp,
    setIsOpenSignIn,
    setIsOpenSignUp,
    handleAuthentication,
  } = useAccount();
  const { cart } = useCart();

  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  // Menu Options
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const breadcrumbs = useMemo(() => {
    if (router.asPath.startsWith("/search") && type)
      return [
        <Link underline="hover" key="1" color="inherit" href="/">
          Inicio
        </Link>,
        <Link underline="hover" key="2" color="inherit">
          {type === "coupon" ? "Cupones" : "Tienda"}
        </Link>,
      ];

    return;
  }, [router.asPath, type]);

  return (
    <header>
      <Modal open={isOpenSignUp}>
        <Box
          sx={{
            position: "absolute",
            inset: "0px",
            height: "100%",
            overflow: "hidden auto",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
          }}
        >
          <Box
            sx={(theme) => ({
              position: "relative",
              margin: "auto",
              height: "max-content",
              maxHeight: "unset",
              transform: "none",
              top: "unset",
              left: "unset",
            })}
          >
            <RegisterModal onClose={() => setIsOpenSignUp(false)} />
          </Box>
        </Box>
      </Modal>
      <Modal open={isOpenSignIn}>
        <Box
          sx={{
            position: "absolute",
            inset: "0px",
            height: "100%",
            overflow: "hidden auto",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
          }}
        >
          <Box
            sx={(theme) => ({
              position: "relative",
              margin: "auto",
              height: "max-content",
              maxHeight: "unset",
              transform: "none",
              top: "unset",
              left: "unset",
            })}
          >
            <LoginModal closeModal={() => setIsOpenSignIn(false)} />
          </Box>
        </Box>
      </Modal>
      <Drawer open={openDrawer}>
        <CategoriesDrawer onClose={toggleDrawer(false)} />
      </Drawer>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={(theme) => ({
            alignSelf: "center",
            width: "100%",
            maxWidth: "1220px",
            paddingTop: "5px",
            paddingBottom: "5px",
            [theme.breakpoints.down(1261)]: {
              maxWidth: "1080px",
            },
            [theme.breakpoints.down(1121)]: {
              maxWidth: "924px",
            },
            [theme.breakpoints.down(949)]: {
              maxWidth: "762px",
            },
            [theme.breakpoints.down("md")]: {
              paddingRight: "20px",
              paddingLeft: "20px",
            },
          })}
        >
          <img
            onClick={() => router.push("/home")}
            sizes="100vw"
            width={10}
            height={40}
            style={{
              width: "auto",
            }}
            src={
              (storeDesign?.logourl ?? "") === ""
                ? "/default-logo.svg"
                : storeDesign?.logourl ?? ""
            }
            alt={"store"}
          />
          <img
            sizes="100vw"
            width={96}
            height={40}
            src={"/Logo Adfly.svg"}
            alt={"adfly"}
          />
        </Stack>
        <Stack
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.main,
            alignSelf: "center",
            width: "100%",
          })}
        >
          <Stack
            py="8px"
            direction="row"
            alignItems="center"
            sx={(theme) => ({
              alignSelf: "center",
              gap: "20px",
              width: "100%",
              maxWidth: "1220px",
              paddingTop: "5px",
              paddingBottom: "5px",
              [theme.breakpoints.down(1261)]: {
                maxWidth: "1080px",
              },
              [theme.breakpoints.down(1121)]: {
                maxWidth: "924px",
              },
              [theme.breakpoints.down(949)]: {
                maxWidth: "762px",
                gap: "10px",
              },
              [theme.breakpoints.down("md")]: {
                paddingRight: "20px",
                paddingLeft: "20px",
              },
            })}
          >
            <Stack direction="row" sx={{ gap: "20px" }} alignItems="center">
              <IconButton
                onClick={toggleDrawer(true)}
                sx={(theme) => ({
                  color: theme.palette.secondary.main,
                  padding: "4px",
                })}
              >
                <MenuIcon />
              </IconButton>
              {/* <Divider
                orientation="vertical"
                sx={(theme) => ({
                  height: "22px",
                  borderColor: theme.palette.secondary.main,
                  [theme.breakpoints.down("md")]: {
                    display: "none",
                  },
                })}
              />
              <Box
                sx={(theme) => ({
                  [theme.breakpoints.down("md")]: {
                    display: "none",
                  },
                })}
              >
                <Button
                  variant="text"
                  size="large"
                  startIcon={<LocationOnOutlined />}
                  sx={(theme) => ({
                    width: "150px",
                    color: theme.palette.secondary.main,
                    fontSize: "16px",
                    padding: 0,
                  })}
                >
                  Entrega en Lima
                </Button>
              </Box> */}
            </Stack>
            <SearchComponent />
            <Stack direction="row" sx={{ gap: "20px" }} alignItems="center">
              <Stack
                direction="row"
                alignItems="center"
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                sx={{
                  cursor: "pointer",
                }}
              >
                <AccountCircleOutlined
                  fontSize="inherit"
                  sx={(theme) => ({
                    color: theme.palette.secondary.main,
                    fontSize: "30px",
                  })}
                />
                <Box
                  sx={(theme) => ({
                    color: theme.palette.primary.contrastText,
                    [theme.breakpoints.down("md")]: {
                      display: "none",
                    },
                  })}
                >
                  <Typography width={106} fontSize={14}>
                    Hola {collaborator?.name ?? session?.user?.name ?? "---"}
                  </Typography>
                  <Typography
                    width={106}
                    fontSize={16}
                    fontWeight={700}
                    sx={{
                      display: session?.user?.accessToken ? "none" : "block",
                    }}
                  >
                    {session?.user?.completeregistration
                      ? "Inicia sesión"
                      : "Registrate"}
                  </Typography>
                </Box>
              </Stack>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: "calc(50% - 5px)",
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <MenuItem
                  sx={{
                    fontWeight: "bold",
                    cursor: "auto",
                  }}
                >
                  Cuenta
                </MenuItem>
                <Divider
                  sx={(theme) => ({
                    marginLeft: "5px",
                    marginRight: "5px",
                    borderColor: theme.palette.grey[200],
                  })}
                />
                {!!session?.user?.accessToken ? (
                  [
                    <MenuItem
                      key="mi-cuenta"
                      onClick={() => {
                        router.push("/account/profile");
                        handleClose();
                      }}
                    >
                      Mi cuenta
                    </MenuItem>,
                    <MenuItem key="configuracion" onClick={handleClose}>
                      Configuración
                    </MenuItem>,
                    <MenuItem key="ayuda" onClick={handleClose}>
                      Ayuda
                    </MenuItem>,
                  ]
                ) : session?.user?.completeregistration ? (
                  <MenuItem onClick={handleAuthentication}>
                    Iniciar sesión
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleAuthentication}>Regístrate</MenuItem>
                )}
                <Divider
                  sx={(theme) => ({
                    marginLeft: "5px",
                    marginRight: "5px",
                    borderColor: theme.palette.grey[200],
                  })}
                />
                <MenuItem
                  onClick={() => {
                    signOut({
                      redirect: false,
                    });
                    handleClose();
                  }}
                >
                  {!!session?.user?.accessToken ? "Cerrar sesión" : "Salir"}
                </MenuItem>
              </Menu>
              <Divider
                orientation="vertical"
                sx={(theme) => ({
                  height: "22px",
                  borderColor: theme.palette.secondary.main,
                })}
              />
              <IconButton
                sx={(theme) => ({
                  color: theme.palette.secondary.main,
                  fontSize: "30px",
                  padding: 0,
                })}
                onClick={() =>
                  !!session?.user?.accessToken
                    ? router.push("/account/orders")
                    : handleAuthentication()
                }
              >
                <LocalMallOutlined fontSize="inherit" />
              </IconButton>
              <Divider
                orientation="vertical"
                sx={(theme) => ({
                  borderColor: theme.palette.secondary.main,
                  height: "22px",
                })}
              />
              <IconButton
                sx={(theme) => ({
                  color: theme.palette.secondary.main,
                  fontSize: "30px",
                  padding: 0,
                })}
                onClick={() =>
                  !!session?.user?.accessToken
                    ? router.push("/cart")
                    : handleAuthentication()
                }
              >
                <Badge
                  badgeContent={
                    cart?.suborders?.reduce(
                      (total, suborder) => total + suborder.items.length,
                      0
                    ) ?? 0
                  }
                  variant="standard"
                >
                  <ShoppingCartOutlined fontSize="inherit" />
                </Badge>
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
        {/* <Stack
          sx={(theme) => ({
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
            backgroundColor: theme.palette.primary.light,
            alignSelf: "center",
            width: "100%",
          })}
        >
          <Stack
            sx={(theme) => ({
              alignSelf: "center",
              gap: "20px",
              width: "100%",
              maxWidth: "1220px",
              paddingTop: "5px",
              paddingBottom: "5px",
              [theme.breakpoints.down(1261)]: {
                maxWidth: "1080px",
              },
              [theme.breakpoints.down(1121)]: {
                maxWidth: "924px",
              },
              [theme.breakpoints.down(949)]: {
                maxWidth: "762px",
                gap: "10px",
              },
              [theme.breakpoints.down("md")]: {
                paddingRight: "20px",
                paddingLeft: "20px",
              },
            })}
          >
            <Button
              sx={(theme) => ({
                width: "100%",
                borderRadius: 0,
                color: "white",
                justifyContent: "flex-start",
                padding: 0,
                paddingLeft: 1,
                textTransform: "none",
              })}
              startIcon={<PlaceOutlined />}
            >
              Ingresa tu ubicación
            </Button>
          </Stack>
        </Stack> */}
        {breadcrumbs && (
          <Stack
            sx={(theme) => ({
              backgroundColor: theme.palette.grey[200],
              alignSelf: "center",
              width: "100%",
            })}
          >
            <Stack
              py="8px"
              direction="row"
              alignItems="center"
              sx={(theme) => ({
                alignSelf: "center",
                gap: "20px",
                width: "100%",
                maxWidth: "1220px",
                paddingTop: "5px",
                paddingBottom: "5px",
                [theme.breakpoints.down(1261)]: {
                  maxWidth: "1080px",
                },
                [theme.breakpoints.down(1121)]: {
                  maxWidth: "924px",
                },
                [theme.breakpoints.down(949)]: {
                  maxWidth: "762px",
                  gap: "10px",
                },
                [theme.breakpoints.down("md")]: {
                  paddingRight: "20px",
                  paddingLeft: "20px",
                },
              })}
            >
              <Breadcrumbs
                sx={{
                  paddingLeft: 1,
                }}
                separator={<NavigateNext fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Stack>
        )}
      </Stack>
    </header>
  );
};

export default AppHeader;
