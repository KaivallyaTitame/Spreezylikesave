import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';


@Component({
  selector: 'app-main-settings',
  templateUrl: './main-settings.component.html',
  styleUrls: ['./main-settings.component.css']
})
export class MainSettingsComponent {
  userType:string='';

  constructor(private router: Router,private jwtDecoder:JwtDecoderService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    const decodedInfo = token ? this.jwtDecoder.decodeInfoFromToken(token) : this.jwtDecoder.decodeInfoFromToken('');
    this.userType=decodedInfo.userType;
    
  }

  navigateToProfileInformation() {
    if (this.userType === 'user') {
      this.router.navigate(['/business-home/settings/user-information']);
    } else if (this.userType === 'business') {
      this.router.navigate(['/business-home/settings/business-information']);
    } else {
      console.error('User type is not valid or not found in localStorage');
    }
  }
}
