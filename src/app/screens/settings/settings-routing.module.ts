import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSettingsComponent } from './components/main-settings/main-settings.component';
import { PasswordManagementComponent } from './components/password-management/password-management.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { BusinessInformationComponent } from './components/business-information/business-information.component';


const routes: Routes = [
  { 
    path: '',
    component:MainSettingsComponent 
  },
  { 
    path: 'user-information', 
    component:UserInformationComponent
  },
  { 
    path: 'password-management', 
    component:PasswordManagementComponent 
  },
  {
    path: 'business-information',
    component:BusinessInformationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
