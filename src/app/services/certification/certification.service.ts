import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  private API_SERVER = environment.API_SERVER + '/certificate';


  constructor(private httpClient: HttpClient) { }

  getCertificates(id: number): Observable<any> {
    const url = `${this.API_SERVER}/${id}`;
    return this.httpClient.get(url);
  }
}
