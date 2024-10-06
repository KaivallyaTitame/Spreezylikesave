import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessHomeComponent } from './business-home.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessHomeComponent,
    children: [
      { path: 'home', loadChildren: () => import('../home-screen/home-screen.module').then(m => m.HomeModule) },
      { path: 'insights', loadChildren: () => import('../insights/insights.module').then(m => m.BusinessInsightsModule) },
      { path: 'addpost',  loadChildren: () => import('../add-post/add-post.module').then(m => m.AddPostModule) },
      { path: 'notification', loadChildren: () => import('../notification-screen/notification-screen.module').then(m => m.NotificationScreenModule) },
      { path: 'profile', loadChildren: () => import('../profile-screen/profile-screen.module').then(m => m.ProfileScreenModule) },
      { path: 'search', loadChildren: () => import('../search/search.module').then(m => m.SearchModule) },
      { path: '', redirectTo: 'business-home/home', pathMatch: 'full' } 
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessHomeRoutingModule { }
