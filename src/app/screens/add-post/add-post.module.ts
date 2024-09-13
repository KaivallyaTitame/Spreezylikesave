import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPostRoutingModule } from './add-post-routing.module';
import { AddPostComponent } from './add-post.component';
// import { ComponentsModule } from 'src/app/components/components.module';
import { BusinessModuleModule } from "src/app/business-module/business-module.module";


@NgModule({
  declarations: [
    AddPostComponent
  ],
  imports: [
    CommonModule,
    AddPostRoutingModule,
    BusinessModuleModule
  ]
})
export class AddPostModule { }
