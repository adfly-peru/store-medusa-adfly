/* eslint-disable @next/next/no-img-element */
import React, { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Divider, Typography } from "@mui/material";

const DropImages = ({
  onImageUpload,
}: {
  onImageUpload: (v: File[]) => void;
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = acceptedFiles.slice(0, 5);
      onImageUpload(files);
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpg": [],
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: true,
  });

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          width: "100%",
          height: 166,
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#A8C8E1",
          color: "#737A82",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 1,
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1" color="inherit">
          Añadir fotos
          <br />
          o<br />
          arrastra y suelta
        </Typography>
      </Box>
      <Typography
        sx={(theme) => ({
          color: theme.palette.grey[400],
          fontSize: 12,
          fontWeight: 400,
        })}
      >
        Puedes añadir un máximo de 5 fotos
      </Typography>
      <Divider
        sx={(theme) => ({
          mt: 1,
          border: `0.5px solid ${theme.palette.grey[200]}`,
        })}
      />
    </Box>
  );
};

export default DropImages;
