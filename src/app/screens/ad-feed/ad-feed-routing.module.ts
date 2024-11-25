import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdFeedComponent } from './ad-feed.component';
// import { OfferDescriptionComponent } from './offer-description/offer-description.component'; // Import the component for the new route


const routes: Routes = [
  { path: '', component: AdFeedComponent }, // Default route for AdFeed
  // { path: 'offer-description', component: OfferDescriptionComponent }
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdFeedRoutingModule { }
