import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessBottomNavbarComponent } from './business-bottom-navbar/business-bottom-navbar.component';
import { BusinessTopNavbarComponent } from './business-top-navbar/business-top-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BusinessInsightsModule } from '../insights/insights.module';
import { BusinessNavbarRoutingModule } from './business-home-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from '../home-screen/home-screen.module';
import { NotificationScreenModule } from '../notification-screen/notification-screen.module';
import { AddPostModule } from '../add-post/add-post.module';
import { ProfileScreenModule } from '../profile-screen/profile-screen.module';
import { BusinessHomeComponent } from './business-home.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessHomeComponent, 
    children: [
      { path: 'home', component: HomeScreenComponent },
      { path: 'insights', component: BusinessInsightsComponent },
      { path: 'notifications', component: NotificationScreenComponent },
      { path: 'add-post', component: AddPostComponent },
      { path: 'profile', component: ProfileScreenComponent }
    ]
  }
];

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
    HomeModule,
    BusinessInsightsModule,
    NotificationScreenModule,
    AddPostModule,
    ProfileScreenModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    BusinessBottomNavbarComponent,
    BusinessTopNavbarComponent,
  ]
})
export class BusinessHomeModule { }
