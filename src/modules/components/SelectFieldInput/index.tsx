import React from "react";
import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from "react-hook-form";

type SelectFieldInputProps<T> = Omit<
  AutocompleteProps<T, boolean, boolean, boolean>,
  "renderInput"
> & {
  control?: Control<any>;
  name?: string;
  label: string;
  fieldError?: Partial<FieldError>;
  helperText?: string;
  rules?: Omit<
    RegisterOptions<any, any>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  required?: boolean;
  options: T[];
  getOptionLabel: (option: T) => string;
  description?: string;
};

const SelectFieldInput = <T,>({
  control,
  name,
  label,
  fieldError,
  helperText,
  rules,
  required,
  options,
  getOptionLabel,
  description,
  ...props
}: SelectFieldInputProps<T>) => {
  const renderSelectField = (field: any, controlled = true) => (
    <Autocomplete
      {...field}
      {...props}
      options={options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          fullWidth
          size="small"
          error={!!fieldError}
          helperText={helperText || (fieldError ? fieldError.message : "")}
        />
      )}
      onChange={(event, data: any) => {
        if (controlled) field.onChange(data);
        else field.onChange(event, data);
      }}
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
          render={({ field }) => renderSelectField(field)}
          rules={rules}
        />
      ) : (
        renderSelectField(props, false)
      )}
    </FormControl>
  );
};

export default SelectFieldInput;
