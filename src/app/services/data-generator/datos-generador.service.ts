import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DatosGeneradorService {

  private API_SERVER = '/generator'

  constructor(private httpClient: HttpClient) { }

  public saveGenerador(generador:any){
    return this.httpClient.post(environment.API_SERVER+this.API_SERVER, generador);
  }
  
  public getByIdEdit(id:any){
    const url = `${environment.API_SERVER}${this.API_SERVER}/${id}/edit`
    return this.httpClient.get(url)
  }
  public editGenerador(id:number,generador:any){
    const url = `${environment.API_SERVER}${this.API_SERVER}/${id}`
    return this.httpClient.put(url, generador);
  }

}
