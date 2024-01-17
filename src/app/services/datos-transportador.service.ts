import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosTransportadorService {

  private API_SERVER = '/certificado'

  constructor(private httpClient: HttpClient) { }

  public saveTransportador(transportador:any){
    return this.httpClient.post(environment.API_SERVER+this.API_SERVER, transportador);
  }
}
