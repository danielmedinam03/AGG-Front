import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatosGestorService } from './../../services/datos-gestor.service';
import { DatosGeneradorService } from 'src/app/services/datos-generador.service';
import { DatosTransportadorService } from 'src/app/services/datos-transportador.service';
import { DatosResiduosService } from 'src/app/services/datos-residuos.service';
import { BotaderoService } from 'src/app/services/botaderoServices/botadero.service';
import { TypeDocumentService } from 'src/app/services/type-documentServices/type-document.service';
import { QUANTITY_RCD } from '../get-certification/constants/quantities_rcd';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Botadero, QuantitiesRcd } from 'src/app/services/get-certificationServices/get-certification.service';
import { FormsModule } from '@angular/forms';
import { CertificationService } from 'src/app/services/certification/certification.service';
@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css'],
})
export class CertificadoComponent implements OnInit {
  razon_social: string =
    'ALEJANDRO GARZON GUZMAN/SUMINISTRAMOS Y CONTRATAMOS AGG SAS';
  nit: string = '901191011-8';
  representante_legal: string = 'ALEJANDRO GARZÓN GUZMÁN';
  direccion: string = 'CALLE 70 # 12B – 77 SIETE DE AGOSTO (Oficina)';
  telefono: string = '3148095541 - (602) 3848023';
  email: string = 'suministramosycontratamos@gmail.com';
  botaderosActive: any;
  documentsActive: any;
  quantities_rcd: QuantitiesRcd[] = QUANTITY_RCD;
  // certificationForm !: FormGroup;

  id_data_generator:number=0;

  data_driver: DataDriverRequest ={
    name: '',
    type_document_id: 0,
    number_id: '',
    vehicle_plate: ''
  }

  manager: ManagerRequest = 
    {
      manager_id_1: false,
      manager_id_2: false,
      manager_id_3: false
    };

  quantitiesRcd: QuantitiesRcdRequest=
    {
      quantity_rcd_1: 0,
      quantity_rcd_2: 0,
      quantity_rcd_3: 0,
      quantity_rcd_4: 0,
      quantity_rcd_5: 0,
      quantity_rcd_6: 0,
      quantity_rcd_7: 0,
      quantity_rcd_8: 0,
      quantity_rcd_9: 0
    };
  
  quantitiesTotal: QuantitiesTotal = {
    quantities: this.quantitiesRcd,
    total: 0
  }

  certificationForm: DataGeneratorRequest = {
    botadero_id: 0,
    data_manager_id: 1,
    name: '',
    type_document_id: 0,
    number_id: '',
    legal_representative: '',
    address: '',
    phone_number: 0,
    email: '',
    address_rcd: '',
    reception_date_rcd: '',
    data_driver: this.data_driver,
    manager: this.manager,
    quantitiesRcd: this.quantitiesTotal
  }


  constructor(
    private datosGestorService: DatosGestorService,
    private datosGeneradorService: DatosGeneradorService,
    private datosResidousService: DatosResiduosService,
    private datosTransportadorService: DatosTransportadorService,
    private snack: MatSnackBar,
    private serviceBotadero: BotaderoService,
    private serviceTypeDocument: TypeDocumentService,
    public fb: FormBuilder,
    public route: Router,
    private certificacionService:CertificationService
  ) {}

  ngOnInit(): void {
    this.serviceBotadero.getAllActiveBotadero().subscribe((options) => {
      this.botaderosActive = options;
    });

    this.serviceTypeDocument.getAllActiveTypeDocument().subscribe((options) => {
      this.documentsActive = options;
    });

  }

  updateTotal() {
    const quantities = this.certificationForm.quantitiesRcd.quantities;
    this.certificationForm.quantitiesRcd.total =
      quantities.quantity_rcd_1 +
      quantities.quantity_rcd_2 +
      quantities.quantity_rcd_3 +
      quantities.quantity_rcd_4 +
      quantities.quantity_rcd_5 +
      quantities.quantity_rcd_6 +
      quantities.quantity_rcd_7 +
      quantities.quantity_rcd_8 +
      quantities.quantity_rcd_9;
  }

  onSubmit(){
    this.datosGeneradorService.saveGenerador(this.certificationForm).subscribe(
      (resp) => {
        const numero: number = Number(resp);
        this.generateCertificates(numero);
      },
      (error) => {
        console.error(error);
      }
    );
    this.route.navigateByUrl('/admin/certificaciones');

  }

  generateCertificates(id:number){
    this.certificacionService.getCertificates(id).subscribe(
      (respCert) =>{
        const fileCertificateBotadero = respCert.fileCertificateBotadero;
        const fileCertificateBascula = respCert.fileCertificateBascula;
        const numberFinalCertification = respCert.number_final_certification;
        // const fileBascula = respCert.fileBascula;
        
        this.downloadFile(fileCertificateBotadero,'Certificacion '+numberFinalCertification+'.pdf');
        this.downloadFile(fileCertificateBascula,'Certificacion bascula'+numberFinalCertification+'.pdf');
        

      }
    );
  }

  downloadFile(base64String: string, fileName: string) {
    // Convertir el string base64 a un array de bytes
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
  
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
  
    const byteArray = new Uint8Array(byteNumbers);
  
    // Crear un Blob con el array de bytes
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
  
    // Crear un enlace <a> y establecer sus atributos
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
  
    // Simular el clic en el enlace para iniciar la descarga
    link.click();
  }

  // formSubmit(){
  //   console.log(this.datos_gestor);
  //   if(this.datos_gestor.municipio == '' || this.datos_gestor.municipio == null){
  //     this.snack.open('El nombre del municipio es requerido !!','Aceptar',{
  //       duration : 3000,
  //       verticalPosition : 'top',
  //       horizontalPosition : 'right'
  //     });
  //     return;
  //   }
  //   if(this.datos_gestor.predio == '' || this.datos_gestor.predio == null){
  //     this.snack.open('El nombre del predio es requerido !!','Aceptar',{
  //       duration : 3000,
  //       verticalPosition : 'top',
  //       horizontalPosition : 'right'
  //     });
  //     return;
  //   }

  //   this.datosGestorService.saveGestor(this.datos_gestor).subscribe(
  //     (data) => {
  //       console.log(data)
  //       Swal.fire('Datos del gestor guardados con exito')
  //     }, (error) => {
  //       console.log(error);
  //       this.snack.open('Ha ocurrido un error', 'Aceptar', {
  //         duration:2000
  //       })
  //     }
  //   )

  //   this.datosGeneradorService.saveGenerador(this.datos_generador).subscribe(
  //     (data) => {
  //       console.log(data)
  //     }, (error) => {
  //       console.log(error);
  //     }
  //   )

  //   this.datosResidousService.saveResiduos(this.datos_rcd).subscribe(
  //     (data) => {
  //       console.log(data)
  //     }, (error) => {
  //       console.log(error);
  //     }
  //   )

  //   this.datosTransportadorService.saveTransportador(this.datos_transportador).subscribe(
  //     (data) => {
  //       console.log(data)
  //     }, (error) => {
  //       console.log(error);
  //     }
  //   )
  // }
}

export interface DataGeneratorRequest {
  botadero_id: number;
  data_manager_id: number;
  unic_number?: number;
  name: string;
  type_document_id: number;
  number_id: string;
  legal_representative: string;
  address: string;
  phone_number: number;
  email: string;
  address_rcd: string;
  reception_date_rcd: string;
  data_driver: DataDriverRequest;
  manager: ManagerRequest;
  quantitiesRcd: QuantitiesTotal;
}

export interface ManagerRequest{
  manager_id_1: boolean;
  manager_id_2: boolean;
  manager_id_3: boolean;
}

export interface QuantitiesTotal{
  quantities: QuantitiesRcdRequest;
  total: number;
}

export interface QuantitiesRcdRequest{
  quantity_rcd_1:number;
  quantity_rcd_2:number;
  quantity_rcd_3:number;
  quantity_rcd_4:number;
  quantity_rcd_5:number;
  quantity_rcd_6:number;
  quantity_rcd_7:number;
  quantity_rcd_8:number;
  quantity_rcd_9:number;
  
}

export interface DataDriverRequest {
  name: string;
  type_document_id: number;
  number_id: string;
  vehicle_plate: string;
}
