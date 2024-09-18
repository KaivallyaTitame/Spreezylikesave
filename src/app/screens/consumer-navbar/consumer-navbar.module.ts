import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerTopNavbarComponent } from './consumer-top-navbar/consumer-top-navbar.component';
import { ConsumerBottomNavbarComponent } from './consumer-bottom-navbar/consumer-bottom-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostComponent } from './post/post.component';
import { InsightsComponent } from './insights/insights.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { RouterModule } from '@angular/router';
import { ConsumerNavbarRoutingModule } from './consumer-navbar-routing.module';


@NgModule({
  declarations: [
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent,
    NotificationComponent,
    PostComponent,
    InsightsComponent,
    ProfileComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    ConsumerNavbarRoutingModule
  ],
  exports: [
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent,
    NotificationComponent,
    PostComponent,
    InsightsComponent,
    ProfileComponent,
    HomeComponent,
  ]
})
export class ConsumerNavbarModule { }
