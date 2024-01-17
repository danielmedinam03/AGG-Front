import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosResiduosService {

  private API_SERVER = '/certificado'

  constructor(private httpClient: HttpClient) { }

  public saveResiduos(residuo:any){
    return this.httpClient.post(environment.API_SERVER+this.API_SERVER, residuo);
  }

}
