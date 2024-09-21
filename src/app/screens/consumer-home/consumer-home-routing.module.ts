import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from '../home-screen/home-screen.component';
import { NotificationScreenComponent } from '../notification-screen/notification-screen.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { ProfileScreenComponent } from '../profile-screen/profile-screen.component';
import { ConsumerBottomNavbarComponent } from './consumer-bottom-navbar/consumer-bottom-navbar.component';
import { ConsumerTopNavbarComponent } from './consumer-top-navbar/consumer-top-navbar.component';


const routes: Routes = [
  { 
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  }, 
  { path: 'home', component: HomeScreenComponent },
  { path: 'notification', component: NotificationScreenComponent },
  { path: 'post', component: AddPostComponent },
  { path: 'profile', component: ProfileScreenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerNavbarRoutingModule { }
