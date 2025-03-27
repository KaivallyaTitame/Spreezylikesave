import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdFeedComponent } from './ad-feed.component';
import { OfferDescriptionComponent } from './offer-description/offer-description.component';

const routes: Routes = [
  { path: '', component: AdFeedComponent }, // Default route for AdFeed
  { path: 'offer-description/:id', component: OfferDescriptionComponent }, 
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdFeedRoutingModule { }
