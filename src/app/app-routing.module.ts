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
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDasboardComponent } from './pages/user/user-dasboard/user-dasboard.component';
import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { CertificadoComponent } from './pages/certificado/certificado.component';
import { ListCertificatesComponent } from './pages/list-certificates/list-certificates.component';

const routes: Routes = [
  { path: 'botadero', component: BotaderoComponent},
  { path: 'certificaciones', component: CertificacionesComponent},
  { path: 'reportes', component: ReportesComponent},
  { path: 'botaderoCreate', component: BotaderoFormComponent},
  { path: 'botaderoEdit/:id', component: BotaderoFormEditComponent},
  { path: 'certificado', component: CertificadoComponent},
  { path: 'bandeja-certificaciones', component: ListCertificatesComponent},
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
  },
  {
    path:'admin',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
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
