import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { ResponseApi } from '../interfaces/response-api';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = environment.baseUrl +'Users/';
  constructor( private http: HttpClient) { }

  PostInitSesion(resquest:Login): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.apiUrl}IniciarSesion`, resquest);
  }
  GetUsers():Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiUrl}Lista`);
  }
  SaveUsers(resquest:Users): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.apiUrl}Guardar`, resquest);
  }

  EditUsers(resquest:Users): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.apiUrl}Editar`, resquest);
  }

  DeleteUsers(id:number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.apiUrl}Eliminar/${id}`);
  }

}

