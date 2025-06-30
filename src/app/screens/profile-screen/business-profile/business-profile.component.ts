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
import { HttpErrorResponse } from "@angular/common/http";

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
  activeIndex: number | undefined = undefined;  // indicates which post insight to be displayed. if it is undefined then it will not shown.
  showInsightScreen:boolean = false;  // this variable decides the visibility of the post insight component.
  noPostTitle:string = ''; 
  noPostDescription:string = ''; 

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

  // this method sets the current active index of the post. 
  toggleInsight(index: number | undefined): void {

    // first checks the given post data has insightDetails attribute. 
    if(index != undefined && this.visibleProfilePosts[index].insightDetails === undefined){
      // if post is selected for showing and post to show has not insightDetails attribute
      // then it throws error.  
      const customError = new HttpErrorResponse({
        error:{
          errorCode:'SPX-0-001', 
          errorDescription:'Unable to get insights of the given post..'
        }
      });
      throw(customError) 
    }
    else{
      if(this.activeIndex === index){
        this.activeIndex = undefined;
        // when we are closing opened post insight component by clicking on button hide insight.  
      }
      else if(this.activeIndex !== undefined && this.activeIndex !== index && index != undefined){
        // this case is used to handle when already one post is opened
        // we tried to open insights of other post then it executes. 
        setTimeout(() => {
            // first it post insight screen disappears(showInsightScreen set to false) as method fired from post.ts file. 
            // secondly it sets the data of the post insight screen. 
            this.activeIndex = index; 
            // it reappears the post insight again. 
            this.showInsightScreen = true; 
            // for animation accuracies i have used setTimeout function.
        },1000);
      }
      else{
        // in another case it executes this scnerios. 
        this.activeIndex = index; 
      }
    }
  }

  // it is used to toggle the showInsightScreen value. 
  setInsightScreen(event:Event): void{
      event.stopPropagation(); 
      // it is used to stop the propagation of parent to child component. 
      if(this.activeIndex != undefined && this.visibleProfilePosts[this.activeIndex].insightDetails !== undefined){
         // it is check for preventing unnecessary opening of component on invalid data.  
         this.showInsightScreen = !this.showInsightScreen;
      }
      else{
        // if above condition is not satisfied then component will be closed. 
        this.showInsightScreen = false; 
      }
  }

  // this component specifically designed for hiding the component when clicked outside the post-insight compoenent
  hideInsight(event:Event):void{
    // first it sets to false
    this.showInsightScreen = false; 
    // in below code delay is added to execut the code when animation is completed. 
    setTimeout(() => {
      this.activeIndex = undefined;
    },400);  
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
    const loggedInUser:string = ''; 
    const token = localStorage.getItem("token") || "";
    const payload = JSON.parse((atob(token.split('.')[1]))); 
    if(this.username != payload.sub){
      this.noPostTitle = 'No posts yet !'; 
      this.noPostDescription = 'Reach out to connect...'; 
    }
    else{
      this.noPostTitle = 'Oops, nothing here yet!'; 
      this.noPostDescription = 'Start Posting';
    }
   
    this.UserService.getUserDetails(username).subscribe({
      next: (data) => {
        if (data.profileImageUrl) {
          data.profileImageUrl = this.UserService.getImageUrl(
            username,
            data.profileImageUrl
          );

        }
        console.log(data);
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
        } 
        else
        {
          if(data == null)
          {
            this.hasZeroPosts = true;
          }
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
              // if (post.profileImageUrl) {
              //   post.profileImageUrl = this.UserService.getImageUrl(
              //     username,
              //     post.profileImageUrl
              //   );
              // }
              // if (post.imagePaths?.length > 0) {
              //   post.imagePaths = post.imagePaths.map((imagePath) =>
              //     this.UserService.getImageUrl(username, imagePath)
              //   );
              // }
            });
            this.loadingSavedPosts = false;
            this.visibleSavedPosts.push(...data);
            this.savedPostPage++; // Increment page only if data exists
          } else {
            if(data == null)
            {
              this.hasZeroSavedPosts = true;
            }
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
    console.log(this.selectedTab);

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
