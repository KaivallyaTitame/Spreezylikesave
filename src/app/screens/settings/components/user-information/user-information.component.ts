import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInformation } from 'src/app/models/user-information';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})

export class UserInformationComponent {
  profileInformation: FormGroup;
  profileInformationData:UserInformation=new UserInformation();
  showPopUp: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';
  username: string='';
  tempUsername:string='john_doe01';
  loading: boolean = true;
  imageFileName: string = '';

  constructor(private fb: FormBuilder, private router: Router,private settingsService: SettingsService,private jwtDecoder: JwtDecoderService) {
    this.profileInformation = this.fb.group({
      name: [''], 
      username:[''],
      emailID:[''],
      contactNumber:[''],
      gender:[''],
    });
  }

  handleSubmit() {
    if (this.profileInformation.valid) {
      this.createRequest(this.profileInformation);
      this.profileInformation.reset();
    }else {
      this.popUpTitle = 'Error!';
      this.popUpBody = 'Please fill out form correctly';
      this.showPopUp = true;
    }
  }

  ngOnInit():void{
    const token = localStorage.getItem('token');

    const decodedInfo = token ? this.jwtDecoder.decodeInfoFromToken(token) : this.jwtDecoder.decodeInfoFromToken('');
    this.username = decodedInfo['sub'];

    this.settingsService.getUserDetails(this.tempUsername).subscribe({
      next: (response) => {
        try {
          const userData = JSON.parse(response);
          console.log(userData);
          if (userData.length > 0) {
            this.updateFormWithUserData(userData[0]);
          } else {
            console.log('No user data found');
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching user data:', error);
      },
      complete: () => {
        this.loading = false; 
      }
    });
  }

  private updateFormWithUserData(user: any) {
    this.profileInformation.patchValue({
      name: user.name,
      username: user.username,
      emailID: user.email,
      contactNumber: user.phoneNumber,
      gender: user.gender.toLowerCase()
    });
    this.imageFileName=user.profilePicture;
  }

  createRequest(details: FormGroup){
    this.profileInformationData.name=details.value['name'];
    this.profileInformationData.username=details.value['username'];
    this.profileInformationData.phoneNumber=details.value['contactNumber'];
    this.profileInformationData.email=details.value['emailID'];
    this.profileInformationData.gender=details.value['gender'];
    
    this.processRequest(this.profileInformationData);
  }

  processRequest(profileInformationData:UserInformation){
    this.settingsService.postUserDetails(profileInformationData).subscribe({
      next: () => {
        this.popUpTitle = 'Success!';
        this.popUpBody = 'Your user details has been updated successfully.';
        this.showPopUp = true;
        console.log(profileInformationData);
        this.profileInformation.reset(); 
      },
      error: (error: HttpErrorResponse) => {
        this.popUpTitle = 'Error!';
        if (error.error && error.error.message) {
          this.popUpBody = `Error: ${error.error.message}`;
        } else {
          this.popUpBody = 'Something went wrong. Please try again.';
        }
        this.showPopUp = true;
      }
    });
  }

  onPopUpClose() {
    this.showPopUp = false; 
    window.location.reload();
  }

  resetForm(): void {
    this.ngOnInit();
  }

  handleClick():void{
    this.router.navigate(['/settings']);
  }
}
