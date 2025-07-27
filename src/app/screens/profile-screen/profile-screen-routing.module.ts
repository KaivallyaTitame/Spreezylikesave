import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { ConsumerProfileComponent } from './consumer-profile/consumer-profile.component';
import { OfferDescriptionComponent } from 'src/app/shared/offer-description/offer-description.component';


const routes: Routes = [
  {
    path: 'business-profile/:username',
    component: BusinessProfileComponent
  },
  {
    path: 'consumer-profile/:username',
    component: ConsumerProfileComponent
  },
  { 
    path: 'business-profile/:username/offer-description/:id', 
    component: OfferDescriptionComponent 
  },
  { 
    path: 'consumer-profile/:username/offer-description/:id', 
    component: OfferDescriptionComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileScreenRoutingModule { }
