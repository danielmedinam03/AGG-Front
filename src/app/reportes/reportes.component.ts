import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BotaderoService } from '../services/botaderoServices/botadero.service';
import { ReportServiceService } from '../services/reportService/report-service.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  showModal = false;
  myForm!: FormGroup;
  options: any;
  constructor(
    private fb: FormBuilder,
    private serviceBotadero: BotaderoService,
    private reportService: ReportServiceService,
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      id_botadero: [null, Validators.required],
    });

    this.serviceBotadero.getAllActiveBotadero().subscribe((options) => {
      this.options = options;
    });
  }

  onSubmit() {
    const jsonData = this.myForm.value;

    this.reportService.getReportCvc(jsonData).subscribe(
      (data) => {
        // Manejar los datos obtenidos de la API
        const base64String = data.fileBase64; // Ajusta según la estructura de la respuesta
        const nombreArchivo = data.name; // Establece el nombre de descarga

        // Descargar el archivo .xlsx
        this.reportService.descargarArchivoXLSX(base64String, nombreArchivo);
        this.onCancel();
      },
      (error) => {
        // Manejar errores
        console.error(error);
      }
    );
  }

  onCancel() {
    // Resetea el formulario para limpiar los inputs
    this.myForm.reset();
  }

}
