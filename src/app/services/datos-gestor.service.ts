import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosGestorService {

  private API_SERVER = '/certificado'

  constructor(private httpClient: HttpClient) { }

  public saveGestor(gestor:any){
    return this.httpClient.post(environment.API_SERVER+this.API_SERVER, gestor);
  }
}
