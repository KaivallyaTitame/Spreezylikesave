import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdFeedRoutingModule } from './ad-feed-routing.module';
import { AdFeedComponent } from './ad-feed.component';
import { BusinessHomeModule } from '../business-home/business-home.module';
import { ConsumerHomeModule } from '../consumer-home/consumer-home.module';



@NgModule({
  declarations: [
    AdFeedComponent,
  ],
  imports: [
    CommonModule,
    AdFeedRoutingModule,
    BusinessHomeModule,
    ConsumerHomeModule
  ],
  exports: [
    AdFeedComponent,
  ],
})
export class AdFeedModule { }