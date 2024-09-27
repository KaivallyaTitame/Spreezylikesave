import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerTopNavbarComponent } from './consumer-top-navbar/consumer-top-navbar.component';
import { ConsumerBottomNavbarComponent } from './consumer-bottom-navbar/consumer-bottom-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from '../home-screen/home-screen.component';
import { SearchComponent } from '../search/search.component';
import { NotificationScreenComponent } from '../notification-screen/notification-screen.component';
import { ProfileScreenComponent } from '../profile-screen/profile-screen.component';
import { ConsumerHomeComponent } from './consumer-home.component';


const routes: Routes = [
  { 
    path: '', 
    component: ConsumerHomeComponent,
    children: [
      { path: 'home', component: HomeScreenComponent },
      { path: 'search', component: SearchComponent },
      { path: 'notifications', component: NotificationScreenComponent },
      { path: 'profile', component: ProfileScreenComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent,
    ConsumerHomeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild(routes),

],
  exports: [
    ConsumerTopNavbarComponent,
    ConsumerBottomNavbarComponent,
  ]
})
export class ConsumerHomeModule { }
