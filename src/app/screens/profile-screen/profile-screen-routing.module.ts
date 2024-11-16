import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileScreenComponent } from './profile-screen.component';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { ConsumerProfileComponent } from './consumer-profile/consumer-profile.component';


const routes: Routes = [
  {
    path: 'business-profile/:username',
    component: BusinessProfileComponent
  },
  {
    path: 'consumer-profile/:username',
    component: ConsumerProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileScreenRoutingModule { }
