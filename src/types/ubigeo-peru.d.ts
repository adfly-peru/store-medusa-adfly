declare module "ubigeo-peru" {
  export interface UbigeoEntry {
    departamento: string;
    provincia: string;
    distrito: string;
    nombre: string;
  }

  export const reniec: UbigeoEntry[];
  export const inei: UbigeoEntry[];
}
