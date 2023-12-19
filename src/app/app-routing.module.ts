import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotaderoComponent } from './botadero/botadero.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
  { path: 'botadero', component: BotaderoComponent},
  { path: 'certificaciones', component: CertificacionesComponent},
  { path: 'reportes', component: ReportesComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
