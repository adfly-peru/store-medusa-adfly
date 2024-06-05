import {
  AccountCircleOutlined,
  LocalMallOutlined,
  PlaceOutlined,
  ShoppingCartOutlined,
  Menu as MenuIcon,
  LocationOnOutlined,
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
} from "@mui/material";
import Image from "next/image";
import SearchComponent from "./algolia-search";
import { signOut, useSession } from "next-auth/react";
import { useAccount } from "@context/account-context";
import { useState } from "react";
import LoginModal from "@modules/authentication/templates/login";
import { useRouter } from "next/router";
import CategoriesDrawer from "./categories-drawer";
import RegisterModal from "@modules/authentication/components/Register";
import { useCart } from "@context/cart-context";
import { useDesign } from "@context/design-context";

const AppHeader = () => {
  const router = useRouter();
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

  return (
    <header>
      <Modal open={isOpenSignUp}>
        <RegisterModal onClose={() => setIsOpenSignUp(false)} />
      </Modal>
      <Modal open={isOpenSignIn}>
        <LoginModal closeModal={() => setIsOpenSignIn(false)} />
      </Modal>
      <Drawer open={openDrawer}>
        <CategoriesDrawer onClose={toggleDrawer(false)} />
      </Drawer>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={(theme) => ({
            paddingTop: "5px",
            paddingBottom: "5px",
            paddingLeft: "92px",
            paddingRight: "92px",
            [theme.breakpoints.down("lg")]: {
              paddingLeft: "14px",
              paddingRight: "14px",
            },
            [theme.breakpoints.down("md")]: {
              paddingLeft: "7px",
              paddingRight: "7px",
            },
          })}
        >
          <Image
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
          <Image
            sizes="100vw"
            width={96}
            height={40}
            src={"/Logo Adfly.svg"}
            alt={"adfly"}
          />
        </Stack>
        <Stack
          py="8px"
          direction="row"
          alignItems="center"
          sx={(theme) => ({
            backgroundColor: theme.palette.primary.main,
            gap: "14px",
            paddingLeft: "90px",
            paddingRight: "90px",
            [theme.breakpoints.down("lg")]: {
              gap: "1px",
              paddingLeft: "12px",
              paddingRight: "12px",
            },
            [theme.breakpoints.down("md")]: {
              paddingLeft: "2px",
              paddingRight: "2px",
            },
          })}
        >
          <IconButton
            onClick={toggleDrawer(true)}
            sx={(theme) => ({
              color: theme.palette.secondary.main,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Divider
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
              width: "175px",
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
                width: "175px",
                color: theme.palette.secondary.main,
                fontSize: "16px",
              })}
            >
              Entrega en Lima
            </Button>
          </Box>
          <SearchComponent />
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
                fontSize: "28px",
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
              <Typography width={110}>
                Hola {collaborator?.name ?? session?.user?.name ?? "---"}
              </Typography>
              <Typography
                width={110}
                fontSize={15}
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
              <MenuItem onClick={handleAuthentication}>Iniciar sesión</MenuItem>
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
              fontSize: "25px",
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
              fontSize: "25px",
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
        <Stack
          sx={(theme) => ({
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          })}
        >
          <Button
            sx={(theme) => ({
              width: "100%",
              backgroundColor: theme.palette.primary.light,
              borderRadius: 0,
              color: "white",
              justifyContent: "flex-start",
              paddingLeft: "15px",
              textTransform: "none",
            })}
            startIcon={<PlaceOutlined />}
          >
            Ingresa tu ubicación
          </Button>
        </Stack>
      </Stack>
    </header>
  );
};

export default AppHeader;
