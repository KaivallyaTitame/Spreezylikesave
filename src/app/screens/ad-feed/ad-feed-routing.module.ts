import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdFeedComponent } from './ad-feed.component';
import { OfferDescriptionComponent } from 'src/app/shared/offer-description/offer-description.component';

const routes: Routes = [
  { path: '', component: AdFeedComponent }, 
  { path: 'offer-description/:id', component: OfferDescriptionComponent }, 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdFeedRoutingModule { }
