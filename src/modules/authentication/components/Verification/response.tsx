import { Box, Divider, Button, Stack, Typography } from "@mui/material";
import React, { ReactNode } from "react";

const ResponseModal = React.forwardRef<
  HTMLDivElement,
  {
    title: string;
    response: ReactNode;
    goBack: () => void;
  }
>((props, _) => {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        paddingLeft: "40px",
        paddingRight: "40px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "40px",
        backgroundColor: "white",
        [theme.breakpoints.up("md")]: {
          width: 430,
        },
        [theme.breakpoints.down("sm")]: {
          width: 295,
        },
      })}
    >
      <Stack
        alignItems="center"
        width="100%"
        sx={{
          marginTop: "30px",
          marginBottom: "30px",
          gap: "10px",
        }}
      >
        <Typography variant="h2">{props.title}</Typography>
        <Divider
          style={{
            width: "100%",
          }}
        />
        {props.response}
        <Button
          sx={{
            marginTop: "15px",
            borderRadius: 17,
          }}
          variant="contained"
          onClick={props.goBack}
        >
          Volver al inicio
        </Button>
      </Stack>
    </Box>
  );
});

ResponseModal.displayName = "ResponseModal";

export default ResponseModal;
