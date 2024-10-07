import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerHomeComponent } from './consumer-home.component';

const routes: Routes = [
  { 
<<<<<<< HEAD
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
  { path: 'search', component: SearchComponent },
  { path: 'profile', component: ProfileScreenComponent },
>>>>>>> 1c8e8a1 (improved folder and file structure, edited names of consumer and business navigation bars)
=======
    path: '', 
    component: ConsumerHomeComponent,
    children: [
      { path: 'adfeed', loadChildren: () => import('../ad-feed/ad-feed.module').then(m => m.AdFeedModule) },
      { path: 'search', loadChildren: () => import('../search/search.module').then(m => m.SearchModule) },
      { path: 'notification', loadChildren: () => import('../notification-screen/notification-screen.module').then(m => m.NotificationScreenModule) },
      { path: 'profile', loadChildren: () => import('../profile-screen/profile-screen.module').then(m => m.ProfileScreenModule) },
      { path: '', redirectTo: 'consumer-home/adfeed', pathMatch: 'full' } 
    ]
  }
>>>>>>> 9200722 (Corrected Routes for consumer-home and business-home)
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerHomeRoutingModule {}