import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdFeedRoutingModule } from './ad-feed-routing.module';
import { AdFeedComponent } from './ad-feed.component';

// import { OfferDescriptionComponent } from './offer-description/offer-description.component';
import { EventComponent } from './Event/Event.component';
import { PostComponent } from './Post/Post.component';
import { CouponComponent } from './Coupon/Coupon.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

@NgModule({
  declarations: [
    AdFeedComponent,
    // OfferDescriptionComponent,
    EventComponent,
    PostComponent,
    CouponComponent

    
  
   
  ],
  imports: [
    CommonModule,
    AdFeedRoutingModule,
    FontAwesomeModule,
  SharedModule
  ]
})
export class AdFeedModule { }