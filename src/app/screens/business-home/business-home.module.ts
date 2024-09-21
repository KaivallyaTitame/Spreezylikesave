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
  { path: '', component: BusinessBottomNavbarComponent },
  { path: 'top', component: BusinessTopNavbarComponent,
  children: [
    { path: 'home', loadChildren: () => import('../home-screen/home-screen.component').then(m => m.HomeScreenComponent) },
    { path: 'insights', loadChildren: () => import('../insights/insights.module').then(m => m.BusinessInsightsModule) },
    { path: 'notifications', loadChildren: () => import('../notification-screen/notification-screen.module').then(m => m.NotificationScreenModule) },
    { path: 'add-post', loadChildren: () => import('../add-post/add-post.module').then(m => m.AddPostModule) },
    { path: 'profile', loadChildren: () => import('../profile-screen/profile-screen.module').then(m => m.ProfileScreenModule) }
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
