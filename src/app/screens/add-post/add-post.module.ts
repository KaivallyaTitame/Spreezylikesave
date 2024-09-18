import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPostRoutingModule } from './add-post-routing.module';
import { AddPostComponent } from './add-post.component';
import { ConsumerNavbarModule } from '../consumer-navbar/consumer-navbar.module';
import { BusinessNavbarModule } from '../business-navbar/business-navbar.module';


@NgModule({
  declarations: [
    AddPostComponent
  ],
  imports: [
    CommonModule,
    AddPostRoutingModule,
    BusinessNavbarModule,
    ConsumerNavbarModule
  ]
})
export class AddPostModule { }
