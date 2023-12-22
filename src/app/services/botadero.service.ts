import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BotaderoService {

  private API_SERVER = '/botadero';

  constructor(private httpClient: HttpClient) { }

  public getAllBotadero(): Observable<any>{
    return this.httpClient.get(environment.API_SERVER+this.API_SERVER);
  }

  public saveBotadero(botadero:any): Observable<any>{
    return this.httpClient.post(environment.API_SERVER+this.API_SERVER, botadero);
  }
  
  public updateStatus(id:number, status:boolean): Observable<any>{
    const url = `${environment.API_SERVER}${this.API_SERVER}/${id}/status`;
    console.log(url);
    return this.httpClient.put(url,status);
  }

}
