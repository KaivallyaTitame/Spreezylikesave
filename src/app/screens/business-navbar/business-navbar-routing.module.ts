import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InsightsComponent } from './insights/insights.component';
import { NotificationComponent } from './notification/notification.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  { path: 'home', component: HomeComponent },
  { path: 'insights', component: InsightsComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'post', component: PostComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessNavbarRoutingModule { }
