import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FeedbackScreenComponent } from "./feedback-screen.component";

const routes: Routes = [
  {
    path: '',
    component: FeedbackScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackScreenRoutingModule { }