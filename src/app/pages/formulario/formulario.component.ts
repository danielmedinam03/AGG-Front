import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formulario: FormGroup | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      edad: [null, [Validators.required, Validators.min(18)]],
    });;
  }


  onSubmit(): void {
    if (this.formulario && this.formulario.valid) {
      // Realizar acciones con los datos del formulario
      console.log(this.formulario.value);
    }
  }
}
