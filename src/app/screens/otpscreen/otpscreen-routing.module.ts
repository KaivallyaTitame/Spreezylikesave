import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpscreenComponent } from './otpscreen.component';

const routes: Routes = [
  {
    path: "",
    component: OtpscreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtpscreenRoutingModule { }
