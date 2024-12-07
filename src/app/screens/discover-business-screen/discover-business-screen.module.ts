import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DiscoverBusinessScreenRoutingModule } from './discover-business-screen-routing.module';
import { DiscoverBusinessScreenComponent } from './discover-business-screen.component';
import { SharedModule } from 'src/app/shared/shared-module/shared-module.module';

@NgModule({
  declarations: [
    DiscoverBusinessScreenComponent
  ],
  imports: [
    CommonModule,
    DiscoverBusinessScreenRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  exports: [ DiscoverBusinessScreenComponent]
})
export class DiscoverBusinessScreenModule {}