import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatosGestorService } from './../../services/datos-gestor.service';
import { DatosGeneradorService } from 'src/app/services/datos-generador.service';
import { DatosTransportadorService } from 'src/app/services/datos-transportador.service';
import { DatosResiduosService } from 'src/app/services/datos-residuos.service';
import { Router } from '@angular/router';
import { BotaderoService } from '../../services/botaderoServices/botadero.service';

import { NgModel } from '@angular/forms';

import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface City {
  value: string;
  viewValue: string;
}

interface CityGroups {
  disabled?: boolean;
  name: string;
  property_name: City[];
}

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  providers: [NgModel, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  botaderos: any;
  razon_social: string = "ALEJANDRO GARZON GUZMAN/SUMINISTRAMOS Y CONTRATAMOS AGG SAS";
  nit: string = "901191011-8";
  representante_legal: string = "ALEJANDRO GARZÓN GUZMÁN";
  direccion: string = "CALLE 70 # 12B – 77 SIETE DE AGOSTO (Oficina)";
  telefono: string = "3148095541 - (602) 3848023";
  email: string = "suministramosycontratamos@gmail.com"

  public datos_gestor = {
    city : '',
    property_name : '',
    manager : ''
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
    name: '',
    type_document_id: '',
    number_id: '',
    vehicle_plate: ''

  }

  constructor(
    private datosGestorService:DatosGestorService,
    private datosGeneradorService:DatosGeneradorService,
    private datosResidousService:DatosResiduosService,
    private datosTransportadorService:DatosTransportadorService,
    private snack:MatSnackBar,
    public botaderoService: BotaderoService
    ) { }

  ngOnInit(): void {
    this.botaderoService.getAllBotadero().subscribe(resp => {
      this.botaderos = resp;
    },
    error => {console.error(error)});
  }

  cityControl = new FormControl('');
  cityGroups: CityGroups[] = [
    {
      name: 'Cali',
      property_name: [
        {value: 'ladiana', viewValue: 'La Diana'},
        {value: 'lapaloma', viewValue: 'La Paloma'}
      ]
    }
  ]

  formSubmit(){
    console.log(this.datos_gestor);
    if(this.datos_gestor.city == '' || this.datos_gestor.city == null){
      this.snack.open('El nombre del municipio es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }
    if(this.datos_gestor.property_name == '' || this.datos_gestor.property_name == null){
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