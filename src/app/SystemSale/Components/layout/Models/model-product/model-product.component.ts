import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoriaService } from "src/app/SystemSale/Services/categoria.service";
import { ProductsService } from "src/app/SystemSale/Services/products.service";
import { UtilityService } from "src/app/SystemSale/Shared/utility.service";
import { Categoria } from "src/app/SystemSale/interfaces/categoria";
import { Products } from "src/app/SystemSale/interfaces/products";
@Component({
  selector: 'app-model-product',
  templateUrl: './model-product.component.html',
  styleUrls: ['./model-product.component.css']
})
export class ModelProductComponent implements OnInit {
  formProduct: FormGroup;
  titleAction: string = "Agregar";
  buttonAction: string = "Guardar";
  ListCategoria: Categoria[] = [];

  constructor(
    private modalsActual: MatDialogRef<ModelProductComponent>,
    @Inject(MAT_DIALOG_DATA) public dateProduct: Products,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private productsService: ProductsService,
    private utilityService: UtilityService
  ) {
    this.formProduct = this.fb.group({
      nombre: ['', Validators.required],
      idCategoria: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      esActivo: [1, Validators.required]
    });
    if (this.dateProduct!=null){
      this.titleAction="Editar";
      this.buttonAction='Modificar';
    }
    this.categoriaService.GetCategoria().subscribe({
      next:(data)=>{
        if(data.status){ this.ListCategoria = data.value}
      },
      error:()=>{}
    })
  }

  ngOnInit(): void {
    if (this.dateProduct != null) {
      this.formProduct.patchValue({
        nombre: this.dateProduct.nombre ,
        idCategoria: this.dateProduct.idCategoria,
        stock:this.dateProduct.stock,
        price: this.dateProduct.price,
        esActivo: this.dateProduct.esActivo.toString()
      });
    }
  }

  saveEdit_Product() {
    const product: Products = {
      idProducts: this.dateProduct == null ? 0 : this.dateProduct.idProducts,
      nombre: this.formProduct.value.nombre,
      idCategoria: this.formProduct.value.idCategoria,
      descripcionCategoria: "",
      stock: this.formProduct.value.stock,
      price: this.formProduct.value.price,
      esActivo: parseInt(this.formProduct.value.esActivo),
    }

    if (this.dateProduct == null) {
      this.productsService.SaveProduct(product).subscribe({
        next: (data) => {
          if (data.status) {
            this.utilityService.Alert('success', 'El producto creado correctamente');
            this.modalsActual.close("true");
          } else {
            this.utilityService.Alert("No se pudo registrar el producto", "Ha ocurrido un error!");
          }
        },
        error:(e)=>{}  
      });
       
    } else {
      this.productsService.EditProduct(product).subscribe({
        next:(data) =>{
          if (data.status) {
            this.utilityService.Alert('success', 'El producto editado correctamente');
            this.modalsActual.close("true");
          } else {
            this.utilityService.Alert("No se pudo editar el producto", "Ha ocurrido un error!");
          }
        },
       error:(e) =>{}
      });
    }
  }
}
