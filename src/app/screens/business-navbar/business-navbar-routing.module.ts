import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessNavbarComponent } from './business-navbar.component';

const routes: Routes = [
  {
    path: "",
    component: BusinessNavbarComponent,
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessNavbarRoutingModule { }
