import { useAccount } from "@context/account-context";
import Loader from "@modules/components/LoadingScreen/Loader";
import NestedList from "@modules/components/NestedList";
import { Menu } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Box,
  Divider,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  Typography,
  Stack,
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
              name: "Mis Direciones",
              path: "/account/addresses",
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
            name: "Mis Direciones",
            path: "/account/addresses",
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
        <Hidden mdDown>
          <Grid item xs={3}>
            <AccountCard />
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Grid item xs={12}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <AccountBar />
          </Drawer>
        </Hidden>
        <Grid item xs={12} md={9}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountLayout;
