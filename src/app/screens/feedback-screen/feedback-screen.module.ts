import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackScreenRoutingModule } from './feedback-screen-routing.module';
import { FeedbackScreenComponent } from './feedback-screen.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component'; // Import the PopUpComponent directly
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

@NgModule({
  declarations: [FeedbackScreenComponent], // Declare both FeedbackScreenComponent and PopUpComponent
  imports: [
    CommonModule,
    FeedbackScreenRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class FeedbackScreenModule {}
