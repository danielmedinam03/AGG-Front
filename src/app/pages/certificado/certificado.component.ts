import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatosGestorService } from './../../services/datos-gestor.service';
import { DatosGeneradorService } from 'src/app/services/data-generator/datos-generador.service';
import { DatosTransportadorService } from 'src/app/services/datos-transportador.service';
import { DatosResiduosService } from 'src/app/services/datos-residuos.service';
import { BotaderoService } from 'src/app/services/botaderoServices/botadero.service';
import { TypeDocumentService } from 'src/app/services/type-documentServices/type-document.service';
import { QUANTITY_RCD } from '../get-certification/constants/quantities_rcd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Botadero, QuantitiesRcd } from 'src/app/services/get-certificationServices/get-certification.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CertificationService } from 'src/app/services/certification/certification.service';
import { DataManagerService } from 'src/app/services/data-manger/data-manager.service';
import { TypeWeightService } from 'src/app/services/type-weight/type-weight.service';
@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css'],
})
export class CertificadoComponent implements OnInit {

  razon_social: string="";
  nit: string = '';
  representante_legal: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  botaderosActive: any;
  documentsActive: any;
  dataManager:any;
  typeWeight: any;
  quantities_rcd: QuantitiesRcd[] = QUANTITY_RCD;
  showModal = false;

  generatorForm !: FormGroup;

  // -----------------------------
  id_data_generator:number=0;

  // data_driver: DataDriverRequest ={
  //   name: '',
  //   type_document_id: 0,
  //   number_id: '',
  //   vehicle_plate: ''
  // }

  // manager: ManagerRequest = 
  //   {
  //     manager_id_1: false,
  //     manager_id_2: false,
  //     manager_id_3: false
  //   };

  // quantitiesRcd: QuantitiesRcdRequest=
  //   {
  //     quantity_rcd_1: 0,
  //     quantity_rcd_2: 0,
  //     quantity_rcd_3: 0,
  //     quantity_rcd_4: 0,
  //     quantity_rcd_5: 0,
  //     quantity_rcd_6: 0,
  //     quantity_rcd_7: 0,
  //     quantity_rcd_8: 0,
  //     quantity_rcd_9: 0
  //   };
  
  // quantitiesTotal: QuantitiesTotal = {
  //   quantities: this.quantitiesRcd,
  //   total: 0
  // }

  // certificationForm: DataGeneratorRequest = {
  //   botadero_id: 0,
  //   data_manager_id: 0,
  //   name: '',
  //   type_document_id: 0,
  //   number_id: '',
  //   legal_representative: '',
  //   address: '',
  //   phone_number: 0,
  //   email: '',
  //   address_rcd: '',
  //   reception_date_rcd: '',
  //   data_driver: this.data_driver,
  //   manager: this.manager,
  //   type_weight: 0,
  //   quantitiesRcd: this.quantitiesTotal
  // }


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
    private certificacionService:CertificationService,
    private dataManagerService: DataManagerService,
    private formBuilder: FormBuilder,
    private typeWeightService: TypeWeightService
  ) {
    // this.buildForm();

  }

  ngOnInit(): void {
    this.serviceBotadero.getAllActiveBotadero().subscribe((options) => {
      this.botaderosActive = options;
    });

    this.serviceTypeDocument.getAllActiveTypeDocument().subscribe((options) => {
      this.documentsActive = options;
    });
    this.dataManagerService.getAllDataManager().subscribe((options)=>{
      this.dataManager = options;
    });
    this.typeWeightService.getAllActiveTypeWeight().subscribe((options)=>{
      this.typeWeight = options;
    });
    

    this.generatorForm = this.formBuilder.group({
        botadero_id : [0, Validators.required],
        data_manager_id : [0, Validators.required],
  
        name : ['', Validators.required],
        type_document_id : [0, Validators.required],
        number_id : ['', Validators.required],
        legal_representative : ['', Validators.required],
        address : ['', Validators.required],
        phone_number : [0, Validators.required],
        email : ['', Validators.required],
        address_rcd : ['', Validators.required],
        reception_date_rcd : ['', Validators.required],
        
        data_driver : this.formBuilder.group({
          name: ['',Validators.required],
          type_document_id: [0,Validators.required],
          number_id: ['',Validators.required],
          vehicle_plate: ['',Validators.required]
        }),
        
        manager : this.formBuilder.group({
          manager_id_1: [false],
          manager_id_2: [false],
          manager_id_3: [false]
        }),
        quantitiesRcd : this.formBuilder.group({
          quantities : this.formBuilder.group({
            quantity_rcd_1: 0,
            quantity_rcd_2: 0,
            quantity_rcd_3: 0,
            quantity_rcd_4: 0,
            quantity_rcd_5: 0,
            quantity_rcd_6: 0,
            quantity_rcd_7: 0,
            quantity_rcd_8: 0,
            quantity_rcd_9: 0
          }),
          total : [{value: 0, disabled: false}, Validators.required]
        }),
        type_weight_id: [0, Validators.required],
        consecutive : [0, Validators.required],
 
    });

  }

  get quantitiesRcd() {
    return this.generatorForm.get('quantitiesRcd');
  }

  get quantities() {
    return this.generatorForm.get('quantitiesRcd.quantities');
  }

  get addressDetails() {
    return this.generatorForm.get('addressDetails');
  }

  updateTotal() { 
    if (this.quantities){
      const cantidades = this.quantities.value;
      console.log(cantidades.quantity_rcd_1);
      const total =
        cantidades.quantity_rcd_1 +
        cantidades.quantity_rcd_2 +
        cantidades.quantity_rcd_3 +
        cantidades.quantity_rcd_4 +
        cantidades.quantity_rcd_5 +
        cantidades.quantity_rcd_6 +
        cantidades.quantity_rcd_7 +
        cantidades.quantity_rcd_8 +
        cantidades.quantity_rcd_9;

      if (this.quantitiesRcd){
        this.quantitiesRcd.get('total')?.setValue(total);
      }
    }
      
  }

  onSubmit(){
    
    this.datosGeneradorService.saveGenerador(this.generatorForm.value).subscribe(
      (resp) => {
        const numero: number = Number(resp);
        const consecutive = this.generatorForm.value;
        
        this.generateCertificates(numero, consecutive.consecutive);  
      },
      (error) => {
        console.error(error);
      }
    );
    this.route.navigateByUrl('/admin/certificaciones');

  }

  generateCertificates(id:number, consecutive:number){
    this.certificacionService.getCertificates(id, consecutive).subscribe(
      (respCert) =>{
        const fileCertificateBotadero = respCert.fileCertificateBotadero;
        const fileCertificateBascula = respCert.fileCertificateBascula;
        const fileCalibracionBascula = respCert.fileBascula;
        const numberFinalCertification = respCert.number_final_certification;
        // const fileBascula = respCert.fileBascula;
        
        if (fileCertificateBascula === ""){
          this.downloadFile(fileCertificateBotadero,'Certificacion '+numberFinalCertification+'.pdf');
        }else{
          this.downloadFile(fileCertificateBotadero,'Certificacion '+numberFinalCertification+'.pdf');
          this.downloadFile(fileCertificateBascula,'Certificacion bascula '+numberFinalCertification+'.pdf');
          this.downloadFile(fileCalibracionBascula,'Certificacion calibración bascula '+numberFinalCertification+'.pdf');  
        }
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

  onGestorSelectionChange() {
    // Obtén el ID del gestor seleccionado
    const selectedGestorId = this.generatorForm.value;
    // Llama al servicio para obtener los datos del gestor seleccionado
    this.dataManagerService.getByIdDataManager(selectedGestorId.data_manager_id)
      .subscribe(
        (gestorData: any) => {
          // Asigna los datos del gestor a las variables
          this.razon_social = gestorData.name;
          this.nit = gestorData.number_id;
          this.representante_legal = gestorData.legal_representative;
          this.direccion = gestorData.address;
          this.telefono = gestorData.phone_number;
          this.email = gestorData.email;
        },
        error => {
          console.error('Error al obtener datos del gestor:', error);
          // Maneja el error según tus necesidades
        }
      );
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveChanges() {
    this.onSubmit();
    this.closeModal();
  }

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
  type_weight_id: number;
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