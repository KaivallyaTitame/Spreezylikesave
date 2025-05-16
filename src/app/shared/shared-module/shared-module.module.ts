import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { ProfileInfoComponent } from 'src/app/shared/profile-info/profile-info.component';
import { ProfileSkeletonComponent } from '../profile-skeleton/profile-skeleton.component';
import { OfferDescriptionComponent } from '../offer-description/offer-description.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    PopUpComponent,
    LoaderComponent,
    ProfileInfoComponent,
    ProfileSkeletonComponent,
    OfferDescriptionComponent,
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    PopUpComponent,
    LoaderComponent,
    ProfileInfoComponent,
    ProfileSkeletonComponent,
    OfferDescriptionComponent
  ]
})
export class SharedModule {}
