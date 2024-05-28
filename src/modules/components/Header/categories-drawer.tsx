import { useAccount } from "@context/account-context";
import { useCategories } from "@context/categories-context";
import { Icon } from "@iconify/react";
import { ArrowBack, Close } from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Slide,
  Divider,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CategoriesDrawer = ({ onClose }: { onClose: () => void }) => {
  const { data: session } = useSession();
  const { departments } = useCategories();
  const { collaborator } = useAccount();
  const [section, setSection] = useState<"" | "cupon" | "tienda">("");
  const router = useRouter();

  return (
    <Box
      sx={(theme) => ({
        width: 360,
        [theme.breakpoints.down("md")]: {
          width: 340,
        },
        [theme.breakpoints.down("sm")]: {
          width: 180,
        },
      })}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.main,
          height: 70,
          paddingLeft: "20px",
          paddingRight: "20px",
          [theme.breakpoints.down("md")]: {
            height: 66,
          },
          [theme.breakpoints.down("sm")]: {
            height: 46,
            paddingLeft: "10px",
            paddingRight: "10px",
          },
        })}
      >
        <Typography
          variant="h2"
          sx={(theme) => ({
            color: theme.palette.secondary.main,
            fontSize: "24px",
            [theme.breakpoints.down("md")]: {
              fontSize: "20px",
            },
            [theme.breakpoints.down("sm")]: {
              fontSize: "16px",
            },
          })}
        >
          ¡Hola {collaborator?.name ?? session?.user?.name ?? "---"}!
        </Typography>
        <IconButton
          onClick={onClose}
          sx={(theme) => ({
            color: theme.palette.secondary.main,
          })}
        >
          <Close />
        </IconButton>
      </Stack>
      <Slide direction="right" in={section === ""} mountOnEnter unmountOnExit>
        <List>
          <ListItem>
            <ListItemText primary="Secciones" />
          </ListItem>
          <Divider
            sx={{
              borderWidth: "1px",
              marginTop: "5px",
              marginBottom: "25px",
            }}
          />
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("tienda")}>
              <ListItemIcon
                sx={{
                  paddingRight: 2,
                }}
              >
                <Icon icon="iconoir:shop" />
              </ListItemIcon>
              <ListItemText primary="Tienda" />
              <ListItemIcon
                sx={{
                  justifyContent: "flex-end",
                }}
              >
                <Icon icon="ep:arrow-right-bold" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setSection("cupon")}>
              <ListItemIcon
                sx={{
                  paddingRight: 2,
                }}
              >
                <Icon icon="ic:outline-discount" />
              </ListItemIcon>
              <ListItemText primary="Cupones de descuento" />
              <ListItemIcon
                sx={{
                  justifyContent: "flex-end",
                }}
              >
                <Icon icon="ep:arrow-right-bold" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Slide>
      <Slide
        direction="left"
        in={section === "tienda" || section === "cupon"}
        mountOnEnter
        unmountOnExit
      >
        <List>
          <ListItemButton onClick={() => setSection("")}>
            <ListItemIcon
              sx={{
                marginRight: "10px",
              }}
            >
              <ArrowBack />
            </ListItemIcon>
            <ListItemText
              primary={section === "tienda" ? "Tienda" : "Cupones de descuento"}
            />
          </ListItemButton>
          <Divider />
          <Box
            sx={{
              height: 600,
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "rgba(0,0,0,0.1)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,0.4)",
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(0,0,0,0.6)",
              },
            }}
          >
            {departments
              .filter((d) => d.section === section)
              .map((dep, index) => (
                <ListItemButton
                  key={index}
                  sx={{
                    marginTop: "16px",
                    marginBottom: "16px",
                  }}
                  onClick={() => {
                    router.push({
                      pathname: "/search",
                      query: {
                        department_name: dep.name,
                        type: section === "cupon" ? "coupon" : "product",
                      },
                    });
                    onClose();
                  }}
                >
                  <ListItemText primary={dep.name} />
                </ListItemButton>
              ))}
          </Box>
        </List>
      </Slide>
    </Box>
  );
};

export default CategoriesDrawer;
