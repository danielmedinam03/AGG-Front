import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  private url = environment.API_SERVER + '/report'
  constructor(private httpClient: HttpClient) { 
  }

  getReportCvc(jsonData: any):Observable<any> {
    return this.httpClient.post<any>(this.url,jsonData)
  }

  descargarArchivoXLSX(base64String: string, nombreArchivo: string): void {
    const arrayBuffer = this.base64ToArrayBuffer(base64String);
    const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = nombreArchivo;
    link.click();
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  }
}
