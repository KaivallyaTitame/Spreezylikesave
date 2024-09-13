import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostComponent } from './post/post.component';
import { InsightsComponent } from './insights/insights.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { BusinessTopNavbarComponent } from './business-top-navbar/business-top-navbar.component';
import { BusinessBottomNavbarComponent } from './business-bottom-navbar/business-bottom-navbar.component';



@NgModule({
  declarations: [
    BusinessTopNavbarComponent,
    BusinessBottomNavbarComponent,
    NotificationComponent,
    PostComponent,
    InsightsComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    BusinessTopNavbarComponent,
    BusinessBottomNavbarComponent,
    NotificationComponent,
    PostComponent,
    InsightsComponent,
    ProfileComponent,
    HomeComponent
  ]
})
export class BusinessModuleModule { }
