import { Icon } from "@iconify/react";
import { Stack, Typography, Box } from "@mui/material";
import Image from "next/image";

const ThirdPart = () => {
  return (
    <Stack spacing={1} alignItems="flex-end">
      <Box
        sx={(theme) => ({
          width: "180px",
          [theme.breakpoints.down("lg")]: {
            width: "140px",
          },
          [theme.breakpoints.down("md")]: {
            width: "95px",
          },
        })}
      >
        <img
          sizes="100vw"
          width={180}
          height={10}
          style={{
            height: "auto",
            width: "100%",
          }}
          src={"/Logo Adfly.svg"}
          alt={"adfly"}
        />
      </Box>
      <div></div>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Icon icon="material-symbols:mail-outline" width={20} />
        <Typography
          variant="body2"
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              fontSize: 16,
            },
            [theme.breakpoints.down("md")]: {
              fontSize: 11,
            },
          })}
        >
          Contáctanos
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Icon icon="material-symbols:call-outline" width={20} />
        <Typography
          variant="body2"
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              fontSize: 16,
            },
            [theme.breakpoints.down("md")]: {
              fontSize: 11,
            },
          })}
        >
          hola@adfly.pe
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Icon icon="ion:chatbox-ellipses-outline" width={20} />
        <Typography
          variant="body2"
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              fontSize: 16,
            },
            [theme.breakpoints.down("md")]: {
              fontSize: 11,
            },
          })}
        >
          (+51) 970 802 065
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ThirdPart;
