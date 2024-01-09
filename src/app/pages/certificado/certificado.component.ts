import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatosGestorService } from './../../services/datos-gestor.service';
import { DatosGeneradorService } from 'src/app/services/datos-generador.service';
import { DatosTransportadorService } from 'src/app/services/datos-transportador.service';
import { DatosResiduosService } from 'src/app/services/datos-residuos.service';

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

  public datos_gestor = {
    municipio : '',
    predio : '',
    gestor : ''
  }

  constructor(
    private datosGestorService:DatosGestorService,
    private datosGeneradorService:DatosGeneradorService,
    private datosResidousService:DatosResiduosService,
    private datosTransportadorService:DatosTransportadorService,
    private snack:MatSnackBar) { }

  ngOnInit(): void {
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
  }

}