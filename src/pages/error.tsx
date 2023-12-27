import Layout from "@modules/layout/templates";
import { useRouter } from "next/router";
import { ActionIcon, Center, Stack, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { IconMoodSad } from "@tabler/icons-react";
import ErrorMessage from "@modules/layout/components/error-message";

function formatarFecha(fechaStr: string): string {
  if (fechaStr.length !== 12) {
    throw new Error("Formato de fecha no válido.");
  }

  const año = "20" + fechaStr.substr(0, 2);
  const mes = fechaStr.substr(2, 2);
  const dia = fechaStr.substr(4, 2);
  const hora = fechaStr.substr(6, 2);
  const minuto = fechaStr.substr(8, 2);
  const segundo = fechaStr.substr(10, 2);

  const fecha = new Date(
    parseInt(año),
    parseInt(mes) - 1, // Los meses en JavaScript empiezan desde 0
    parseInt(dia),
    parseInt(hora),
    parseInt(minuto),
    parseInt(segundo)
  );

  return fecha.toLocaleString(); // Retorna en formato 'dd/mm/yyyy, hh:mm:ss AM/PM'
}

const ErrorPage = () => {
  const router = useRouter();
  const { message, data, purchase } = router.query;
  const orderData = (data ? JSON.parse(data as string) : null)?.data;
  return (
    <Layout>
      <ErrorMessage
        purchase={purchase}
        message={message}
        orderData={orderData}
      />
    </Layout>
  );
};

export default ErrorPage;
