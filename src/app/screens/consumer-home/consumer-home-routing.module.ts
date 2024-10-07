import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerHomeComponent } from './consumer-home.component';

const routes: Routes = [
  { 
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerHomeRoutingModule {}