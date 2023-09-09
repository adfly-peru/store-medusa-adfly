export type OrderStatus =
  | "confirmed"
  | "refunded"
  | "partially-refunded"
  | "pending"
  | "refuzed";

export const orderStatuses: Record<OrderStatus, string> = {
  confirmed: "Aprobado",
  refunded: "Reembolsado",
  "partially-refunded": "Reembolsado Parcialmente",
  pending: "Pendiente",
  refuzed: "Rechazado",
};

export type SuborderStatus =
  | "received"
  | "confirmed"
  | "ready"
  | "delivered"
  | "partially-delivered"
  | "canceled";

export const suborderStatuses: Record<SuborderStatus, string> = {
  received: "Recibido",
  confirmed: "Confirmado",
  ready: "Listo para entregar",
  delivered: "Entregado",
  "partially-delivered": "Entregado Parcialmente",
  canceled: "Cancelado",
};

export type DeliveryMethod =
  | "onhome"
  | "onstore"
  | "online"
  | "null"
  | "pickup";

export const deliveryMethodInfo: Record<DeliveryMethod, string> = {
  onhome: "Entrega en direccion personal",
  onstore: "Recojo en tienda",
  pickup: "Recojo en tienda",
  online: "En linea",
  null: "No delivery",
};
