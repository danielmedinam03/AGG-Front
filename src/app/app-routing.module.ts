import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotaderoComponent } from './botadero/botadero.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: 'sidebar', 
    component: SidebarComponent,
    children:[
      { path: 'botadero', component: BotaderoComponent}
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
