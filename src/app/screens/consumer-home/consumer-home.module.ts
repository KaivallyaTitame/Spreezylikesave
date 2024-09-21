import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerTopNavbarComponent } from './consumer-top-navbar/consumer-top-navbar.component';
import { ConsumerBottomNavbarComponent } from './consumer-bottom-navbar/consumer-bottom-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerNavbarRoutingModule } from './consumer-home-routing.module';
import { SearchModule } from '../search/search.module';
import { HomeModule } from '../home-screen/home-screen.module';
import { NotificationScreenModule } from '../notification-screen/notification-screen.module';
import { ProfileScreenModule } from '../profile-screen/profile-screen.module';

const routes: Routes = [
  { path: '', component: ConsumerBottomNavbarComponent },
  { path: 'top', component: ConsumerTopNavbarComponent }
];

@NgModule({
  declarations: [
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),
    SearchModule,
    HomeModule,
    NotificationScreenModule,
    ProfileScreenModule
  ],
  exports: [
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent,
  ]
})
export class ConsumerHomeModule { }
