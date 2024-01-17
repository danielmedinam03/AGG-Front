import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule} from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { BotaderoComponent } from './botadero/botadero.component';
import { CertificacionesComponent } from './certificaciones/certificaciones.component';
import { ReportesComponent } from './reportes/reportes.component';
import { BotaderoFormComponent } from './botadero/botadero-form/botadero-form.component';
import { BotaderoFormEditComponent } from './botadero/botadero-form-edit/botadero-form-edit.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {NgxPaginationModule} from 'ngx-pagination';
import { CustomModalComponent } from './botadero/custom-modal/custom-modal.component';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDasboardComponent } from './pages/user/user-dasboard/user-dasboard.component';
import { CertificadoComponent } from './pages/certificado/certificado.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ListCertificatesComponent } from './pages/list-certificates/list-certificates.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    BotaderoComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    CertificacionesComponent,
    ReportesComponent,
    BotaderoFormComponent,
    BotaderoFormEditComponent,
    CustomModalComponent,
    DashboardComponent,
    UserDasboardComponent,
    CertificadoComponent,
    WelcomeComponent,
    ListCertificatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    NgxPaginationModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
