import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RolesService } from "src/app/SystemSale/Services/roles.service";
import { UsersService } from "src/app/SystemSale/Services/users.service";
import { UtilityService } from "src/app/SystemSale/Shared/utility.service";
import { Roles } from "src/app/SystemSale/interfaces/roles";
import { Users } from "src/app/SystemSale/interfaces/users";

@Component({
  selector: "app-model-user",
  templateUrl: "./model-user.component.html",
  styleUrls: ["./model-user.component.css"]
})
export class ModelUserComponent implements OnInit {
  formUser: FormGroup;
  hidePassword: boolean = true;
  titleAction: string = "Agregar";
  buttonAction: string = "Guardar";
  ListRoles: Roles[] = [];

  constructor(
    private modalsActual: MatDialogRef<ModelUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dateUser: Users,
    private fb: FormBuilder,
    private rolesService: RolesService,
    private userService: UsersService,
    private utilityService: UtilityService
  ) {
    this.formUser = this.fb.group({
      fullname: ["", Validators.required],
      email: ["", Validators.required],
      idRoles: ["", Validators.required],
      clave: ["", Validators.required],
      esActivo: ["", Validators.required]
    });
    if (this.dateUser!=null){
      this.titleAction="Editar";
      this.buttonAction='Modificar';
    }
    this.rolesService.GetRoles().subscribe({
      next:(res)=>{
        if(res.status){ this.ListRoles = res.value}
      },
      error:()=>{}
    })
  }
  ngOnInit(): void {
    if (this.dateUser != null) {
      this.formUser.patchValue({
        fullname: this.dateUser.fullname,
        email:this.dateUser.email,
        idRoles: this.dateUser.idRoles,
        clave:this.dateUser.clave,
        esActivo: this.dateUser.esActivo.toString()
      })
    }
  }

  saveEditUser() {
    const user: Users = {
      idUsers: this.dateUser == null ? 0 : this.dateUser.idUsers,
      fullname: this.formUser.value.fullname,
      email: this.formUser.value.email,
      idRoles: this.formUser.value.idRoles,
      rolesDescripcion: "",
      clave: this.formUser.value.clave,
      esActivo: parseInt(this.formUser.value.esActivo),
    }

    if (this.dateUser == null) {
      this.userService.PostSaveUsers(user).subscribe({
        next: (res) => {
          if (res.status) {
            this.utilityService.Alert('success', 'Usuario creado correctamente');
            this.modalsActual.close("true");
          } else {
            this.utilityService.Alert("No se pudo registrar el usuario", "Ha ocurrido un error!");
          }
        },
        error:()=>{}  
      });
       
    } else {
      this.userService.PutEditUsers(user).subscribe({
        next:(res) =>{
          if (res.status) {
            this.utilityService.Alert('success', 'Usuario editado correctamente');
            this.modalsActual.close("true");
          } else {
            this.utilityService.Alert("No se pudo editar el usuario", "Ha ocurrido un error!");
          }
        },
       error:() =>{}
      });
    }
  }

}