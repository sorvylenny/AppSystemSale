import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl: string = environment.baseUrl +'Menu/';
  constructor( private http: HttpClient) { }

  GetMenu(idUser: number):Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiUrl}Lista?idUser=${idUser}`);
  }
}
