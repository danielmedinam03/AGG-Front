import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeDocumentService {
  private API_SERVER = '/type-document';

  constructor(private httpClient: HttpClient) {}
  public getAllActiveTypeDocument(): Observable<any>{
    const url = environment.API_SERVER+this.API_SERVER+'/active'
    return this.httpClient.get(url);
  }
}
