import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DialogContextProps {
  openDialog: (config: DialogConfig) => void;
  closeDialog: () => void;
}

interface DialogConfig {
  title: string;
  content: ReactNode;
  actions?: ReactElement[];
  closable?: boolean;
  centeredTitle?: boolean;
  width?: number;
  titleSize?: number;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const useDialog = (): DialogContextProps => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<DialogConfig | null>(null);

  const openDialog = (config: DialogConfig) => {
    setConfig(config);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setConfig(null);
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <Dialog
        open={open}
        onClose={closeDialog}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
            width: config?.width ?? 490,
            maxWidth: "100%",
          },
          "& .MuiDialogTitle-root": {
            pt: "20px",
            pb: "10px",
          },
          "& .MuiDialogActions-root": {
            justifyContent: "center",
          },
        }}
      >
        {config && (
          <>
            <DialogTitle>
              <Box
                display="flex"
                justifyContent={
                  config.centeredTitle ? "center" : "space-between"
                }
                alignItems="center"
              >
                <Typography
                  fontSize={config.titleSize ?? 20}
                  fontWeight={700}
                  lineHeight="24px"
                >
                  {config.title}
                </Typography>
                {config.closable && (
                  <IconButton onClick={closeDialog}>
                    <CloseIcon />
                  </IconButton>
                )}
              </Box>
            </DialogTitle>
            <Divider />
            <DialogContent>{config.content}</DialogContent>
            {config.actions && <DialogActions>{config.actions}</DialogActions>}
          </>
        )}
      </Dialog>
    </DialogContext.Provider>
  );
};
