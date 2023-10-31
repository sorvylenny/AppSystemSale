import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { SaleService } from 'src/app/SystemSale/Services/sale.service';
import { UtilityService } from 'src/app/SystemSale/Shared/utility.service';

export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }],
})
export class ReportComponent implements OnInit, AfterViewInit {
  formFiltre: FormGroup;
  listSaleReport: Report[] = [];
  ColumnsTable: string[] = [
    'fechaRegistro',
    'numeroVenta',
    'tipoPago',
    'prodcuto',
    'cantidad',
    'precio',
    'totalProducto',
  ];
  dateSaleReport = new MatTableDataSource(this.listSaleReport);
  @ViewChild(MatPaginator) paginatorTable!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private saleService: SaleService,
    private utilityService: UtilityService
  ) {
    this.formFiltre = this.fb.group({
      dateInit: ['', Validators.required],
      dateEnd: ['', Validators.required],
    });
  }
  ngAfterViewInit(): void {
    this.dateSaleReport.paginator = this.paginatorTable;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  searchSale() {
    const datInit = moment(this.formFiltre.value.dateInit).format('DD/MM/YYYY');
    const datEnd = moment(this.formFiltre.value.dateEnd).format('DD/MM/YYYY');

    if (datInit === 'Invalid date' || datEnd === 'Invalid date') {
      this.utilityService.Alert('Debe ingresar ambas fechas', 'Lo sentimos!');
      return;
    }
    this.saleService.GetReporte(datInit, datEnd).subscribe({
      next: (data) => {
        if (data.status) {
          this.listSaleReport = data.value;
          this.dateSaleReport.data = data.value;
        } else {
          this.listSaleReport = [];
          this.dateSaleReport.data = [];
          this.utilityService.Alert("No se encontraron datos", "Lo sentimos!!!");
        }
      },
      error: (e) => {},
    });
  }

  exportarExcel(){
    
  }
}
