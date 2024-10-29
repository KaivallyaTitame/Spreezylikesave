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
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    AdFeedModule
  ],
  exports: [
    PopUpComponent,
    LoaderComponent,
    ProfileInfoComponent,
    AdFeedModule
  ]
})
export class SharedModule {}
