import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileScreenRoutingModule } from './profile-screen-routing.module';
import { ProfileScreenComponent } from './profile-screen.component';
import { BusinessHomeModule } from '../business-home/business-home.module';
import { ConsumerHomeModule } from '../consumer-home/consumer-home.module';

@NgModule({
  declarations: [
    ProfileScreenComponent
  ],
  imports: [
    CommonModule,
    ProfileScreenRoutingModule,
    BusinessHomeModule,
    ConsumerHomeModule
  ],
  exports: [ProfileScreenComponent]
})
export class ProfileScreenModule { }
