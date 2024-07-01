import { Star } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const Resume = ({ total, saving }: { total: number; saving: number }) => {
  const router = useRouter();
  return (
    <Stack spacing={2}>
      <Card
        sx={{
          minWidth: "280px",
        }}
      >
        <CardContent>
          <Typography variant="h3">Resumen</Typography>
          <Stack
            sx={{
              marginTop: "10px",
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">Subtotal:</Typography>
              <Typography variant="body2">{`S/. ${total.toFixed(
                2
              )}`}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">Envío:</Typography>
              <Typography variant="body2">-</Typography>
            </Stack>
            <Divider
              sx={{
                borderColor: "black",
              }}
            />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2">Total:</Typography>
              <Typography variant="body2">{`S/. ${total.toFixed(
                2
              )}`}</Typography>
            </Stack>
            <Stack my={2}>
              <Typography variant="subtitle2">{`(Ahorro estimado: S/.${saving.toFixed(
                2
              )})`}</Typography>
              <Typography variant="subtitle2">
                Gastos de envío calculados más adelante.
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            disabled={!total}
            variant="contained"
            fullWidth
            sx={{
              fontSize: 16,
            }}
            onClick={() => router.push("/checkout")}
          >
            Continuar
          </Button>
        </CardActions>
      </Card>
      <Card
        sx={{
          minWidth: "280px",
        }}
      >
        <CardContent>
          <Typography variant="h3">Resumen en estrellas</Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              color: "#fab005",
              marginTop: "10px",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight={700}>
                Estrellas
              </Typography>
              <Star />
            </Stack>
            <Typography variant="body2" fontWeight={700}>{`${(
              total * 100
            ).toFixed(0)}`}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Resume;
