import {
  Box,
  Divider,
  Button,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { ReactNode, useState } from "react";

const ResponseModal = React.forwardRef<
  HTMLDivElement,
  {
    title: string;
    response: ReactNode;
    goBack: () => Promise<void>;
    buttonText?: string;
  }
>((props, _) => {
  const [loading, setLoading] = useState(false);
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
        paddingTop: "1px",
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
          marginTop: "15px",
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
            marginBottom: "10px",
            borderRadius: 17,
          }}
          variant="contained"
          onClick={() => {
            setLoading(true);
            props.goBack().finally(() => setLoading(false));
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            props.buttonText ?? "Volver al inicio"
          )}
        </Button>
      </Stack>
    </Box>
  );
});

ResponseModal.displayName = "ResponseModal";

export default ResponseModal;
