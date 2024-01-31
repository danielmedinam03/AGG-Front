import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataGenerator, GetCertificationService, Manager, QuantitiesRcd, TypeRcd } from 'src/app/services/get-certificationServices/get-certification.service';
import { QUANTITY_RCD } from './constants/quantities_rcd';
import { MANAGER } from './constants/manager';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-get-certification',
  templateUrl: './get-certification.component.html',
  styleUrls: ['./get-certification.component.css']

})
export class GetCertificationComponent implements OnInit {

  data_generator= {} as DataGenerator;
  quantities_rcd: QuantitiesRcd[] = QUANTITY_RCD;
  manager: Manager[]=MANAGER;
  fechaActual: string;
  id:any
  
  public ids = this.route.snapshot.paramMap.get('id');

  constructor( private route: ActivatedRoute,
    public getCertificationService :GetCertificationService
    ) {
      const fecha = new Date();
      const anio = fecha.getFullYear();
      const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
      const dia = fecha.getDate().toString().padStart(2, '0');
      this.id= this.route.snapshot.params['id'];
      this.fechaActual = `${dia} días del mes ${mes} del ${anio}`;
     }

    ngOnInit() {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        this.obtenerElementoPorId(id);
      });

    }



    obtenerElementoPorId(id: number): void {
      this.getCertificationService.getById(id).subscribe(
        (elemento) => {
          // Manejar la respuesta del servicio
          this.data_generator = elemento;

          this.quantities_rcd.forEach(itemConst => {
            const matchedQuantity = this.data_generator.quantitiesRcd.find(
              quantity => itemConst.type_rcd.id_type_rcd === quantity.type_rcd.id_type_rcd
            );
          
            if (matchedQuantity) {
              const { quantity_rcd, id_quantities_rcd, data_generator_id } = matchedQuantity;
          
              Object.assign(itemConst, { quantity_rcd, id_quantities_rcd, data_generator_id });
            }
          });

          this.manager.forEach(itemConst =>{

            const matchedManger = this.data_generator.manager.find(
              man => itemConst.id_manager === man.id_manager
            );

            if(matchedManger){
              const{ id_manager, name, status } = matchedManger;
              Object.assign(itemConst,{id_manager, name, status})
            }

          })

          console.log(this.manager);

          console.log('Elemento obtenido:', elemento);
        },
        (error) => {
          // Manejar errores
          console.error('Error al obtener el elemento por ID:', error);
        }
      );
    }


}
