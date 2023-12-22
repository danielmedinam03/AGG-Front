import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BotaderoService } from 'src/app/services/botaderoServices/botadero.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botadero-form',
  templateUrl: './botadero-form.component.html',
  styleUrls: ['./botadero-form.component.css']
})
export class BotaderoFormComponent implements OnInit {

  botaderoForm !: FormGroup;
  botaderos : any;
  showModal = false;


  constructor(
    public fb: FormBuilder,
    public botaderoService: BotaderoService,
    public route: Router
  ) { }

  ngOnInit(): void {
    this.botaderoForm = this.fb.group({
      city: ['', Validators.required],
      property_name: ['', Validators.required],
      user_id: [0, Validators.required],
      status: [true, Validators.required],
    });

  }

  guardar(): void {
    this.botaderoService.saveBotadero(this.botaderoForm.value).subscribe(resp => {
      this.botaderoForm.reset();
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
    this.guardar();
    this.closeModal();
  }
}
