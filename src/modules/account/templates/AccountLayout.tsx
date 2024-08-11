import { useAccount } from "@context/account-context";
import Loader from "@modules/components/LoadingScreen/Loader";
import NestedList from "@modules/components/NestedList";
import { ArrowForward, Menu } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  SwipeableDrawer,
} from "@mui/material";
import { useState } from "react";

const AccountCard = () => {
  const { collaborator } = useAccount();

  if (!collaborator) return <Loader />;

  return (
    <Card
      sx={{
        width: "90%",
      }}
    >
      <CardContent>
        <Typography variant="h3">
          {collaborator.name}
          <br />
          {collaborator.lastname}
        </Typography>
      </CardContent>
      <Divider
        sx={{
          width: "100%",
          borderColor: "grey",
        }}
      />
      <CardContent sx={{ padding: 0 }}>
        <NestedList
          routes={[
            {
              name: "Mi Perfil",
              path: "/account/profile",
            },
            {
              name: "Mis Direcciones",
              path: "/account/addresses",
            },
            {
              name: "Mi Marketplace",
              path: "/account/marketplace",
              subRoutes: [
                {
                  name: "Administrar mis ofertas",
                  path: "/account/marketplace/admin",
                },
                {
                  name: "Solicitudes",
                  path: "/account/marketplace/requests",
                },
              ],
            },
            {
              name: "Mis Compras",
              path: "/account/orders",
            },
            {
              name: "Mis Cupones",
              path: "/account/coupons",
            },
            {
              name: "Mis Estrellas",
              path: "/account/stars",
            },
            {
              name: "Seguridad",
              path: "/account/security",
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

const AccountBar = () => {
  const { collaborator } = useAccount();

  if (!collaborator) return <Loader />;

  return (
    <Stack
      sx={{
        width: "345px",
      }}
    >
      <Typography variant="h3" m={2}>
        {collaborator.name} {collaborator.lastname}
      </Typography>
      <Divider
        sx={{
          width: "100%",
          borderColor: "grey",
        }}
      />
      <NestedList
        routes={[
          {
            name: "Mi Perfil",
            path: "/account/profile",
          },
          {
            name: "Mis Direcciones",
            path: "/account/addresses",
          },
          {
            name: "Mi Marketplace",
            path: "/account/marketplace",
            subRoutes: [
              {
                name: "Administrar mis ofertas",
                path: "/account/marketplace/admin",
              },
              {
                name: "Solicitudes",
                path: "/account/marketplace/requests",
              },
            ],
          },
          {
            name: "Mis Compras",
            path: "/account/orders",
          },
          {
            name: "Mis Cupones",
            path: "/account/coupons",
          },
          {
            name: "Mis Estrellas",
            path: "/account/stars",
          },
          {
            name: "Seguridad",
            path: "/account/security",
          },
        ]}
      />
    </Stack>
  );
};

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down(975));
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        margin: "30px 50px",
      }}
    >
      <Grid container>
        {!matches && (
          <Grid item xs={3}>
            <AccountCard />
          </Grid>
        )}
        {matches && (
          <SwipeableDrawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            keepMounted
            sx={{
              overflow: "visible !important",
            }}
            swipeAreaWidth={30}
          >
            <AccountBar />
            <Box
              sx={(theme) => ({
                visibility: "visible",
                backgroundColor: theme.palette.grey[200],
                position: "absolute",
                top: "50%",
                right: "-30px",
                transform: "translateY(-50%)",
                height: 50,
                width: 30,
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                display: "flex",
              })}
            >
              <IconButton sx={{ padding: 0 }}>
                <ArrowForward />
              </IconButton>
            </Box>
          </SwipeableDrawer>
        )}
        <Grid item xs={matches ? 12 : 9}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountLayout;
