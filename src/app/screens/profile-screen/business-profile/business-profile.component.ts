import { Component, Input, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user-profile.service";
import {
  faPhone,
  faEnvelope,
  faShare,
  faList,
  faBookmark,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { UserDetails } from "src/app/models/UserDetails";
import { AdvertisementDetails } from "src/app/models/ad-details";
import { DecodedToken } from "src/app/models/decodedToken";
import { JwtDecoderService } from "src/app/services/jwtDecoder/jwt-decoder.service";
import { ActivatedRoute } from "@angular/router";

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
  hasZeroPosts:boolean = false; 
  hasZeroSavedPosts:boolean = false;
  activeIndex: number | undefined = undefined; 
  showInsightScreen:boolean = false; 


  constructor(
    private UserService: UserService,
    private JwtDecoder: JwtDecoderService,
    private route: ActivatedRoute
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
    if(this.activeIndex === index){
      this.activeIndex = undefined; 
    }
    else{
      this.activeIndex = index;
    }
  }

  setInsightScreen(event:Event): void{
      event.stopPropagation(); 
      this.showInsightScreen = !this.showInsightScreen; 
  }

  hideInsight(event:Event):void{
    event.stopPropagation(); 
    this.showInsightScreen = false; 
    this.toggleInsight(undefined); 
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
        this.loadingUserDetails = false; // Stop skeletons even if there's an error
        this.userDetails = null; // Reset user details on error
        throw(error);
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
        if (data !== null && data.length > 0) {
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
          this.loadingProfilePosts = false;
          this.visibleProfilePosts.push(...data);
          this.profilePostPage++; // Increment page only if data exists
        } else if(data === null) {
          this.hasMoreProfilePosts = false; // No more posts to fetch
        }
        this.loadingProfilePosts = false;
      },
      error: (error) => {
        this.loadingProfilePosts = false; 
        throw(error);
      },
    });
  }

  fetchSavedPosts(username: string, page: number) {
    this.loadingSavedPosts = true;
    this.UserService.getSavedPosts(username, page, this.postsPerPage).subscribe(
      {
        next: (data) => {
          if (data !== null && data.length > 0) {
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
            this.loadingSavedPosts = false;
            this.visibleSavedPosts.push(...data);
            this.savedPostPage++; // Increment page only if data exists
          } else {
            this.hasZeroSavedPosts = true;
            this.hasMoreSavedPosts = false; // No more saved posts to fetch
          }
          this.loadingSavedPosts = false;
        },
        error: (error) => {
          this.loadingSavedPosts = false;
          throw(error);
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
