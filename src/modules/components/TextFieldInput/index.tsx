import React from "react";
import {
  TextField,
  TextFieldProps,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Typography,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from "react-hook-form";

type TextFieldInputProps = TextFieldProps & {
  control?: Control<any>;
  name?: string;
  label: string;
  fieldError?: FieldError;
  rules?: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  optional?: boolean;
  description?: string;
  prevText?: string;
  nextText?: string;
};

const TextFieldInput: React.FC<TextFieldInputProps> = ({
  control,
  name,
  label,
  fieldError,
  helperText,
  rules,
  required,
  description,
  prevText,
  nextText,
  ...props
}) => {
  const renderTextField = (field: any) =>
    prevText || nextText ? (
      <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {prevText && <Typography fontSize={14}>{prevText}</Typography>}
        <TextField
          {...field}
          {...props}
          sx={{}}
          variant="outlined"
          fullWidth
          size="small"
          error={!!fieldError}
          helperText={helperText || (fieldError ? fieldError.message : "")}
        />
        {nextText && <Typography fontSize={14}>{nextText}</Typography>}
      </Box>
    ) : (
      <TextField
        {...field}
        {...props}
        sx={{}}
        variant="outlined"
        fullWidth
        size="small"
        error={!!fieldError}
        helperText={helperText || (fieldError ? fieldError.message : "")}
      />
    );

  return (
    <FormControl
      fullWidth
      required={required}
      error={!!fieldError}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <InputLabel
        htmlFor={name}
        sx={{
          color: "black",
          fontWeight: 600,
          transform: "none",
          fontSize: "14px !important",
          lineHeight: "24px !important",
          position: "unset",
        }}
      >
        {label}
      </InputLabel>
      {description && (
        <FormHelperText sx={{ m: 0 }}>{description}</FormHelperText>
      )}
      {control && name ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => renderTextField(field)}
          rules={rules}
        />
      ) : (
        renderTextField(props)
      )}
    </FormControl>
  );
};

export default TextFieldInput;
