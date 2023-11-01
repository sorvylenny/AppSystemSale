import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { SaleService } from 'src/app/SystemSale/Services/sale.service';
import { UtilityService } from 'src/app/SystemSale/Shared/utility.service';
import { Sales } from 'src/app/SystemSale/interfaces/sales';
import { ModelDetailsSaleComponent } from '../../Models/model-details-sale/model-details-sale.component';


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
  selector: 'app-historial-venta',
  templateUrl: './historial-venta.component.html',
  styleUrls: ['./historial-venta.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }],
})
export class HistorialVentaComponent implements OnInit,AfterViewInit{
  formSearch: FormGroup;
  optionSearch: any[] = [
    { value: "fecha", descripcion: "Por fechas" },
    { value:"numero", descripcion: "Numero Venta" },
  ];
  ColumnsTable: string[] = [
    'fechaRegistro',
    'numeroDocumento',
    'tipopago',
    'total',
    'accion',
  ];
  dataInicio: Sales[] = [];
  dateListSale = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginatorTable!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private saleService: SaleService,
    private utilityService: UtilityService
  ) {
    this.formSearch = this.fb.group({
      searchfor: ['fecha'],
      numberSale: [''],
      dateInit: [''],
      dateEnd: [''],
    });
    this.formSearch.get("searchfor")?.valueChanges.subscribe(value => {
      this.formSearch.patchValue({
        numero: "",
        dateInit: "",
        dateEnd: "",
      });
    });
  }

  ngOnInit(): void {
   
  }
  ngAfterViewInit(): void {
    this.dateListSale.paginator = this.paginatorTable;
  }

  appSearchTable(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dateListSale.filter = searchValue.trim().toLocaleLowerCase();
    console.log(this.dateListSale);
  }

  searchSale() {
    let datInit: string = '';
    let datEnd: string = '';

    if (this.formSearch.value.searchfor === "fecha") {
      datInit = moment(this.formSearch.value.dateInit).format('DD/MM/YYYY');
      datEnd = moment(this.formSearch.value.dateEnd).format('DD/MM/YYYY');

      if (datInit === 'Invalid date' || datEnd === 'Invalid date') {
        this.utilityService.Alert('Debe ingresar ambas fechas', 'Lo sentimos!');
        return;
      }
    }
    this.saleService
      .GetHistorial(
        this.formSearch.value.searchfor,
        this.formSearch.value.numberSale,
        datInit,
        datEnd
      )
      .subscribe({
        next: (data) => {
          if (data.status) {
            this.dateListSale = data.value;
          } else {
            this.utilityService.Alert(
              'No se encontraron datos',
              'Lo sentimos!'
            );
          }
        },
        error: (e) => {},
      });
  }
  sedDetailsSale(sale:Sales){
    this.dialog.open(ModelDetailsSaleComponent,{
      data: sale,
      disableClose: true,
      width:'800px'
    })
  }

}
