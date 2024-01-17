import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BandejaCertificacionesService {
  private url = environment.API_SERVER + '/certificate';

  constructor(private httpClient: HttpClient) { }

  public getAllCertificates(filterArgs:IFilterTable
    ): Observable<any>{
      
      const params = this.generateParams(filterArgs);

    let result = this.httpClient.get<any>(this.url,{params:params});
    return result;
  }
  public generateParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    // Agrega cada parámetro al objeto HttpParams
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return httpParams;
  }
}

export interface IFilterTable{
  create_date: string;
  number_certification:string;
  number_id:string;
}
