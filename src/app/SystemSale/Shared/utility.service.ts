import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../interfaces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private _snackBar: MatSnackBar) { }

  Alert(msg: string, type:string){
    this._snackBar.open(msg, type,{
      horizontalPosition: "end",
      verticalPosition: "top",
      duration:3000
    });
  }

  SaveSesionUser(userSesion: Sesion){
    localStorage.setItem("user", JSON.stringify(userSesion));
  }

  GetSesionUser(){
    const dataString = localStorage.getItem("user");
    const user = JSON.parse(dataString!);
    return user;
  }
  
  DeleteSEsionUser(){
    localStorage.removeItem('user');
  }

}
