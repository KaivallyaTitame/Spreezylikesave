import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsumerHomeComponent } from './consumer-home.component';

const routes: Routes = [
  { 
    path: '', 
    component: ConsumerHomeComponent,
    children: [
      { path: 'home', loadChildren: () => import('../home-screen/home-screen.module').then(m => m.HomeModule) },
      { path: 'search', loadChildren: () => import('../search/search.module').then(m => m.SearchModule) },
      { path: 'notification', loadChildren: () => import('../notification-screen/notification-screen.module').then(m => m.NotificationScreenModule) },
      { path: 'profile', loadChildren: () => import('../profile-screen/profile-screen.module').then(m => m.ProfileScreenModule) },
      { path: '', redirectTo: 'consumer-home/home', pathMatch: 'full' } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerHomeRoutingModule {}