import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileScreenRoutingModule } from './profile-screen-routing.module';
import { ProfileScreenComponent } from './profile-screen.component';
import { BusinessHomeModule } from '../business-home/business-home.module';

@NgModule({
  declarations: [
    ProfileScreenComponent
  ],
  imports: [
    CommonModule,
    ProfileScreenRoutingModule
  ],
  exports: [ProfileScreenComponent]
})
export class ProfileScreenModule { }
