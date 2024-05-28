import { Close } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

const BaseModal = React.forwardRef<
  HTMLDivElement,
  {
    title: string;
    onClose?: () => void;
    children?: React.ReactNode;
  }
>((props, _) => {
  return (
    <Box
      sx={(theme) => ({
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "20px",
        backgroundColor: "white",
        [theme.breakpoints.up("md")]: {
          width: 360,
        },
        [theme.breakpoints.down("md")]: {
          width: 340,
        },
        [theme.breakpoints.down("sm")]: {
          width: 300,
        },
      })}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={(theme) => ({
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          [theme.breakpoints.up("md")]: {
            paddingLeft: "40px",
            paddingRight: "40px",
          },
          [theme.breakpoints.down("md")]: {
            paddingLeft: "30px",
            paddingRight: "30px",
          },
          [theme.breakpoints.down("sm")]: {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
          height: 80,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
        })}
      >
        <Typography variant="h3" fontWeight={600}>
          {props.title}
        </Typography>
        {props.onClose && (
          <IconButton
            sx={(theme) => ({
              color: theme.palette.secondary.main,
            })}
            onClick={props.onClose}
          >
            <Close />
          </IconButton>
        )}
      </Stack>
      <Stack
        sx={(theme) => ({
          [theme.breakpoints.up("md")]: {
            paddingLeft: "40px",
            paddingRight: "40px",
          },
          [theme.breakpoints.down("md")]: {
            paddingLeft: "30px",
            paddingRight: "30px",
          },
          [theme.breakpoints.down("sm")]: {
            paddingLeft: "20px",
            paddingRight: "20px",
          },
          paddingTop: "20px",
          paddingBottom: "20px",
          gap: "20px",
        })}
      >
        {props.children}
      </Stack>
    </Box>
  );
});

BaseModal.displayName = "BaseModal";

export default BaseModal;
