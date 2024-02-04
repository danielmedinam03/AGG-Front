import { Component, OnInit } from '@angular/core';
import { DataDriverRequest, ManagerRequest, QuantitiesRcdRequest, QuantitiesTotal, DataGeneratorRequest } from '../../certificado/certificado.component';
import { DatosGeneradorService } from 'src/app/services/data-generator/datos-generador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BotaderoService } from 'src/app/services/botaderoServices/botadero.service';
import { TypeDocumentService } from 'src/app/services/type-documentServices/type-document.service';
import { DataManagerService } from 'src/app/services/data-manger/data-manager.service';

@Component({
  selector: 'app-edit-certificate',
  templateUrl: './edit-certificate.component.html',
  styleUrls: ['./edit-certificate.component.css']
})
export class EditCertificateComponent implements OnInit {

  razon_social: string="";
  nit: string = '';
  representante_legal: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';

  botaderosActive:any;
  get_data_generator:any;
  showModal = false;
  documentsActive:any;
  dataManager:any;
  id_url:any;

  data_manager:any;

  data_driver: DataDriverRequest ={
    name: '',
    type_document_id: 0,
    number_id: '',
    vehicle_plate: ''
  }

  manager: ManagerRequest = 
    {
      manager_id_1: false,
      manager_id_2: false,
      manager_id_3: false
    };

  quantitiesRcd: QuantitiesRcdRequest=
    {
      quantity_rcd_1: 0,
      quantity_rcd_2: 0,
      quantity_rcd_3: 0,
      quantity_rcd_4: 0,
      quantity_rcd_5: 0,
      quantity_rcd_6: 0,
      quantity_rcd_7: 0,
      quantity_rcd_8: 0,
      quantity_rcd_9: 0
    };
  
  quantitiesTotal: QuantitiesTotal = {
    quantities: this.quantitiesRcd,
    total: 0
  }

  certificationForm: DataGeneratorRequest = {
    botadero_id: 0,
    data_manager_id: 0,
    name: '',
    type_document_id: 0,
    number_id: '',
    legal_representative: '',
    address: '',
    phone_number: 0,
    email: '',
    address_rcd: '',
    reception_date_rcd: '',
    data_driver: this.data_driver,
    manager: this.manager,
    type_weight: 0,
    quantitiesRcd: this.quantitiesTotal
  }

  constructor(private serviceDataGenerator: DatosGeneradorService,
    private activateRouter: ActivatedRoute,
    private serviceBotadero: BotaderoService,
    private serviceTypeDocument: TypeDocumentService,
    private dataManagerService: DataManagerService,
    public route: Router,

    ) { 
      
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

    this.id_url= this.activateRouter.snapshot.params['id'];
      this.serviceDataGenerator.getByIdEdit(this.id_url).subscribe((resp:any) => {
        this.get_data_generator=resp;
    },
    error => {console.error(error)});

  }




  updateTotal() {
    const quantities = this.get_data_generator.quantitiesRcd;
    this.get_data_generator.total_rcd =
      quantities.quantity_rcd_1 +
      quantities.quantity_rcd_2 +
      quantities.quantity_rcd_3 +
      quantities.quantity_rcd_4 +
      quantities.quantity_rcd_5 +
      quantities.quantity_rcd_6 +
      quantities.quantity_rcd_7 +
      quantities.quantity_rcd_8 +
      quantities.quantity_rcd_9;
  }

  onGestorSelectionChange() {
    //Obtén el ID del gestor seleccionado
    const selectedGestorId = this.get_data_generator.data_manager.id_data_manager;

    // Llama al servicio para obtener los datos del gestor seleccionado
    this.dataManagerService.getByIdDataManager(selectedGestorId)
      .subscribe(
        (gestorData: any) => {
          // Asigna los datos del gestor a las variables
          this.get_data_generator.data_manager.name = gestorData.name;
          this.get_data_generator.data_manager.number_id = gestorData.number_id;
          this.get_data_generator.data_manager.legal_representative = gestorData.legal_representative;
          this.get_data_generator.data_manager.address = gestorData.address;
          this.get_data_generator.data_manager.phone_number = gestorData.phone_number;
          this.get_data_generator.data_manager.email = gestorData.email;
        },
        error => {
          console.error('Error al obtener datos del gestor:', error);
          // Maneja el error según tus necesidades
        }
      );
  }

  guardarCambios(): void {
    const id = this.activateRouter.snapshot.params['id'];

    this.certificationForm = this.mapper();

    this.serviceDataGenerator.editGenerador(id, this.certificationForm).subscribe(
      (data) => {
        console.log('Cliente editado con éxito: ', data);
        this.route.navigateByUrl('/admin/bandeja-certificaciones');

      },
      (error) => {
        console.error('Error al editar el cliente: ', error);
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
    this.guardarCambios();
    this.closeModal();
  }

  mapper(): DataGeneratorRequest{
// MAPEO DEL GENERATOR
    this.certificationForm.botadero_id = this.get_data_generator.botadero.id_botadero;
    this.certificationForm.data_manager_id = this.get_data_generator.data_manager.id_data_manager;
    this.certificationForm.name = this.get_data_generator.name;
    this.certificationForm.type_document_id = this.get_data_generator.type_document.id_type_document;
    this.certificationForm.number_id = this.get_data_generator.number_id;
    this.certificationForm.legal_representative = this.get_data_generator.legal_representative;
    this.certificationForm.address = this.get_data_generator.address;
    this.certificationForm.phone_number = this.get_data_generator.phone_number;
    this.certificationForm.email = this.get_data_generator.email;
    this.certificationForm.address_rcd = this.get_data_generator.address_rcd;
    this.certificationForm.reception_date_rcd = this.get_data_generator.reception_date_rcd;
    this.certificationForm.type_weight = this.get_data_generator.type_weight;
//MAPEO DEL MANAGER
    this.certificationForm.manager.manager_id_1 = this.get_data_generator.manager.manager_id_1;
    this.certificationForm.manager.manager_id_2 = this.get_data_generator.manager.manager_id_2;
    this.certificationForm.manager.manager_id_3 = this.get_data_generator.manager.manager_id_3;

    //MAPEO DE QUANTITIES
    this.certificationForm.quantitiesRcd.quantities.quantity_rcd_1 = this.get_data_generator.quantitiesRcd.quantity_rcd_1;
    this.certificationForm.quantitiesRcd.quantities.quantity_rcd_2 = this.get_data_generator.quantitiesRcd.quantity_rcd_2;
    this.certificationForm.quantitiesRcd.quantities.quantity_rcd_3 = this.get_data_generator.quantitiesRcd.quantity_rcd_3;
    this.certificationForm.quantitiesRcd.quantities.quantity_rcd_4 = this.get_data_generator.quantitiesRcd.quantity_rcd_4;
    this.certificationForm.quantitiesRcd.quantities.quantity_rcd_5 = this.get_data_generator.quantitiesRcd.quantity_rcd_5;
    this.certificationForm.quantitiesRcd.quantities.quantity_rcd_6 = this.get_data_generator.quantitiesRcd.quantity_rcd_6;
    this.certificationForm.quantitiesRcd.quantities.quantity_rcd_7 = this.get_data_generator.quantitiesRcd.quantity_rcd_7;
    this.certificationForm.quantitiesRcd.quantities.quantity_rcd_8 = this.get_data_generator.quantitiesRcd.quantity_rcd_8;
    this.certificationForm.quantitiesRcd.quantities.quantity_rcd_9 = this.get_data_generator.quantitiesRcd.quantity_rcd_9;
    this.certificationForm.quantitiesRcd.total = this.get_data_generator.total_rcd;
    

//MAPEO DE DATA DRIVER    
    this.certificationForm.data_driver.name = this.get_data_generator.data_driver.name;
    this.certificationForm.data_driver.number_id = this.get_data_generator.data_driver.number_id;
    this.certificationForm.data_driver.vehicle_plate = this.get_data_generator.data_driver.vehicle_plate;
    this.certificationForm.data_driver.type_document_id = this.get_data_generator.data_driver.type_document.id_type_document;
    

    return this.certificationForm;
  }

}
