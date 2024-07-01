import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

const FourthPart = () => {
  return (
    <Stack spacing={1} alignItems="flex-end">
      <Typography
        variant="h5"
        fontSize={20}
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            fontSize: 24,
          },
        })}
      >
        Nosotros
      </Typography>
      <div></div>
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
        ¿Qué es ADFLY?
      </Typography>
      <Box
        sx={(theme) => ({
          width: "154px",
          [theme.breakpoints.down("lg")]: {
            width: "127px",
          },
        })}
      >
        <img
          sizes="100vw"
          width={154}
          height={10}
          style={{
            height: "auto",
            width: "100%",
          }}
          src={"/image 61.svg"}
          alt={"reclamaciones"}
        />
      </Box>
    </Stack>
  );
};

export default FourthPart;
