import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';
import { AdFeedModule } from '../ad-feed/ad-feed.module';
import { BusinessHomeModule } from '../business-home/business-home.module';
import { ConsumerHomeModule } from '../consumer-home/consumer-home.module';
import { BusinessProfileComponent } from './business-profile/business-profile.component';
import { ConsumerProfileComponent } from './consumer-profile/consumer-profile.component';
import { PostInsightsComponent } from './post-insights/post-insights.component';
import { ProfileScreenRoutingModule } from './profile-screen-routing.module';
@NgModule({
  declarations: [
    BusinessProfileComponent,
    ConsumerProfileComponent, 
    PostInsightsComponent
  ],
  imports: [
    CommonModule,
    ProfileScreenRoutingModule,
    BusinessHomeModule,
    ConsumerHomeModule,
    FontAwesomeModule,
    SharedModule,
    AdFeedModule
  ],
  exports: [BusinessProfileComponent, ConsumerProfileComponent,PostInsightsComponent]
})
export class ProfileScreenModule { }
