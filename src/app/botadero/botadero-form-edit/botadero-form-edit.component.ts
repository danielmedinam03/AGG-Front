import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BotaderoService } from 'src/app/services/botaderoServices/botadero.service';
import { error } from 'console';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-botadero-form-edit',
  templateUrl: './botadero-form-edit.component.html',
  styleUrls: ['./botadero-form-edit.component.css']
})
export class BotaderoFormEditComponent implements OnInit {

  botaderoForm !: FormGroup;
  botaderos : any;
  id:any;
  showModal = false;

  constructor(
    public route: Router,
    public fb: FormBuilder,
    public botaderoService: BotaderoService,
    private activateRouter: ActivatedRoute,
  ) { 

    this.id= this.activateRouter.snapshot.params['id'];
    this.botaderoService.getByIdBotadero(this.id).subscribe(resp => {
      this.botaderos = resp;
    },
    error => {console.error(error)});
  }
  ngOnInit(): void {
    this.botaderoForm = this.fb.group({
      city: ['', Validators.required],
      property_name: ['', Validators.required],
      user_id: [0, Validators.required],
      status: [true, Validators.required],
    });

  }

  editar(){
    this.botaderoService.editBotadero(this.botaderos).subscribe(resp =>{
      this.route.navigateByUrl('botadero');
    },
    error => { console.error(error); }
    )
  }
  
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveChanges() {
    this.editar();
    this.closeModal();
  }


}

