import React from "react";
import {
  TextField,
  TextFieldProps,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from "react-hook-form";

type CheckboxesInputProps = {
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
  required?: boolean;
  options: {
    label: string;
    value: string;
    description?: string;
    disabled?: boolean;
  }[];
  value?: string[];
  onChange?: (v: string[]) => void;
};

const CheckboxesInput: React.FC<CheckboxesInputProps> = ({
  control,
  name,
  label,
  fieldError,
  rules,
  required,
  description,
  prevText,
  nextText,
  options,
  ...props
}) => {
  const renderTextField = (field: any) => (
    <FormGroup>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          sx={{
            ml: 0,
            my: 1,
          }}
          control={
            <Checkbox
              checked={field.value.includes(option.value)}
              onChange={() =>
                field.value.includes(option.value)
                  ? field.onChange(
                      field.value.filter((f: any) => f !== option.value)
                    )
                  : field.onChange([...field.value, option.value])
              }
              disabled={option.disabled}
              name={option.value}
            />
          }
          label={
            <Stack>
              <Typography variant="body1" fontWeight={500} fontSize={14}>
                {option.label}
              </Typography>
              <Typography variant="caption" fontSize={11}>
                {option.description}
              </Typography>
            </Stack>
          }
        />
      ))}
    </FormGroup>
    // <TextField
    //   {...field}
    //   {...props}
    //   sx={{}}
    //   variant="outlined"
    //   fullWidth
    //   size="small"
    //   error={!!fieldError}
    //   helperText={fieldError ? fieldError.message : ""}
    // />
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

export default CheckboxesInput;
