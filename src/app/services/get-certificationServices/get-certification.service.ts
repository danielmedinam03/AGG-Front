import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetCertificationService {
  private API_SERVER = environment.API_SERVER + '/generator';

  private data_generator!:DataGenerator;

  constructor(private httpClient: HttpClient) {   }
  
  getById(id: number): Observable<DataGenerator | undefined> {
    const url = `${this.API_SERVER}/${id}`;
    return this.httpClient.get<DataGenerator>(url);
  }
}

export interface DataGenerator{
  id_data_generator:number;
  unic_number:string;
  name:string;
  number_id:string;
  legal_representative:string;
  address:string;
  phone_number:number;
  email:string;
  address_rcd:string;
  reception_date_rcd:string;
  total_rcd:number;

  botadero: Botadero;

  data_manager:DataManager;

  manager: Manager[];

  type_document:TypeDocument;

  quantitiesRcd: QuantitiesRcd[];

  data_driver: DataDriver;

}

export interface Botadero{
  id_botadero: number;
  city: string;
  property_name: string;
  create_date: string;
  user_id: number,
  status: boolean;
}

export interface DataManager{
  id_data_manager:number;
  unic_number:string;
  name:string;
  type_document:TypeDocument;
  number_id:string;
  legal_representative:string;
  address:string;
  phone_number:number;
  email:string;
}

export interface TypeDocument{
  id_type_document: number;
  name: string;
  description: string;
  status: boolean;
}

export interface Manager{
  id_manager:number;
  name:string;
  status:boolean;
}

export interface QuantitiesRcd{
  id_quantities_rcd:number;
  data_generator_id:number;
  quantity_rcd:number;

  type_rcd:TypeRcd;
}

export interface TypeRcd{
  id_type_rcd:number;
  name:string;
  description:string;
  status:boolean;
}

export interface DataDriver{
  id_data_driver:number;
  data_generator_id:number;
  name:string;
  number_id:number;
  vehicle_plate:string;

  type_document:TypeDocument;
}