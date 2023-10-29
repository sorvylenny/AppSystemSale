import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';
import { Sales } from '../interfaces/sales';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl: string = environment.baseUrl +'Sales/';

  constructor( private http: HttpClient) { }

  RegisterSale(resquest:Sales): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.apiUrl}Registrar`, resquest);
  }

  GetHistorial(searchfor:string, numberSale:string, dateInit: string, dateEnd: string ):Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiUrl}Historial?searchfor=${searchfor}&numberSale=${numberSale}&dateInit=${dateInit}&dateEnd=${dateEnd}`);
  }

  GetReporte(dateInit: string, dateEnd: string ):Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiUrl}Reporte?dateInit=${dateInit}&dateEnd=${dateEnd}`);
  }

}
