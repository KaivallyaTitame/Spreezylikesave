import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from '@angular/core';
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';

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
  private pageSize: number = 10;
  private totalPages: number = 0;

  constructor(
    private advertisementDetailsService: AdvertisementDetailsService,
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
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
        this.ads = response;
        this.isLoading = false;
        this.checkIfMoreDataAvailable(response.length);
        console.log('Initial ads loaded:', response);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load ads. Please try again later.';
        this.showErrorPopup = true;
        this.isLoading = false;
        console.log(err);
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
        console.log('Ads refreshed:', response);
        this.completeRefresh();
      },
      error: (err) => {
        this.errorMessage = 'Failed to refresh ads. Please try again later.';
        this.showErrorPopup = true;
        console.log('Refresh error:', err);
        this.completeRefresh();
      }
    });
  }

  onLoadMore(): void {
    if (this.isLoadingMore || !this.hasMoreData) return;
    this.isLoadingMore = true;
    this.advertisementDetailsService.getFreshAdvertisements(this.pageSize).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.ads = [...this.ads, ...response];
          console.log('Fresh ads loaded at bottom:', response);
        } else {
          this.hasMoreData = false;
        }
        this.isLoadingMore = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load fresh ads. Please try again later.';
        this.showErrorPopup = true;
        this.isLoadingMore = false;
        console.log('Load fresh ads error:', err);
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