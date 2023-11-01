import { Component, OnInit } from '@angular/core';
import { Menu } from '../../interfaces/menu';
import { Router } from '@angular/router';
import { MenuService } from '../../Services/menu.service';
import { UtilityService } from '../../Shared/utility.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  listMenus: Menu[]=[];
  emailUser: string ="";
  rolesUser: string= "";
  
  constructor(private router: Router, 
    private menuService: MenuService, 
    private utilityService: UtilityService){}

  ngOnInit(): void {
    const user = this.utilityService.GetSesionUser();
    if(user !=null){
      this.emailUser = user.email;
      this.rolesUser = user.rolesDescripcion;

      this.menuService.GetMenu(user.idUsers).subscribe({
        next:(data) =>{
          if(data.status){ this.listMenus=data.value;}
        },
        error:(e)=>{}
      })
    }
  }

  closetSesion(){
    this.utilityService.DeleteSEsionUser();
    this.router.navigate(['login']);
  }
}
