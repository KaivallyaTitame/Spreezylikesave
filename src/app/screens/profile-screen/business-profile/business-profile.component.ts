import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faBookmark,
  faCircleUser,
  faEnvelope,
  faList,
  faPhone,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { UserDetails } from "src/app/models/UserDetails";
import { AdvertisementDetails } from "src/app/models/ad-details";
import { DecodedToken } from "src/app/models/decodedToken";
import { JwtDecoderService } from "src/app/services/jwtDecoder/jwt-decoder.service";
import { UserService } from "src/app/services/user-profile.service";
import { ImageUrlGenerationService } from "src/app/shared/image-url-generation.service";

@Component({
  selector: "app-business-profile",
  templateUrl: "./business-profile.component.html",
  styleUrls: ["./business-profile.component.css"],
})
export class BusinessProfileComponent implements OnInit {
  userDetails: UserDetails | null = null; // User details fetched from backend
  loadingUserDetails: boolean = true; // To show skeletons while data is loading
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
  selectedTab: string = "posts"; //selected tab by default
  currentUsername: string = "";
  username: string | null = null;
  userType: string;
  showPopup: boolean = false;
  popupTitle: string = "Error";
  popupBody: string = "";
  hasMoreProfilePosts: boolean = true; // Initially assume there are more posts
  hasMoreSavedPosts: boolean = true; // Initially assume there are more saved posts
  activeIndex: number | undefined = undefined; // indicates which post insight to be displayed. if it is undefined then it will not shown.
  showInsightScreen: boolean = false; // this variable decides the visibility of the post insight component.

  constructor(
    private UserService: UserService,
    private JwtDecoder: JwtDecoderService,
    private route: ActivatedRoute,
    private imageService: ImageUrlGenerationService
  ) {}

  ngOnInit(): void {
    this.currentUsername = this.fetchCurrentUsername();
    this.route.paramMap.subscribe((params) => {
      this.username = params.get("username");
      if (this.username) {
        this.fetchUserDetails(this.username);
        this.fetchProfilePosts(this.username, this.profilePostPage);
        if (this.currentUsername === this.username) {
          this.fetchSavedPosts(this.username, this.savedPostPage);
        }
      }
    });
  }

  toggleInsight(index: number | undefined): void {
    console.log(this.visibleProfilePosts);

    if (
      index != undefined &&
      this.visibleProfilePosts[index].insightDetails === undefined
    ) {
      this.showError("404", "Please try again later.");
      return;
    } else {
      if (this.activeIndex === index) {
        this.activeIndex = undefined;
      } else if (
        this.activeIndex !== undefined &&
        this.activeIndex !== index &&
        index != undefined
      ) {
        setTimeout(() => {
          this.activeIndex = index;
          this.showInsightScreen = true;
        }, 1000);
      } else {
        this.activeIndex = index;
      }
    }
  }

  setInsightScreen(event: Event): void {
    event.stopPropagation();
    if (
      this.activeIndex != undefined &&
      this.visibleProfilePosts[this.activeIndex].insightDetails !== undefined
    ) {
      this.showInsightScreen = !this.showInsightScreen;
    } else {
      this.showInsightScreen = false;
    }
  }

  hideInsight(event: Event): void {
    this.showInsightScreen = false;
    setTimeout(() => {
      this.activeIndex = undefined;
    }, 400);
  }

  fetchCurrentUsername(): string {
    const token = localStorage.getItem("token") || "";
    const decodedToken: DecodedToken =
      this.JwtDecoder.decodeInfoFromToken(token);
    this.userType = decodedToken["userType"];
    this.currentUsername = decodedToken.sub;
    return decodedToken.sub;
  }

  fetchUserDetails(username: string) {
    this.loadingUserDetails = true;
    this.UserService.getUserDetails(username).subscribe({
      next: (data) => {
        if (data.profileImageUrl) {
          data.profileImageUrl = this.imageService.generateImageUrl(data.profileImageUrl);
          // data.profileImageUrl = this.UserService.getImageUrl(
          //   username,
          //   data.profileImageUrl
          // );
        }
        this.userDetails = data;
        this.loadingUserDetails = false;
      },
      error: (error) => {
        this.userDetails = null;
        this.loadingUserDetails = false;
        this.showError(
          error?.error?.errorCode || "Error fetching profile",
          error?.error?.errorDescription || "Please try again later."
        );
      },
    });
  }

  fetchProfilePosts(username: string, page: number) {
    this.loadingProfilePosts = true;
    this.UserService.getProfilePosts(
      username,
      page,
      this.postsPerPage
    ).subscribe({
      next: (data) => {
        if (data.length > 0) {
          data.forEach((post) => {
            if (post.profileImageUrl) {
              post.profileImageUrl = this.UserService.getImageUrl(
                username,
                post.profileImageUrl
              );
            }
            if (post.imagePaths?.length > 0) {
              post.imagePaths = post.imagePaths.map((imagePath) =>
                this.UserService.getImageUrl(username, imagePath)
              );
            }
          });
          this.visibleProfilePosts.push(...data);
          this.profilePostPage++; // Increment page only if data exists
        } else {
          this.hasMoreProfilePosts = false; // No more posts to fetch
        }
        this.loadingProfilePosts = false;
      },
      error: (error) => {
        this.showError(
          error?.error?.errorCode || "Error while fetching profile posts",
          error?.error?.errorDescription ||
            "Unable to fetch profile post, please try again later"
        );
        this.loadingProfilePosts = false;
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
              if (post.imagePaths?.length > 0) {
                post.imagePaths = post.imagePaths.map((imagePath) =>
                  this.UserService.getImageUrl(username, imagePath)
                );
              }
            });
            this.visibleSavedPosts.push(...data);
            this.savedPostPage++; // Increment page only if data exists
          } else {
            this.hasMoreSavedPosts = false; // No more saved posts to fetch
          }
          this.loadingSavedPosts = false;
        },
        error: (error) => {
          this.showError(
            error?.error?.errorCode || "Error fetching saved posts",
            error?.error?.errorDescription ||
              "Unable to fetch saved post, please try again later"
          );
          this.loadingSavedPosts = false;
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

    if (scrollPosition >= scrollHeight - 100) {
      if (
        this.selectedTab === "posts" &&
        !this.loadingProfilePosts &&
        this.hasMoreProfilePosts
      ) {
        this.fetchProfilePosts(this.username!, this.profilePostPage);
      } else if (
        this.selectedTab === "saved" &&
        !this.loadingSavedPosts &&
        this.hasMoreSavedPosts
      ) {
        this.fetchSavedPosts(this.username!, this.savedPostPage);
      }
    }
  }

  private scrollPositions: { [key: string]: number } = {
    posts: 0,
    saved: 0,
  };

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
    this.activeIndex = undefined;
  }

  defaultProfileImage = "assets/default-pic.png";
  onProfileImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.defaultProfileImage;
  }
}
