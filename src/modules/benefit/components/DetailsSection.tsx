import BasicTabs from "@modules/components/TabPanel";
import { Description, Download } from "@mui/icons-material";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { Benefit } from "generated/graphql";
import { useMemo } from "react";
import ubigeo from "ubigeo-peru";

export function BenefitDetails({ product }: { product: Benefit }) {
  const details = useMemo(() => {
    const newDetails: { name: string; value: string }[] = [];
    const departments = product.departments
      .map(
        (d) =>
          ubigeo.reniec.find(
            (u) =>
              u.departamento === d &&
              u.distrito === "00" &&
              u.provincia === "00"
          )?.nombre ?? ""
      )
      .filter((d) => d !== "");
    newDetails.push(
      ...[
        {
          name: "Alcance",
          value: departments.length
            ? departments.join(", ")
            : "Sin limite definido",
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
              <Box mt={1}>
                <Button
                  startIcon={<Description />}
                  endIcon={<Download />}
                  variant="outlined"
                  component="a"
                  href={product.additionalFiles ?? undefined}
                  download={product.additionalFiles?.split("/").at(-1)}
                >
                  {product.additionalFiles?.split("/").at(-1)}
                </Button>
              </Box>
            </Stack>
          ),
        },
      ]}
    ></BasicTabs>
  );
}
