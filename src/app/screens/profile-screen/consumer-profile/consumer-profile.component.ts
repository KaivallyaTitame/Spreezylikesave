import { Component, Input, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business-profile.service';
import { faPhone, faEnvelope, faShare, faList, faBookmark, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { BusinessDetails } from 'src/app/models/BusinessDetails';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { DecodedToken } from 'src/app/models/decodedToken';
import { JwtDecoderService } from 'src/app/services/jwtDecoder/jwt-decoder.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consumer-profile',
  templateUrl: './consumer-profile.component.html',
  styleUrls: ['./consumer-profile.component.css']
})

export class ConsumerProfileComponent implements OnInit{
  businessDetails: BusinessDetails;
  @Input() profilePosts!: AdvertisementDetails[];
  @Input() savedPosts!: AdvertisementDetails[];
  visibleProfilePosts: AdvertisementDetails[] = [];
  visibleSavedPosts: AdvertisementDetails[] = [];
  profilePostPage: number = 0;
  savedPostPage: number = 0;
  postsPerPage: number = 10;
  loadingProfilePosts: boolean = false;
  loadingSavedPosts: boolean = false;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faShare = faShare;
  faList = faList;
  faBookmark = faBookmark;
  faCircleUser = faCircleUser;
  selectedTab: string = 'saved'; //selected tab by default
  currentUsername: string = '';
  username: string | null = null;
  userType: string;

  showPopup: boolean = false;
  popupTitle: string = 'Error';
  popupBody: string = '';

  constructor(
    private businessService: BusinessService,
    private JwtDecoder: JwtDecoderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUsername = this.fetchCurrentUsername();
    console.log('Current username final is:', this.currentUsername);
    console.log('User type is:', this.userType);

    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      if (this.username) {
        this.fetchBusinessDetails(this.username);
        this.fetchSavedPosts(this.username, this.savedPostPage);
      }
    });
  }
  fetchCurrentUsername(): string {
    const token = localStorage.getItem('token') || '';
    const decodedToken: DecodedToken = this.JwtDecoder.decodeInfoFromToken(token);
    this.userType = decodedToken["User Type"];
    this.currentUsername = decodedToken.sub;
    return decodedToken.sub;
  }

  fetchBusinessDetails(username: string) {
    this.businessService.getBusinessDetails(username)
      .subscribe({
        next:(data) => {
          this.businessDetails = data;
        },
        error:(error) => {
          this.showError('Error fetching User Details', 'Please try again later.');
          console.error('Error fetching business details', error);
        }
      });
  }

  fetchSavedPosts(username: string, page: number) {
    this.loadingSavedPosts = true;
    this.businessService.getSavedPosts(username, page, this.postsPerPage)
      .subscribe({
        next: (data) => {
          this.visibleSavedPosts.push(...data); // Append new data
          this.loadingSavedPosts = false;
          if (data.length > 0) {
            this.savedPostPage++; // Increment page if there are more posts
          }
        },
        error: (error) => {
          this.showError(error, 'Unable to load saved posts.');
          console.error('Error fetching saved posts', error);
          this.loadingSavedPosts = false;
        }
      });
  }
  
  showError(title: string, body: string) {
    this.popupTitle = title;
    this.popupBody = body;
    this.showPopup = true;
  }

  onScroll(event: any) {
    const scrollContainer = event.target;
    const scrollPosition = scrollContainer.scrollTop + scrollContainer.clientHeight;
    const scrollHeight = scrollContainer.scrollHeight;
  
    if (scrollPosition >= scrollHeight - 100) {
      if (this.selectedTab === 'posts' && !this.loadingProfilePosts) {
         // Pass current page
      } else if (this.selectedTab === 'saved' && !this.loadingSavedPosts) {
        this.fetchSavedPosts(this.username!, this.savedPostPage); // Pass current page
      }
    }
  }
  

// Properties to store scroll positions for each tab
private scrollPositions: { [key: string]: number } = {
  posts: 0,
  saved: 0,
};

switchTab(tab: string): void {
  // Save the current scroll position for the active tab
  const scrollContainer = document.querySelector('.scroll-container');
  if (scrollContainer) {
    this.scrollPositions[this.selectedTab] = scrollContainer.scrollTop;
  }

  // Switch the selected tab
  this.selectedTab = tab;

  // Restore the scroll position for the new tab
  setTimeout(() => {
    const newScrollContainer = document.querySelector('.scroll-container');
    if (newScrollContainer) {
      newScrollContainer.scrollTop = this.scrollPositions[tab] || 0;
    }
  }, 0);
}

// onScroll(event: any) {
//   const scrollContainer = event.target;
//   const scrollPosition = scrollContainer.scrollTop + scrollContainer.clientHeight;
//   const scrollHeight = scrollContainer.scrollHeight;

//   // Check if the user has scrolled near the bottom (e.g., within 100px)
//   if (scrollPosition >= scrollHeight - 100) {
//     if (this.selectedTab === 'posts' && !this.loadingProfilePosts) {
//       this.loadMoreProfilePosts();
//     } else if (this.selectedTab === 'saved' && !this.loadingSavedPosts) {
//       this.loadMoreSavedPosts();
//     }
//   }
// }

  loadMoreProfilePosts() {
    const nextPageStartIndex = this.profilePostPage * this.postsPerPage;
    const nextPageEndIndex = nextPageStartIndex + this.postsPerPage;

    if (nextPageStartIndex < this.profilePosts.length) {
      this.loadingProfilePosts = true;
      setTimeout(() => {
        this.visibleProfilePosts.push(...this.profilePosts.slice(nextPageStartIndex, nextPageEndIndex));
        this.profilePostPage++;
        this.loadingProfilePosts = false;
      }, 1000);
    }
  }

  loadMoreSavedPosts() {
    const nextPageStartIndex = this.savedPostPage * this.postsPerPage;
    const nextPageEndIndex = nextPageStartIndex + this.postsPerPage;

    if (nextPageStartIndex < this.savedPosts.length) {
      this.loadingSavedPosts = true;
      setTimeout(() => {
        this.visibleSavedPosts.push(...this.savedPosts.slice(nextPageStartIndex, nextPageEndIndex));
        this.savedPostPage++;
        this.loadingSavedPosts = false;
      }, 1000);
    }
  }

  isExpired(offerExpiry: string): boolean {
    const expiryDate = new Date(offerExpiry);
    const currentDate = new Date();
    return expiryDate < currentDate;
  }

}
