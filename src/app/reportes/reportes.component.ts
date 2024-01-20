
import { Component, OnInit } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BotaderoService } from '../services/botaderoServices/botadero.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  showModal = false;
  myForm!: FormGroup;
  options : any;
  constructor(private fb: FormBuilder,
    private serviceBotadero:BotaderoService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      options: [null, Validators.required]
    });
  
    this.serviceBotadero.getAllActiveBotadero().subscribe(options => {
      this.options = options;
    });

  }

  

  onSubmit() {
    // Aquí puedes manejar la lógica para guardar los datos
    console.log('Formulario enviado:', this.myForm.value);
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  onCancel() {
    // Resetea el formulario para limpiar los inputs
    this.myForm.reset();
  }
}
