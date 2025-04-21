import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessBottomNavbarComponent } from './business-bottom-navbar/business-bottom-navbar.component';
import { BusinessTopNavbarComponent } from './business-top-navbar/business-top-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BusinessHomeComponent } from './business-home.component';
import { BusinessHomeRoutingModule } from './business-home-routing.module';
import { RouterModule } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
declarations: [
BusinessBottomNavbarComponent,
BusinessTopNavbarComponent,
BusinessHomeComponent
],
imports: [
CommonModule,
FontAwesomeModule,
BusinessHomeRoutingModule,
RouterModule,
NgxSkeletonLoaderModule
],
exports: [
BusinessBottomNavbarComponent,
BusinessTopNavbarComponent,
BusinessHomeComponent
]
})
export class BusinessHomeModule { }