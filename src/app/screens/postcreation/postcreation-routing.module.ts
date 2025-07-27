import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { CouponCodeFormComponent } from './components/coupon-code-form/coupon-code-form.component';
import { EventsFormComponent } from './components/events-form/events-form.component';
import { PostFormComponent } from './components/post-form/post-form.component';

const routes: Routes = [
  {
    path:'',
    component:CategorySelectorComponent
  },
  { path:'coupon-code', 
    component:CouponCodeFormComponent
  },
  {
    path:'post-form',
    component:PostFormComponent
  },
  {
    path:'events-form',
    component:EventsFormComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostcreationRoutingModule { }
