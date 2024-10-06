import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPostRoutingModule } from './add-post-routing.module';
import { AddPostComponent } from './add-post.component';
import { BusinessHomeModule } from '../business-home/business-home.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AddPostComponent }
];

@NgModule({
  declarations: [
    AddPostComponent
  ],
  imports: [
    CommonModule,
    AddPostRoutingModule,
    BusinessHomeModule,
    RouterModule.forChild(routes)
  ],
  exports: [AddPostComponent]
})
export class AddPostModule { }
