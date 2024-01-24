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

}