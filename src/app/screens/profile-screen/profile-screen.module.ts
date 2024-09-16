import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileScreenRoutingModule } from './profile-screen-routing.module';
import { ProfileScreenComponent } from './profile-screen.component';
// import { ComponentsModule } from 'src/app/components/components.module';
import { BusinessModuleModule } from "src/app/business-module/business-module.module";


@NgModule({
  declarations: [
    ProfileScreenComponent
  ],
  imports: [
    CommonModule,
    ProfileScreenRoutingModule,
    BusinessModuleModule
  ]
})
export class ProfileScreenModule { }
