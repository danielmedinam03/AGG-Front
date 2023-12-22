import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { BotaderoService } from '../services/botadero.service';
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

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router,
    public botaderoService: BotaderoService) { 
  }

  // ngAfterViewInit() {
  //   this.botaderos.paginator = this.paginator;
  //   this.botaderos.sort = this.sort;
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.botaderos.filter = filterValue.trim().toLowerCase();

  //   if (this.botaderos.paginator) {
  //     this.botaderos.paginator.firstPage();
  //   }
  // }

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
  
  // editar(botaderos: { city: any; property_name: any; }){
  //   this.botaderoForm.setValue({
  //     city: botaderos.city,
  //     property_name: botaderos.property_name
  //   })
  // }

  //Ajuste realizado 
}
