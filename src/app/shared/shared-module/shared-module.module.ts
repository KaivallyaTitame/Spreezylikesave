import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpComponent } from 'src/app/components/pop-up/pop-up.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { ProfileInfoComponent } from 'src/app/shared/profile-info/profile-info.component';
import { ProfileSkeletonComponent } from '../profile-skeleton/profile-skeleton.component';

@NgModule({
declarations: [
PopUpComponent,
LoaderComponent,
ProfileInfoComponent,
ProfileSkeletonComponent
],
imports: [
CommonModule,
],
exports: [
PopUpComponent,
LoaderComponent,
ProfileInfoComponent,
ProfileSkeletonComponent
]
})
export class SharedModule {}