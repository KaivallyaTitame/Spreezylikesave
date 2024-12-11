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
    this.decodeToken();
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
    const token = localStorage.getItem('token') || '';
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
