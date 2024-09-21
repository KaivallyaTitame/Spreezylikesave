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
<<<<<<< HEAD
    path: '', 
    component: ConsumerHomeComponent,
    children: [
      { path: 'adfeed', loadChildren: () => import('../ad-feed/ad-feed.module').then(m => m.AdFeedModule) },
      { path: 'search', loadChildren: () => import('../search/search.module').then(m => m.SearchModule) },
      { path: 'notification', loadChildren: () => import('../notification-screen/notification-screen.module').then(m => m.NotificationScreenModule) },
      { path: 'profile', loadChildren: () => import('../profile-screen/profile-screen.module').then(m => m.ProfileScreenModule) },
      { path: 'settings',loadChildren: () => import('../settings/settings.module').then(m =>m.SettingsModule)},
      { path: '', redirectTo: 'consumer-home/adfeed', pathMatch: 'full' } 
    ]
  }
=======
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  }, 
  { path: 'home', component: HomeScreenComponent },
  { path: 'notification', component: NotificationScreenComponent },
  { path: 'post', component: AddPostComponent },
  { path: 'profile', component: ProfileScreenComponent },
>>>>>>> 1c8e8a1 (improved folder and file structure, edited names of consumer and business navigation bars)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerNavbarRoutingModule { }
