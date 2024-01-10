import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { BotaderoService } from '../services/botaderoServices/botadero.service';
import { NgModel } from '@angular/forms';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-botadero',
  templateUrl: './botadero.component.html',
  styleUrls: ['./botadero.component.css'],
  providers: [NgModel, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule]
})
export class BotaderoComponent implements OnInit { 
  botaderos: any;
  id: any;
  status: any;
  pagination: number = 1;


  constructor(private router: Router,
    public botaderoService: BotaderoService) { 
  }


  ngOnInit(): void {
    this.botaderoService.getAllBotadero().subscribe(resp => {
      this.botaderos = resp;
    },
    error => {console.error(error)});
  }

  estadoToggle: boolean = false; // Inicializa con el valor que desees

  editStatus(id: number, status:boolean){
    this.botaderoService.updateStatus(id,status).subscribe(
      () => console.log('Estado actualizado correctamente'),
      error => console.error('Error al actualizar el estado:', error)
    );
  }
  
}
