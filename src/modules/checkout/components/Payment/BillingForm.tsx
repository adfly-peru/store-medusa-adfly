import {
  Stack,
  Typography,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useState } from "react";

const BillingForm = () => {
  const [billing, setBilling] = useState("bill");
  return (
    <Stack>
      <Typography variant="h3">Datos de Facturación</Typography>
      <Divider sx={(theme) => ({ borderColor: theme.palette.grey[300] })} />
      <FormControl>
        <RadioGroup
          row
          value={billing}
          onChange={(_, val) => setBilling(val)}
          name="radio-buttons-group"
          sx={(theme) => ({
            justifyContent: "space-between",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
            },
          })}
        >
          <FormControlLabel value="bill" control={<Radio />} label="Boleta" />
          <FormControlLabel
            value="invoice"
            control={<Radio />}
            label="Factura"
          />
        </RadioGroup>
      </FormControl>
      {billing === "invoice" && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} my={1}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Ruc
              </InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} my={1}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Razón Social
              </InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small" required>
              <InputLabel
                sx={{
                  color: "black",
                  fontWeight: 600,
                  top: "-20px",
                  marginLeft: "-10px",
                }}
              >
                Dirección Fiscal
              </InputLabel>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                  marginTop: "10px",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default BillingForm;
