import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { ProfileInfoComponent } from 'src/app/shared/profile-info/profile-info.component';
import { AdFeedModule } from 'src/app/screens/ad-feed/ad-feed.module';

@NgModule({
  declarations: [
    PopUpComponent,
    LoaderComponent,
    ProfileInfoComponent  // Declare here
  ],
  imports: [
    CommonModule,
    AdFeedModule
  ],
  exports: [
    PopUpComponent,
    LoaderComponent,
    ProfileInfoComponent,
    AdFeedModule  // Export it so other modules can use it
  ]
})
export class SharedModule {}
