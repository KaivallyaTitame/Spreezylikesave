import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackScreenRoutingModule } from './feedback-screen-routing.module';
import { FeedbackScreenComponent } from './feedback-screen.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component'; 
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';
import { BusinessHomeModule } from '../business-home/business-home.module';
import { ConsumerHomeModule } from '../consumer-home/consumer-home.module';

const routes: Routes = [
  { path: '', component: FeedbackScreenComponent }
];

@NgModule({
  declarations: [
    FeedbackScreenComponent
  ], 
  imports: [
    CommonModule,
    FeedbackScreenRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    BusinessHomeModule,
    ConsumerHomeModule,
    RouterModule.forChild(routes)
  ],
})
export class FeedbackScreenModule {}