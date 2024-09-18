import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerBottomNavbarComponent } from './consumer-bottom-navbar/consumer-bottom-navbar.component';
import { ConsumerTopNavbarComponent } from './consumer-top-navbar/consumer-top-navbar.component';


const routes: Routes = [
  { path: 'bottom', component: ConsumerBottomNavbarComponent },
  { path: 'top', component: ConsumerTopNavbarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerNavbarRoutingModule { }
