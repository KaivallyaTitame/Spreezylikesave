import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessBottomNavbarComponent } from './business-bottom-navbar/business-bottom-navbar.component';
import { BusinessTopNavbarComponent } from './business-top-navbar/business-top-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BusinessHomeComponent } from './business-home.component';
import { BusinessHomeRoutingModule } from './business-home-routing.module';

@NgModule({
  declarations: [
    BusinessBottomNavbarComponent,
    BusinessTopNavbarComponent,
    BusinessHomeComponent
  ],
  imports: [
    CommonModule,
    BusinessNavbarRoutingModule,
    FontAwesomeModule,
<<<<<<< HEAD
    RouterModule.forChild(routes) // Register the routes for the business-home module
=======
    BusinessHomeRoutingModule
>>>>>>> bc8790b (Corrected Routes for consumer-home and business-home)
  ],
  exports: [
    BusinessBottomNavbarComponent,
    BusinessTopNavbarComponent,
    BusinessHomeComponent
  ]
})
export class BusinessHomeModule { }