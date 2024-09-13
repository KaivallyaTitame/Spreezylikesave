import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerNavbarComponent } from './consumer-navbar.component';

const routes: Routes = [
  {
    path: "",
    component: ConsumerNavbarComponent
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerNavbarRoutingModule { }
