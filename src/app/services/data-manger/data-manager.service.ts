import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  private API_SERVER = environment.API_SERVER +'/data-manager';

  constructor(private httpClient: HttpClient) { }

  public getAllDataManager(): Observable<any>{

    return this.httpClient.get(this.API_SERVER);
  }

  public getByIdDataManager(id: number): Observable<any>{
    const url = `${this.API_SERVER}/${id}`
    return this.httpClient.get(url);
  }
}
