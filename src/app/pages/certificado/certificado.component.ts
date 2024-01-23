import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatosGestorService } from './../../services/datos-gestor.service';
import { DatosGeneradorService } from 'src/app/services/datos-generador.service';
import { DatosTransportadorService } from 'src/app/services/datos-transportador.service';
import { DatosResiduosService } from 'src/app/services/datos-residuos.service';
import { BotaderoService } from 'src/app/services/botaderoServices/botadero.service';
import { TypeDocumentService } from 'src/app/services/type-documentServices/type-document.service';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  razon_social: string = "ALEJANDRO GARZON GUZMAN/SUMINISTRAMOS Y CONTRATAMOS AGG SAS";
  nit: string = "901191011-8";
  representante_legal: string = "ALEJANDRO GARZÓN GUZMÁN";
  direccion: string = "CALLE 70 # 12B – 77 SIETE DE AGOSTO (Oficina)";
  telefono: string = "3148095541 - (602) 3848023";
  email: string = "suministramosycontratamos@gmail.com"
  botaderosActive: any;
  documentsActive: any;
  


  public datos_gestor = {
    municipio : '',
    predio : '',
    gestor : ''
  }

  public datos_generador = {
    name : '',
    type_document_id: '',
    legal_representative: '',
    documento_rep : '',
    address: '',
    phone_number : '',
    email: '',
    address_rcd: ''
  }

  public datos_rcd = {
    uno: '',
    uno_uno: '',
    uno_dos: '',
    uno_tres: '',
    uno_cuatro: '',
    dos: '',
    dos_uno: '',
    dos_dos: '',
    dos_tres: '',
    total_rcd: '',
    fecha_rcd: ''
  }

  public datos_transportador = {
    nombre: '',
    documento: '',
    numero_documento: '',
    placa: ''

  }

  constructor(
    private datosGestorService:DatosGestorService,
    private datosGeneradorService:DatosGeneradorService,
    private datosResidousService:DatosResiduosService,
    private datosTransportadorService:DatosTransportadorService,
    private snack:MatSnackBar,
    private serviceBotadero: BotaderoService,
    private serviceTypeDocument: TypeDocumentService) { }

  ngOnInit(): void {
    this.serviceBotadero.getAllActiveBotadero().subscribe((options) => {
      this.botaderosActive = options;
    });

    this.serviceTypeDocument.getAllActiveTypeDocument().subscribe((options) => {
      this.documentsActive = options;
    });

    

  }

  formSubmit(){
    console.log(this.datos_gestor);
    if(this.datos_gestor.municipio == '' || this.datos_gestor.municipio == null){
      this.snack.open('El nombre del municipio es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }
    if(this.datos_gestor.predio == '' || this.datos_gestor.predio == null){
      this.snack.open('El nombre del predio es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.datosGestorService.saveGestor(this.datos_gestor).subscribe(
      (data) => {
        console.log(data)
        Swal.fire('Datos del gestor guardados con exito')
      }, (error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error', 'Aceptar', {
          duration:2000
        })
      }
    )

    this.datosGeneradorService.saveGenerador(this.datos_generador).subscribe(
      (data) => {
        console.log(data)
      }, (error) => {
        console.log(error);
      }
    )

    this.datosResidousService.saveResiduos(this.datos_rcd).subscribe(
      (data) => {
        console.log(data)
      }, (error) => {
        console.log(error);
      }
    )

    this.datosTransportadorService.saveTransportador(this.datos_transportador).subscribe(
      (data) => {
        console.log(data)
      }, (error) => {
        console.log(error);
      }
    )
  }

}