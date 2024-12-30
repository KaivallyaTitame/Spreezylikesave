import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faBars, faCircleQuestion, faFileLines, faFilePen, faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ConsumerNavigationService } from 'src/app/services/consumer-navigation.service';
import { UserProfileDTO } from 'src/app/models/UserProfileDTO';
import { AuthService } from 'src/app/services/auth.service';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { DecodedToken } from 'src/app/models/decoded-token';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-consumer-top-navbar',
  templateUrl: './consumer-top-navbar.component.html',
  styleUrls: ['./consumer-top-navbar.component.css']
})
export class ConsumerTopNavbarComponent implements OnInit {
  faIcons = {
    bars: faBars,
    search: faSearch,
    gear: faGear,
    filePen: faFilePen,
    fileLines: faFileLines,
    circleQuestion: faCircleQuestion,
    arrowRightFromBracket: faArrowRightFromBracket
  };

  consumer: UserProfileDTO | null = null; 
  currentUsername: string = '';
 

  constructor(private router: Router, 
    private consumernavigationservice: ConsumerNavigationService, 
    private authService : AuthService,
    private jwtDecoderService: JwtDecoderService) {}

  ngOnInit(): void {
    this.decodeToken();
    this.fetchConsumerInformation();
 
  }

  decodeToken(): void {
    const token = localStorage.getItem('token') || '';
    if (token) {
      try {
        const decodedToken = this.jwtDecoderService.decodeInfoFromToken(token); 
        this.currentUsername = decodedToken.sub; 
      } catch (error) {
        console.error('Error decoding token:', error);
        this.router.navigate(['/login']); 
      }
    } else {
      this.router.navigate(['/login']); 
    }
  }

  fetchConsumerInformation(): void {
    if (this.currentUsername) {
      this.consumernavigationservice.getUserDetails(this.currentUsername).subscribe({
        next: (response) => {
          try {
            const userData = JSON.parse(response); 
            if (userData.length > 0) {
              this.consumer = Object.assign(new UserProfileDTO(), userData[0]);
            } else {
              console.log('No user data found');
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching user data:', error);
        }
      });
    }
  }

  logout(){
    this.authService.logout();
  }
}
