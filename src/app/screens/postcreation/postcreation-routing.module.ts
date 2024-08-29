import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { CouponCodeFormComponent } from './components/coupon-code-form/coupon-code-form.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { EventsFormComponent } from './components/events-form/events-form.component';

const routes: Routes = [
  {
    path:'',
    component:CategorySelectorComponent
  },
  { path:'coupon-code', 
    component:CouponCodeFormComponent
  },
  {
    path:'post',
    component:PostFormComponent
  },
  {
    path:'events',
    component:EventsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostcreationRoutingModule { }
