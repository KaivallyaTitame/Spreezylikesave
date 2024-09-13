import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessNavbarRoutingModule } from './business-navbar-routing.module';
import { BusinessNavbarComponent } from './business-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { BusinessTopNavbarComponent } from 'src/app/components/business-top-navbar/business-top-navbar.component';
// import { BusinessBottomNavbarComponent } from 'src/app/components/business-bottom-navbar/business-bottom-navbar.component';
// import { ShreableModule } from 'src/app/shreable/shreable.module';
// import { ComponentsModule } from 'src/app/components/components.module';
import { BusinessModuleModule } from 'src/app/business-module/business-module.module';



@NgModule({
  declarations: [
    BusinessNavbarComponent,
    // BusinessTopNavbarComponent,
    // BusinessBottomNavbarComponent
  ],
  imports: [
    CommonModule,
    BusinessNavbarRoutingModule,
    FontAwesomeModule,
    // ShreableModule,
    BusinessModuleModule
  ]
})
export class BusinessNavbarModule { }
