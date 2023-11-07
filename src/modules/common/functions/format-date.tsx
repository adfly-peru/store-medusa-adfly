export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);

  // Formateas la fecha/hora en la zona horaria local del navegador del usuario
  return date.toLocaleString();
  // const date = new Date(isoDate);
  // const day = String(date.getUTCDate()).padStart(2, "0");
  // const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  // const year = date.getUTCFullYear();

  // return `${day}/${month}/${year}`;
}
