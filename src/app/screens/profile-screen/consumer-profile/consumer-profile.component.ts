import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user-profile.service";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { UserDetails } from "src/app/models/UserDetails";
import { AdvertisementDetails } from "src/app/models/ad-details";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-consumer-profile",
  templateUrl: "./consumer-profile.component.html",
  styleUrls: ["./consumer-profile.component.css"],
})
export class ConsumerProfileComponent implements OnInit {
  userDetails: UserDetails | null = null; // User details fetched from backend
  loadingUserDetails: boolean = true; // To show skeletons while data is loading
  @Input() savedPosts!: AdvertisementDetails[];
  visibleSavedPosts: AdvertisementDetails[] = [];
  savedPostPage: number = 0;
  postsPerPage: number = 10;
  loadingSavedPosts: boolean = false;
  faBookmark = faBookmark;
  selectedTab: string = "saved"; // Selected tab by default
  username: string | null = null;

  showPopup: boolean = false;
  popupTitle: string = "Error";
  popupBody: string = "";

  hasMoreSavedPosts: boolean = true; // Initially assume there are more saved posts

  private scrollPositions: { [key: string]: number } = {
    saved: 0,
  };

  constructor(
    private UserService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get("username");
      if (this.username) {
        this.fetchUserDetails(this.username);
        this.fetchSavedPosts(this.username, this.savedPostPage);
      }
    });
  }

  fetchUserDetails(username: string) {
    this.loadingUserDetails = true; // Show skeletons during loading
    this.UserService.getUserDetails(username).subscribe({
      next: (data) => {
        if (data.profileImageUrl) {
          data.profileImageUrl = this.UserService.getImageUrl(
            username,
            data.profileImageUrl
          );
        }
        this.userDetails = data;
        this.loadingUserDetails = false; // Hide skeletons after successful fetch
      },
      error: (error) => {
        this.userDetails = null; // Reset user details on error
        this.loadingUserDetails = false; // Stop skeletons even if there's an error
        this.showError(
          error?.error?.errorCode || "Error fetching profile",
          error?.error?.errorDescription || "Please try again later."
        );
      },
    });
  }

  fetchSavedPosts(username: string, page: number) {
    this.loadingSavedPosts = true;
    this.UserService.getSavedPosts(username, page, this.postsPerPage).subscribe(
      {
        next: (data) => {
          if (data.length > 0) {
            data.forEach((post) => {
              if (post.profileImageUrl) {
                post.profileImageUrl = this.UserService.getImageUrl(
                  username,
                  post.profileImageUrl
                );
              }
              if (post.imagePaths && post.imagePaths.length > 0) {
                post.imagePaths = post.imagePaths.map((imagePath) =>
                  this.UserService.getImageUrl(username, imagePath)
                );
              }
            });
            this.visibleSavedPosts.push(...data);
            this.savedPostPage++; // Increment page if there are more posts
          } else {
            this.hasMoreSavedPosts = false; // No more saved posts to fetch
          }
          this.loadingSavedPosts = false;
        },
        error: (error) => {
          this.loadingSavedPosts = false; // Stop loading spinner on error
          this.showError(
            error?.error?.errorCode || "Error while fetching posts",
            error?.error?.errorDescription || "Please try again later."
          );
        },
      }
    );
  }

  showError(title: string, body: string) {
    this.popupTitle = title;
    this.popupBody = body;
    this.showPopup = true;
  }

  onScroll(event: any): void {
    const scrollContainer = event.target;
    const scrollPosition =
      scrollContainer.scrollTop + scrollContainer.clientHeight;
    const scrollHeight = scrollContainer.scrollHeight;

    if (
      scrollPosition >= scrollHeight - 100 &&
      !this.loadingSavedPosts &&
      this.hasMoreSavedPosts
    ) {
      this.fetchSavedPosts(this.username!, this.savedPostPage); // Load more saved posts
    }
  }

  switchTab(tab: string): void {
    // Save the current scroll position for the active tab
    const scrollContainer = document.querySelector(".scroll-container");
    if (scrollContainer) {
      this.scrollPositions[this.selectedTab] = scrollContainer.scrollTop;
    }

    // Switch the selected tab
    this.selectedTab = tab;

    // Restore the scroll position for the new tab
    setTimeout(() => {
      const newScrollContainer = document.querySelector(".scroll-container");
      if (newScrollContainer) {
        newScrollContainer.scrollTop = this.scrollPositions[tab] || 0;
      }
    }, 0);
  }

  defaultProfileImage = "assets/default-pic.png";
  onProfileImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.defaultProfileImage;
  }
}
