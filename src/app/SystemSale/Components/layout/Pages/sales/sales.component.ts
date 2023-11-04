import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/SystemSale/Services/products.service';
import { SaleService } from 'src/app/SystemSale/Services/sale.service';
import { UtilityService } from 'src/app/SystemSale/Shared/utility.service';
import { DetailsSale } from 'src/app/SystemSale/interfaces/details-sale';
import { Products } from 'src/app/SystemSale/interfaces/products';
import { Sales } from 'src/app/SystemSale/interfaces/sales';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  agregarVenta!:boolean;


  listProduct: Products[] = [];
  listaProductFilter: Products[] = [];
  listProductForSale: DetailsSale[] = [];
  bloquearButtonRegister: boolean = false;

  productSelect!: Products;
  typeCash: string = 'Efectivo';
  totalCash: number = 0;
  formProductSale: FormGroup;
  ColumnsTable: string[] = [
    'producto',
    'cantidad',
    'precio',
    'total',
    'accion',
  ];
  datedetailsSales = new MatTableDataSource(this.listProductForSale);

  retornarProductsForFilter(search: any): Products[] {
    const searchValor =
      typeof search === "string"
        ? search.toLocaleLowerCase()
        : search.nombre.toLocaleLowerCase();
    return this.listProduct.filter(item =>
      item.nombre.toLocaleLowerCase().includes(searchValor));
  }

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private saleService: SaleService,
    private utilityService: UtilityService
  ) {
    this.formProductSale = this.fb.group({
      producto:['', Validators.required],
      cantidad:['',Validators.required]
    });

    this.productsService.GetProducts().subscribe({
      next:(data)=>{
        if(data.status){ 
          const list = data.value as Products[];
          this.listProduct= list.filter(p=>p.esActivo == 1 && p.stock > 0);
         }
      },
      error:()=>{}
    })
    this.formProductSale.get('producto')?.valueChanges.subscribe(value=> {
      this.listaProductFilter= this.retornarProductsForFilter(value);
    })
  }

  showProduct(product:Products): string{
    return product.nombre;
  }

  productForSale(event:any){
    this.productSelect = event.option.value;
  }

  addProductForSale(){

    const cantidad: number = this.formProductSale.value.cantidad;
    const price:number =parseFloat(this.productSelect.price);
    const total: number = cantidad * price;
    this.totalCash = this.totalCash + total;

    this.listProductForSale.push({
      idProducts: this.productSelect.idProducts,
      descripcionProducts: this.productSelect.nombre,
      quantity: cantidad,
      priceText: String(price.toFixed(2)),
      totalText: String(total.toFixed(2))
    })
    this.datedetailsSales = new MatTableDataSource(this.listProductForSale);

    this.formProductSale.patchValue({
      producto:'',
      cantidad:''
    })
  }

  deleteProduct(details: DetailsSale){
    this.totalCash = this.totalCash-parseFloat(details.totalText);
    this.listProductForSale = this.listProductForSale.filter(p => p.idProducts != details.idProducts);
    this.datedetailsSales = new MatTableDataSource(this.listProductForSale);
  }

  registrarSale(){

    if (this.listProductForSale.length > 0){

      this.bloquearButtonRegister=true;

      const request: Sales ={
        tipoPago:  this.typeCash,
        totalText: String(this.totalCash.toFixed(2)),
        detailsSales: this.listProductForSale
      }
      console.log('Datos de la solicitud:', request);

      this.saleService.RegisterSale(request).subscribe({
        next:(response)=>{
          console.log('Respuesta del servicio:', response);
          if(response.status){
            this.totalCash = 0.00;
            this.listProductForSale=[];
            this.datedetailsSales= new MatTableDataSource(this.listProductForSale);

            Swal.fire({
              icon: 'success',
              title:'Venta exitosa!',
              text:`Numero de venta: ${response.value.numeroDocumento}`
            })
          }else{
            
            this.utilityService.Alert("No se pudo registrar la venta","Ha ocurrido un error!");
            console.log(response)
          }
        },
        complete:()=>{
          this.bloquearButtonRegister=false;
        },
        error:(e)=>{
          console.log('Error en la llamada al servicio:', e);
        }
      })
    }
  }
}
