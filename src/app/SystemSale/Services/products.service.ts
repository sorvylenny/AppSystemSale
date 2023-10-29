import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { Products } from '../interfaces/products';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl: string = environment.baseUrl +'Product/';

  constructor( private http: HttpClient) { }

  GetProducts():Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiUrl}Lista`);
  }

  SaveProduct(resquest:Products): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.apiUrl}Guardar`, resquest);
  }

  EditProduct(resquest:Products): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.apiUrl}Editar`, resquest);
  }

  DeleteProduct(id:number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.apiUrl}Eliminar/${id}`);
  }
}
