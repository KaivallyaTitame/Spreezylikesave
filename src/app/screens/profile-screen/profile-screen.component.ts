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
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css']
})
export class ProfileScreenComponent implements OnInit {
  business: any;
  @Input() profilePosts!: AdvertisementDetails[];
  @Input() savedPosts!: AdvertisementDetails[];
  visibleProfilePosts: AdvertisementDetails[] = [];
  visibleSavedPosts: AdvertisementDetails[] = [];
  profilePostPage: number = 1;
  savedPostPage: number = 1;
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
  selectedTab: string = 'posts'; //selected tab by default
  currentUsername: string = '';
  username: string | null = null;

  constructor(
    private businessService: BusinessService,
    private JwtDecoder: JwtDecoderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUsername = this.fetchCurrentUsername();
    console.log('Current username final is:', this.currentUsername);
    
    this.route.paramMap.subscribe(params => {
      this.username = params.get('username');
      if (this.username) {
        this.fetchBusinessDetails(this.username);
        this.fetchProfilePosts(this.username);
        this.fetchSavedPosts(this.username);
      }
    });
  }

  fetchCurrentUsername(): string {
    const token = localStorage.getItem('token') || '';
    const decodedToken: DecodedToken = this.JwtDecoder.decodeInfoFromToken(token);
    return decodedToken.sub;
  }

  fetchBusinessDetails(username: string) {
    this.businessService.getBusinessDetails(username)
      .subscribe({
        next:(data) => {
          this.business = data;
        },
        error:(error) => {
          console.error('Error fetching business details', error);
        }
      });
  }
  
  fetchProfilePosts(username: string) {
    this.loadingProfilePosts = true;
    this.businessService.getProfilePosts(username)
      .subscribe({
        next:(data) => {
          this.profilePosts = data;
          this.visibleProfilePosts = this.profilePosts.slice(0, this.postsPerPage);
          this.loadingProfilePosts = false;
        },
        error:(error) => {
          console.error('Error fetching profile posts', error);
          this.loadingProfilePosts = false;
        }
      });
  }
  
  fetchSavedPosts(username: string) {
    this.loadingSavedPosts = true;
    this.businessService.getSavedPosts(username)
      .subscribe({
        next:(data) => {
          this.savedPosts = data;
          this.visibleSavedPosts = this.savedPosts.slice(0, this.postsPerPage);
          this.loadingSavedPosts = false;
        },
        error:(error) => {
          console.error('Error fetching saved posts', error);
          this.loadingSavedPosts = false;
        }
      });
  }

  switchTab(tab: string): void {
    this.selectedTab = tab;

    // Reset scroll position on tab switch
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }

  onScroll(event: any) {
    const scrollContainer = event.target;
    const scrollPosition = scrollContainer.scrollTop + scrollContainer.clientHeight;
    const scrollHeight = scrollContainer.scrollHeight;

    // Check if the user has scrolled near the bottom (e.g., within 100px)
    if (scrollPosition >= scrollHeight - 100) {
      if (this.selectedTab === 'posts' && !this.loadingProfilePosts) {
        this.loadMoreProfilePosts();
      } else if (this.selectedTab === 'saved' && !this.loadingSavedPosts) {
        this.loadMoreSavedPosts();
      }
    }
  }

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