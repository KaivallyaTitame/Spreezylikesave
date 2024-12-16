import { Component, OnInit } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';
import { UserProfileDTO } from 'src/app/models/UserProfileDTO';
import { DecodedToken } from 'src/app/models/decodedToken';
import { JwtDecoderService } from 'src/app/services/jwtDecoder/jwt-decoder.service';
import { ChangeDetectorRef } from '@angular/core';

interface BusinessProfile extends UserProfileDTO {
  isFollowing: boolean;
  id: string;
}

@Component({
  selector: 'app-discover-business-screen',
  templateUrl: './discover-business-screen.component.html',
  styleUrls: ['./discover-business-screen.component.css']
})
export class DiscoverBusinessScreenComponent implements OnInit {

  userType: string = '';
  currentUsername: string = '';
  faArrowRight = faArrowRight;
  businesses: BusinessProfile[] = [];

  decodedToken: DecodedToken;

  constructor(
    private searchService: SearchService, 
    private router: Router, 
    private jwtDecoder: JwtDecoderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // const userTypeForTesting: 'Consumer' | 'Business' = 'Consumer'; // Change this to 'Business' for testing Business user type //use only for apk testing
    this.decodeToken(); // comment this line when doing apk testing
    // this.decodeToken(userTypeForTesting); //use only for apk testing 
    this.searchService.businesses$.subscribe({
      next: (businesses) => {
        this.businesses = businesses.map(business => ({
          ...business,
          id: business.username, 
          isFollowing: false 
        }));
      }
    });

    this.searchService.search('trending'); 
  }

  decodeToken(): void {
    const token = localStorage.getItem('token') || '';  //comment out for apk testing
    
  //  // use below code only for apk testing  
  //   let token = '';

  // // use appropriate token based on userType for APK testing, ie, 'Consumer' or 'Business'
  // if (userTypeForTesting === 'Consumer') {
  //   token = "eyJhbGciOiJIUzI1NiJ9.eyJVc2VyIFR5cGUiOiJDb25zdW1lciIsIlRva2VuX3R5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpc3MiOiJTcHJlZXp5Iiwic3ViIjoidmFpYmhhdkkiLCJpYXQiOjE3MzQwMjczMTcsImV4cCI6MTczNDAzMDkxN30.tVmeFOH7OLUuydmuV2sOQfvf8PI_0IPLsv9Up8zayao";
  // } else if (userTypeForTesting === 'Business') {
  //   token = "eyJhbGciOiJIUzI1NiJ9.eyJVc2VyIFR5cGUiOiJCdXNpbmVzcyIsIlRva2VuX3R5cGUiOiJBY2Nlc3MgVG9rZW4iLCJpc3MiOiJTcHJlZXp5Iiwic3ViIjoidkxpUTV0TkJqX0dDYzliRGJfN1ciLCJpYXQiOjE3MzQwMjc1NDAsImV4cCI6MTczNDAzMTE0MH0.s0sz54jxh9rhI0EoNRZeqI3GUoAdEzUqcGoF4EE0uZ0";
  // }

  // localStorage.setItem('token', token); //use only for apk testing 
    
    if (token) {
      try {
        this.decodedToken = this.jwtDecoder.decodeInfoFromToken(token);
        this.userType = this.decodedToken["User Type"];
        this.currentUsername = this.decodedToken.sub;
      } catch {
        this.router.navigate(['/login']); 
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleFollow(business: BusinessProfile): void {
    const Username = this.currentUsername; 
    
    this.searchService.toggleFollowStatus(Username, business.id, !business.isFollowing).subscribe({
      next: () => {
        business.isFollowing = !business.isFollowing;
      }
    });
  }

  getImageUrl(profilePicture: string): string {
    return this.searchService.getImageUrl(profilePicture);
  }

  truncate(text: string, length: number): string {
    if (text.length > length) {
      return text.substring(0, length) + '...';
    }
    return text;
  }

  goToNextPage(): void {
    if (this.userType === 'Consumer') {
      this.router.navigate(['/consumer-home/adfeed']);
    } else if (this.userType === 'Business') {
      this.router.navigate(['/business-home/adfeed']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
