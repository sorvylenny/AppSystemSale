import { DetailsSale } from "./details-sale";

export interface Sales {
    idSales?: number;
    numberId?: string;
    tipoPago: string;
    totalText: string;
    fechaRegistro?: string;
    detailsSales: DetailsSale[];
}
