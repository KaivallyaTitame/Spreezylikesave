import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';



@NgModule({
  declarations: [PopUpComponent, LoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [PopUpComponent , LoaderComponent]
})
export class SharedModuleModule { }
