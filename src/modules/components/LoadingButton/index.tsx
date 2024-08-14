import React, { useState } from "react";
import { Button, CircularProgress, ButtonProps } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  asyncFunction: () => Promise<void>;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  asyncFunction,
  children,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await asyncFunction();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      disabled={loading || props.disabled}
    >
      {loading ? <CircularProgress size={24} /> : children}
    </Button>
  );
};

export default LoadingButton;
