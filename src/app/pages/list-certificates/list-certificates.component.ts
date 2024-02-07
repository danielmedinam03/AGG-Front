import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { BandejaCertificacionesService, IFilterTable } from 'src/app/services/bandeja-certificacionesServices/bandeja-certificaciones.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-list-certificates',
  templateUrl: './list-certificates.component.html',
  styleUrls: ['./list-certificates.component.css'],
  providers: [MatSelectModule, FormControl, MatDatepicker],
})
export class ListCertificatesComponent{
  pagination: number = 1;
  selectedOption: any = new FormControl;
  certificates: any;

  filterArgs = {} as IFilterTable;
  showModal: boolean = false;
  constructor(
    public bandejaService: BandejaCertificacionesService
  ) { 
    
  }

  ngOnInit(): void {

    this.getData();
  }

  getData(): void {
    // Llamada al servicio con los parámetros del formulario
    this.bandejaService.getAllCertificates(this.filterArgs).subscribe(resp => {
      this.certificates = resp;
      this.filterArgs = {} as IFilterTable;

    },
    error => {console.error(error)});
  }

  buscar(): void {
    // Llamada al servicio con los parámetros del formulario

    this.bandejaService.getAllCertificates(this.filterArgs).subscribe(resp => {
      this.certificates = resp;
      this.filterArgs = {} as IFilterTable;

    },
    error => {console.error(error)});

  }

  descargarPDF(base64Data: string, nombreArchivo: string, variables:{number_certification:number}): void {

    if(base64Data === ""){
      this.showModal = true;
    }else{

      const fileName = `${nombreArchivo} ${variables.number_certification}.pdf` 
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
  
      const blob = new Blob([byteArray], { type: 'application/pdf' });
  
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    }
  }

  // Función para cerrar el modal
  closeModal() {
    this.showModal = false;
  }

}
