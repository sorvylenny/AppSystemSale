import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsSale } from 'src/app/SystemSale/interfaces/details-sale';
import { Sales } from 'src/app/SystemSale/interfaces/sales';

@Component({
  selector: 'app-model-details-sale',
  templateUrl: './model-details-sale.component.html',
  styleUrls: ['./model-details-sale.component.css']
})
export class ModelDetailsSaleComponent {
  fechaRegister: string="";
  numeroDocumento: string="";
  tipoPago: string="";
  total:string="";
  detailsSales: DetailsSale[]=[];
  ColumnsTable: string[]=['producto', 'cantidad', 'precio', 'total'];

  constructor(@Inject(MAT_DIALOG_DATA) public Sale: Sales){
    this.fechaRegister = Sale.fechaRegistro!;
    this.numeroDocumento = Sale.numeroDocumento!;
    this.tipoPago= Sale.tipoPago;
    this.total= Sale.totalText;
    this.detailsSales = Sale.detailsSales;
  }

}
