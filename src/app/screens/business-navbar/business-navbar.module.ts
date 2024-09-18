import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessBottomNavbarComponent } from './business-bottom-navbar/business-bottom-navbar.component';
import { BusinessTopNavbarComponent } from './business-top-navbar/business-top-navbar.component';
import { HomeComponent } from './home/home.component';
import { InsightsComponent } from './insights/insights.component';
import { NotificationComponent } from './notification/notification.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BusinessNavbarRoutingModule } from './business-navbar-routing.module';

@NgModule({
  declarations: [
    BusinessBottomNavbarComponent,
    BusinessTopNavbarComponent,
    HomeComponent,
    InsightsComponent,
    NotificationComponent,
    PostComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    BusinessNavbarRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    BusinessBottomNavbarComponent,
    BusinessTopNavbarComponent
  ]
})
export class BusinessNavbarModule { }
