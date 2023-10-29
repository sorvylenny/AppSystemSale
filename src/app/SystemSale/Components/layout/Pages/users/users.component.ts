import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/SystemSale/Services/users.service';
import { UtilityService } from 'src/app/SystemSale/Shared/utility.service';
import { Users } from 'src/app/SystemSale/interfaces/users';
import { ModelUserComponent } from '../../Models/model-user/model-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {
  ColumnsTable: string [] =['fullname', 'email', 'rolesDescripcion', 'estado', 'acciones'];
  dataInit: Users[]=[];
  dataListUser = new MatTableDataSource (this.dataInit);
  @ViewChild(MatPaginator) paginatorTable! : MatPaginator; 


  constructor(private dialog: MatDialog,
              private userService: UsersService,
              private utilityService: UtilityService) { }
  
  obtenerUsers(){
    this.userService.GetUsers().subscribe({
      next:(data)=>{
        if(data.status){ this.dataListUser.data = data.value} 
        else{this.utilityService.Alert("No se encontro nada","Ha ocurrido un error")}
      },
      error:(e)=>{}
    })
  }
  ngOnInit(): void {
    this.obtenerUsers();
  }
  ngAfterViewInit(): void {
    this.dataListUser.paginator = this.paginatorTable;
  }

  appSearchTable(event: Event){
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataListUser.filter = searchValue.trim().toLocaleLowerCase();
    console.log(this.dataListUser);
  }

  newUser(){
    this.dialog.open(ModelUserComponent, {
      disableClose:true
    }).afterClosed().subscribe(res =>{
      if(res ==="true") this.obtenerUsers();
    });
  }
  editUser(user:Users){
    this.dialog.open(ModelUserComponent, {
      disableClose:true,
      data: user
    }).afterClosed().subscribe(res =>{
      if(res ==="true") this.obtenerUsers();
    });
  }

  deleteUser(user: Users) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el usuario?',
      text: user.fullname,
      icon: 'warning',
      confirmButtonColor: '#1ABC9C',
      confirmButtonText: "Sí, eliminar",
      showCancelButton: true,
      cancelButtonText: "No, Regresar",
      cancelButtonColor: '#C0392B'
    }).then((result) => {
      if (result.isConfirmed) { 
        this.userService.DeleteUsers(user.idUsers).subscribe({
          next: (res) => {
            if (res.status) {
              this.utilityService.Alert("El usuario fue eliminado", "Great!");
              this.obtenerUsers();
            } else {
              this.utilityService.Alert("No se pudo eliminar el Usuario", "¡Error!");
            }
          },
          error: (e) => { }
        });
      }
    });
  } 
}
 