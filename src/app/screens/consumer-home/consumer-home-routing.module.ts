import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from '../home-screen/home-screen.component';
import { NotificationScreenComponent } from '../notification-screen/notification-screen.component';
import { SearchComponent } from '../search/search.component';
import { ProfileScreenComponent } from '../profile-screen/profile-screen.component';

const routes: Routes = [
  { 
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  }, 
  { path: 'home', component: HomeScreenComponent },
  { path: 'notification', component: NotificationScreenComponent },
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: ProfileScreenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerNavbarRoutingModule { }
