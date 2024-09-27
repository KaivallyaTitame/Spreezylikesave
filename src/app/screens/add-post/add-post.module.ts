import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPostRoutingModule } from './add-post-routing.module';
import { AddPostComponent } from './add-post.component';
import { BusinessHomeModule } from '../business-home/business-home.module';


@NgModule({
  declarations: [
    AddPostComponent
  ],
  imports: [
    CommonModule,
    AddPostRoutingModule
  ],
  exports: [AddPostComponent]
})
export class AddPostModule { }
