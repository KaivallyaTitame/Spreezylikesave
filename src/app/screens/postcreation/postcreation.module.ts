import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostcreationRoutingModule } from './postcreation-routing.module';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { CouponCodeFormComponent } from './components/coupon-code-form/coupon-code-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostFormComponent } from './components/post-form/post-form.component';
import { EventsFormComponent } from './components/events-form/events-form.component';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';


@NgModule({
  declarations: [
    CategorySelectorComponent,
    CouponCodeFormComponent,
    PostFormComponent,
    EventsFormComponent,
    ImageSelectorComponent,
    PopUpComponent
  ],
  imports: [
    CommonModule,
    PostcreationRoutingModule,
    ReactiveFormsModule
  ]
})
export class PostcreationModule { }
