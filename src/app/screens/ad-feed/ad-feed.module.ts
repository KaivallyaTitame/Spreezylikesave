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
import { SkeletonComponent } from 'src/app/screens/ad-feed/skeleton/skeleton.component';
import { OfferDescriptionComponent } from './offer-description/offer-description.component';

@NgModule({
  declarations: [
    AdFeedComponent,
    EventComponent,
    PostComponent,
    CouponComponent,
    SkeletonComponent,
    OfferDescriptionComponent
  ],
  imports: [
    CommonModule,
    AdFeedRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [
    AdFeedComponent,
    EventComponent,
    PostComponent,
    CouponComponent,
    SkeletonComponent
  ]
})
export class AdFeedModule { }