import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD:src/app/screens/home-screen/home-screen.module.ts
import { HomeRoutingModule } from './home-screen-routing.module';
import { HomeScreenComponent } from './home-screen.component';
import { BusinessBottomNavbarComponent } from '../business-home/business-bottom-navbar/business-bottom-navbar.component';
import { BusinessTopNavbarComponent } from '../business-home/business-top-navbar/business-top-navbar.component';
import { RouterModule, Routes } from '@angular/router';
=======
import { AdFeedRoutingModule } from './ad-feed-routing.module';
import { AdFeedComponent } from './ad-feed.component';
>>>>>>> 6a22698 (Renamed Home module to AdFeed module):src/app/screens/ad-feed/ad-feed.module.ts
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