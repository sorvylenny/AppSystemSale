import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModelProductComponent } from '../../Models/model-product/model-product.component';
import { ProductsService } from 'src/app/SystemSale/Services/products.service';
import { UtilityService } from 'src/app/SystemSale/Shared/utility.service';
import { Products } from 'src/app/SystemSale/interfaces/products';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements AfterViewInit, OnInit {
  ColumnsTable: string[] = [
    'nombre',
    'categoria',
    'stock',
    'precio',
    'estado',
    'acciones',
  ];
  dataInit: Products[] = [];
  dataListProducts = new MatTableDataSource(this.dataInit);
  @ViewChild(MatPaginator) paginatorTable!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private productsService: ProductsService,
    private utilityService: UtilityService
  ) {}

  obtenerProducts() {
    this.productsService.GetProducts().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListProducts.data = data.value;
        } else {
          this.utilityService.Alert(
            "No se encontro nada",
            "Ha ocurrido un error"
          );
        }
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    this.obtenerProducts();
  }
  ngAfterViewInit(): void {
    this.dataListProducts.paginator = this.paginatorTable;
  }

  appSearchTable(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListProducts.filter = filterValue.trim().toLocaleLowerCase();
  }

  newProduct(){
    this.dialog.open(ModelProductComponent, {
      disableClose:true
    }).afterClosed().subscribe(res =>{
      if(res ==="true") this.obtenerProducts();
    });
  }

  editProduct(product:Products){
    this.dialog.open(ModelProductComponent, {
      disableClose:true,
      data: product
    }).afterClosed().subscribe(res =>{
      if(res ==="true") this.obtenerProducts();
    });
  }

  deleteProduct(product: Products) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el Producto?',
      text: product.nombre,
      icon: 'warning',
      confirmButtonColor: '#1ABC9C',
      confirmButtonText: "Sí, eliminar",
      showCancelButton: true,
      cancelButtonText: "No, Regresar",
      cancelButtonColor: '#C0392B'
    }).then((result) => { 
      if (result.isConfirmed) { 
        this.productsService.DeleteProduct(product.idProducts).subscribe({
          next: (res) => {
            if (res.status) {
              this.utilityService.Alert("El Producto fue eliminado", "Great!");
              this.obtenerProducts();
            } else {
              this.utilityService.Alert("No se pudo eliminar el producto", "¡Error!");
            }
          },
          error: (e) => { }
        });
      }
    });
  } 






}
