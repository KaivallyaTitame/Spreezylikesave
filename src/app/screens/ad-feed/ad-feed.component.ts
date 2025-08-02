import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from '@angular/core';
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { API_CONFIG } from "src/app/api-config";

@Component({
  selector: "app-ad-feed",
  templateUrl: "./ad-feed.component.html",
  styleUrls: ['./ad-feed.component.css'],
})
export class AdFeedComponent implements OnInit {
  ads: AdvertisementDetails[] = [];
  errorMessage: string = '';
  showErrorPopup: boolean = false;
  isLoading: boolean = true;
  isRefreshing: boolean = false;
  isLoadingMore: boolean = false;
  hasMoreData: boolean = true;
  private currentPage: number = 0;
  private pageSize: number = API_CONFIG.PAGE_SIZE;
  private totalPages: number = 0;

  constructor(
    private advertisementDetailsService: AdvertisementDetailsService,
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }

  onFollowStatusChanged(event: { username: string; isFollowing: boolean }): void {
    const { username, isFollowing } = event;
    this.ads.forEach(ad => {
      if (ad.username === username) {
        ad.following = isFollowing;
      }
    });
  }

  ngOnInit(): void {
    this.fetchAds();
  }

  isExpired(offerExpiry: string): boolean {
    const expiryDate = new Date(offerExpiry);
    const currentDate = new Date();
    return expiryDate < currentDate;
  }

  fetchAds(): void {
    this.isLoading = true;
    this.currentPage = 0;
    this.hasMoreData = true;
    this.advertisementDetailsService.getAdvertisementDetails(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.ads = response || [];
        this.isLoading = false;
        this.checkIfMoreDataAvailable(response?.length || 0);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load ads. Please try again later.';
        this.showErrorPopup = true;
        this.isLoading = false;
      }
    });
  }

  onRefresh(): void {
    this.isRefreshing = true;
    this.currentPage = 0;
    this.hasMoreData = true;
    this.advertisementDetailsService.getFreshAdvertisements(this.pageSize).subscribe({
      next: (response) => {
        this.ads = response;
        this.checkIfMoreDataAvailable(response.length);
        this.completeRefresh();
      },
      error: (err) => {
        this.errorMessage = 'Failed to refresh ads. Please try again later.';
        this.showErrorPopup = true;
        this.completeRefresh();
      }
    });
  }

  onLoadMore(): void {
    if (this.isLoadingMore || !this.hasMoreData) {
      return;
    }
    this.isLoadingMore = true;
    this.currentPage++; 
    this.advertisementDetailsService.getAdvertisementDetails(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          const previousLength = this.ads.length;
          this.ads = [...this.ads, ...response];
          this.checkIfMoreDataAvailable(response.length);
        } else {
          this.hasMoreData = false;
        }
        this.isLoadingMore = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load more ads. Please try again later.';
        this.showErrorPopup = true;
        this.isLoadingMore = false;
        this.currentPage--;
      }
    });
  }

  private completeRefresh(): void {
    setTimeout(() => {
      this.isRefreshing = false;
    }, 600);
  }

  private checkIfMoreDataAvailable(responseLength: number): void {
    if (responseLength < this.pageSize) {
      this.hasMoreData = false;
    }
  }
}