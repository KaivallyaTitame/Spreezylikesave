import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertPopupComponent } from '../components/alert-popup/alert-popup.component';
import { ConsumerTopNavbarComponent } from '../components/consumer-top-navbar/consumer-top-navbar.component';
import { ConsumerBottomNavbarComponent } from '../components/consumer-bottom-navbar/consumer-bottom-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostComponent } from './post/post.component';
import { InsightsComponent } from './insights/insights.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    AlertPopupComponent,
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
    FontAwesomeModule
  ],
  exports: [
    AlertPopupComponent,
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent,
    NotificationComponent,
    PostComponent,
    InsightsComponent,
    ProfileComponent,
    HomeComponent,
  ]
})
export class ComponentsModule { }
