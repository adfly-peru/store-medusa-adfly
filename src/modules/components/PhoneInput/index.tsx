import React, { useState } from "react";
import { Select, MenuItem, TextField, Box, Autocomplete } from "@mui/material";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";
import examples from "libphonenumber-js/mobile/examples";
import { getExampleNumber, CountryCode } from "libphonenumber-js";

interface CustomPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  country: CountryCode;
  setCountry: (value: CountryCode) => void;
  error?: string;
}

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  value,
  onChange,
  country,
  setCountry,
  error,
}) => {
  const countries = getCountries().map((country) => ({
    code: country,
    label: `(+${getCountryCallingCode(country)})`,
    callingCode: getCountryCallingCode(country),
    flag: flags[country] ? flags[country]!({ title: country }) : null,
  }));

  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={getExampleNumber(country, examples)?.nationalNumber ?? ""}
      variant="outlined"
      fullWidth
      size="small"
      sx={{ marginTop: "-10px" }}
      InputProps={{
        startAdornment: (
          <Autocomplete
            disableClearable
            filterOptions={(options, state) => {
              return options.filter((option) => {
                const query = state.inputValue.toLowerCase();
                return (
                  option.label.toLowerCase().includes(query) ||
                  option.code.toLowerCase().includes(query)
                );
              });
            }}
            options={countries}
            value={countries.find((c) => c.code === country) || undefined}
            onChange={(event, newValue: any) =>
              setCountry(newValue ? newValue.code : "")
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={"--"}
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                    paddingRight: "0px !important",
                    width: 100,
                  },
                }}
              />
            )}
            renderOption={(props, option, key) => (
              <Box
                {...props}
                key={key.index}
                component="li"
                sx={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <Box
                  sx={{
                    width: 25,
                    height: 25,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {option.flag}
                </Box>
                {option.label}
              </Box>
            )}
            sx={{
              marginRight: 2,
            }}
          />
        ),
        sx: {
          padding: 0,
        },
      }}
      error={!!error}
      helperText={error ?? ""}
    />
  );
};

export default CustomPhoneInput;
