import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeWeightService {
  private API_SERVER = '/type-weight';
  
  constructor(private httpClient: HttpClient) {}
  public getAllActiveTypeWeight(): Observable<any>{
    const url = environment.API_SERVER+this.API_SERVER;
    return this.httpClient.get(url);
  }
}
