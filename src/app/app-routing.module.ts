import { HomeComponent } from './pages/home/home.component' 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { BotaderoComponent } from './botadero/botadero.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';
import { ReportesComponent } from './reportes/reportes.component';
import { BotaderoFormComponent } from './botadero/botadero-form/botadero-form.component';
import { BotaderoFormEditComponent } from './botadero/botadero-form-edit/botadero-form-edit.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDasboardComponent } from './pages/user/user-dasboard/user-dasboard.component';
import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { CertificadoComponent } from './pages/certificado/certificado.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ListCertificatesComponent } from './pages/list-certificates/list-certificates.component';
import { GetCertificationComponent } from './pages/get-certification/get-certification.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'certification/:id',
    component: GetCertificationComponent,
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
  },
  {
    path:'admin',
    component:DashboardComponent,
    canActivate:[AdminGuard],
    children:[
      {
        path:'',
        component:WelcomeComponent
      },
      {
        path:'certificado',
        component:CertificadoComponent
      },
      { 
        path: 'botadero',
        component: BotaderoComponent
      },
      { 
        path: 'certificaciones',
        component: CertificacionesComponent
      },
      { 
        path: 'reportes',
        component: ReportesComponent
      },
      { 
        path: 'botaderoCreate',
        component: BotaderoFormComponent
      },
      { 
        path: 'botaderoEdit/:id',
        component: BotaderoFormEditComponent
      },
      {
        path: 'bandeja-certificaciones',
        component: ListCertificatesComponent
      }
      
    ]
  },
  {
    path:'user-dashboard',
    component:UserDasboardComponent,
    pathMatch:'full',
    canActivate:[NormalGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
