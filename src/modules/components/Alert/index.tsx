import { Check, Warning } from "@mui/icons-material";
import { Alert, CircularProgress, Snackbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";

const DynamicAlert = ({
  func,
  message,
  trigger,
  onResetTrigger,
}: {
  func: () => Promise<void>;
  message: string;
  trigger: boolean;
  onResetTrigger: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(message);
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

  useEffect(() => {
    if (trigger) {
      handleSnackbar();
    }
  }, [trigger]);

  const handleSnackbar = async () => {
    setLoading(true);
    setSnackbarSeverity("warning");
    try {
      await func();
      setAlertMessage(message);
      setSnackbarSeverity("success");
    } catch (error: any) {
      console.error(error);
      setAlertMessage(error.message || "An error occurred");
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setOpen(true);
      onResetTrigger();
    }
  };

  return (
    <Snackbar
      open={loading || open}
      autoHideDuration={loading ? null : 4000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={snackbarSeverity}
        variant="filled"
        sx={{ width: "100%" }}
        iconMapping={{
          success: <Check fontSize="inherit" />,
          error: <Warning fontSize="inherit" />,
          warning: <CircularProgress color="inherit" size={20} />,
        }}
      >
        <Typography
          sx={{
            paddingTop: "3px",
            fontSize: 14,
          }}
        >
          {loading ? "Procesando..." : alertMessage}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default DynamicAlert;
