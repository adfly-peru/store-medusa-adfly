import BasicTabs from "@modules/components/TabPanel";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
} from "@mui/material";
import { Benefit } from "generated/graphql";
import { useMemo } from "react";

export function BenefitDetails({ product }: { product: Benefit }) {
  const details = useMemo(() => {
    const newDetails: { name: string; value: string }[] = [];
    newDetails.push(
      ...[
        {
          name: "Alcance",
          value: product.departments.length.toString(),
        },
        {
          name: "¿Cómo acceder al beneficio?",
          value: product.accessBenefit ?? "",
        },
        {
          name: "Condiciones de uso del beneficio",
          value: product.conditions ?? "",
        },
        {
          name: "Información adicional",
          value: product.additionalInformation ?? "",
        },
      ]
    );
    return newDetails;
  }, [product]);
  return (
    <BasicTabs
      items={[
        {
          label: "Especificaciones",
          content: (
            <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
              <Table sx={{ width: "100%" }}>
                <TableBody>
                  {details.map((d, index) => (
                    <TableRow key={index}>
                      <TableCell
                        sx={{
                          width: "25%",
                        }}
                      >
                        <Typography>{d.name}</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "75%",
                        }}
                      >
                        <Typography>{d.value}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ),
        },
        {
          label: "Archivo Adjunto",
          content: (
            <Stack>
              <Typography variant="body2">
                Descarga los archivos adjuntos que te guiarán en tu compra.
              </Typography>
            </Stack>
          ),
        },
      ]}
    ></BasicTabs>
  );
}