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
        position: "relative",
        margin: "auto",
        height: "max-content",
        maxHeight: "unset",
        transform: "none",
        top: "unset",
        left: "unset",
        paddingLeft: "35px",
        paddingRight: "35px",
        borderRadius: "40px",
        backgroundColor: "white",
        width: 420,
        [theme.breakpoints.down("md")]: {
          paddingLeft: "20px",
          paddingRight: "20px",
          width: 300,
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
        <Typography variant="h2" fontSize={20}>
          {props.title}
        </Typography>
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
