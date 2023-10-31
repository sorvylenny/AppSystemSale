import { DetailsSale } from "./details-sale";

export interface Sales {
    idSales?      : number;
    numeroDocumento?: string;
    tipoPago      : string;
    totalText     : string;
    fechaRegistro?: string;
    detailsSales  : DetailsSale[];
}
