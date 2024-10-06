import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverBusinessScreenComponent } from './discover-business-screen.component';

const routes: Routes = [{ path: '', component: DiscoverBusinessScreenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoverBusinessScreenRoutingModule { }
