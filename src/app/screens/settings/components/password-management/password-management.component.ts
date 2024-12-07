import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordManagement } from 'src/app/models/password-management';

@Component({
  selector: 'app-password-management',
  templateUrl: './password-management.component.html',
  styleUrls: ['./password-management.component.css']
})
export class PasswordManagementComponent {
  passwordInfo: FormGroup;
  passwordData:PasswordManagement=new PasswordManagement();
  showPopUp: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.passwordInfo = this.fb.group({
      currentPassword: [''],
      newPassword: [''],
      confirmPassword: ['']
    });
  }

  handleSubmit() {
    if (this.passwordInfo.valid) {
      this.createRequest(this.passwordInfo);
      this.passwordInfo.reset();
    }else {
      this.popUpTitle = 'Error!';
      this.popUpBody = 'Please fill out details correctly';
      this.showPopUp = true;
    }
  }

  createRequest(details:FormGroup){
    this.passwordData.currentPassword=details.value['currentPassword'];
    this.passwordData.newPassword=details.value['newPassword'];
    this.passwordData.confirmPassword=details.value['confirmPassword'];

    this.processRequest(this.passwordData);
  }

  processRequest(passwordData:PasswordManagement){
    console.log(passwordData);
    this.popUpTitle = 'Success!';
    this.popUpBody = 'Password changed sucessfully';
    this.showPopUp = true;
  }

  onPopUpClose() {
    this.showPopUp = false; 
  }

  resetForm(): void {
    this.passwordInfo.reset();
  }

  handleClick():void{
    this.router.navigate(['/settings']);
  }
}
