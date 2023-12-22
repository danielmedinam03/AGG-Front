import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BotaderoService } from 'src/app/services/botadero.service';
import { error } from 'console';

@Component({
  selector: 'app-botadero-form-edit',
  templateUrl: './botadero-form-edit.component.html',
  styleUrls: ['./botadero-form-edit.component.css']
})
export class BotaderoFormEditComponent implements OnInit {

  botaderoForm !: FormGroup;
  botaderos : any;
  

  constructor(
    public fb: FormBuilder,
    public botaderoService: BotaderoService

  ) { }

  ngOnInit(): void {
    this.botaderoForm = this.fb.group({
      city: ['', Validators.required],
      property_name: ['', Validators.required],
      user_id: [0, Validators.required],
      status: [true, Validators.required],
    });

  }

  editar(botaderos: { city: any; property_name: any; }){
      this.botaderoForm.setValue({
        city: botaderos.city,
        property_name: botaderos.property_name
      })
    }
  

}

