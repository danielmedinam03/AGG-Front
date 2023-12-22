import { HomeComponent } from './pages/home/home.component' 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { BotaderoComponent } from './botadero/botadero.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';
import { ReportesComponent } from './reportes/reportes.component';
import { BotaderoFormComponent } from './botadero/botadero-form/botadero-form.component';
import { BotaderoFormEditComponent } from './botadero/botadero-form-edit/botadero-form-edit.component';

const routes: Routes = [
  { path: 'botadero', component: BotaderoComponent},
  { path: 'certificaciones', component: CertificacionesComponent},
  { path: 'reportes', component: ReportesComponent},
  { path: 'botaderoCreate', component: BotaderoFormComponent},
  { path: 'botaderoEdit', component: BotaderoFormEditComponent},
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
