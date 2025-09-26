import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  faThumbsDown as faThumbsDownOutline,
  faThumbsUp as faThumbsUpOutline,
  faBookmark as regularBookmark,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faBell,
  faChevronLeft,
  faChevronRight,
  faCircleUser,
  faEllipsisVertical,
  faHeart,
  faLocationArrow,
  faLocationDot,
  faMagnifyingGlass,
  faPaperPlane,
  faThumbsDown,
  faThumbsUp,
  faUserGroup,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { AdvertisementDetails } from "src/app/models/ad-details";
import { AdvertisementDetailsService } from "src/app/services/advertisementTypes.service";
import { JwtDecoderService } from "src/app/services/jwtDecoder/jwt-decoder.service";
import { ShareService } from "src/app/services/share.service";
import { ImageUrlGenerationService } from "../image-url-generation.service";
import { UserInteractionStateService } from "src/app/services/user-interaction-state.service";

@Component({
  selector: "app-offer-description",
  templateUrl: "./offer-description.component.html",
  styles: [],
})
export class OfferDescriptionComponent implements OnInit {
  @Input() offerData: AdvertisementDetails;
  dropdowns: { [key: string]: boolean } = {
    howToAvail: false,
    termsConditions: false,
  };
  remainingDays: number;
  remainingHours: number;
  isExpired: boolean = false;
  showLikeAnimation: boolean = false;
  scaleAnimation: boolean = false;
  showDislikeAnimation: boolean = false;
  isSaved: boolean = false;
  showSavedMessage: boolean = false;
  showReportButton: boolean = false;
  showReportSuccess: boolean = false;
  showPopup: boolean = false;
  popupTitle: string = "Error";
  popupBody: string = "";
  faPaperPlane = faPaperPlane;
  faBars = faBars;
  faUserGroup = faUserGroup;
  faMagnifyingGlass = faMagnifyingGlass;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faLocationArrow = faLocationArrow;
  solidBookmark = solidBookmark;
  regularBookmark = regularBookmark;
  faEllipsisVertical = faEllipsisVertical;
  faLocationDot = faLocationDot;
  faHeart = faHeart;
  faBell = faBell;
  faCircleUser = faCircleUser;
  faThumbsUpOutline = faThumbsUpOutline;
  faThumbsDownOutline = faThumbsDownOutline;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  currentImageIndex = 0;
  translateX = 0;
  copyButtonText: string = "Copy";
  isCoupon: boolean = false;
  isEvent: boolean = false;
  isPost: boolean = false;
  isFollowing: boolean = false;
  @ViewChild("imageContainer") imageContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private advertisementDetailsService: AdvertisementDetailsService,
    private router: Router,
    private shareService: ShareService,
    private jwtDecoderService: JwtDecoderService,
    private imageUrlGeneratorService: ImageUrlGenerationService,
    private stateService: UserInteractionStateService
  ) { }

  hasValidImages: boolean = true;
  handleImageError(event: any): void {
    this.hasValidImages = false;
    event.target.classList.add("min-h-48");
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['offerData']) {
      this.offerData = navigation.extras.state['offerData'];
    } else {
      const state = history.state;
      if (state?.offerData) {
        this.offerData = state.offerData;
      }
    }
    
    if (this.offerData) {
      this.offerData.profileImageUrl = this.imageUrlGeneratorService.generateImageUrl(
        this.offerData.profileImageUrl
      );
      this.offerData.imagePaths = this.imageUrlGeneratorService.generateImageUrls(
        this.offerData.imagePaths
      );
      
      if (this.offerData.advertisementType === "Coupon") {
        this.isCoupon = true;
      } else if (this.offerData.advertisementType === "Event") {
        this.isEvent = true;
      } else {
        this.isPost = true;
      }
      
      this.isFollowing = this.offerData.following;
      const { remainingDays, remainingHours, isExpired } =
        this.advertisementDetailsService.calculateExpiry(
          this.offerData.offerExpiry
        );
      this.remainingDays = remainingDays;
      this.remainingHours = remainingHours;
      this.isExpired = isExpired;

      // Load saved interaction state
      this.loadSavedState();
    } else {
      this.router.navigate(['/']);
    }
  }

  copyToClipboard(couponCode: string): void {
    navigator.clipboard
      .writeText(couponCode)
      .then(() => {
        this.copyButtonText = "Copied";
        setTimeout(() => {
          this.copyButtonText = "Copy";
        }, 2000);
      })
      .catch((err) => {
        this.showError(
          "Copy Error",
          "Failed to copy coupon code. Please try again."
        );
      });
  }

  bookNow(): void {
    window.location.href = this.offerData.websiteLink;
  }

  toggleFollow(): void {
    let token = localStorage.getItem("token") || "";
    let userName =
      this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    const sourceUsername = userName || "currentUser";
    const targetUsername = this.offerData.username;
    if (this.isFollowing) {
      this.advertisementDetailsService
        .unfollowUser(sourceUsername, targetUsername)
        .subscribe({
          next: (response) => {
            if (response.status === 200) {
              this.isFollowing = false;
              this.offerData.following = false;

            }
          },
          error: (error) => {
            console.error("Error unfollowing:", error);
          },
        });
    } else {
      this.advertisementDetailsService
        .followUser(sourceUsername, targetUsername)
        .subscribe({
          next: (response) => {
            if (response.status === 200) {
              this.isFollowing = true;
              this.offerData.following = true;
            }
          },
          error: (error) => {
            console.error("Error following:", error);
          }
        });
    }
  }

  checkIfFollowing(): void {
    this.isFollowing = this.offerData.following;
  }

  share() {
    this.shareService.shareContent(this.offerData);
  }

  navigateToProfile() {
    if (this.router.url == "/business-home/adfeed") {
      this.router.navigate([
        "/profile-screen/business-profile",
        this.offerData.username,
      ]);
    } else {
      this.router.navigate([
        "/profile-screen/consumer-profile",
        this.offerData.username,
      ]);
    }
  }

  get offerDataSafe(): AdvertisementDetails {
    if (!this.offerData) {
      throw new Error("offerData is null");
    }
    return this.offerData;
  }

  toggleDropdown(key: string): void {
    this.dropdowns[key] = !this.dropdowns[key];
  }

  viewOnWebsite(): void {
    if (this.offerData && this.offerData.websiteLink) {
      window.open(this.offerData.websiteLink, "_blank");
    }
  }

  likePost(): void {
    const advertisementId = this.offerData.advertisementId;
    this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
      next: (response) => {
        this.triggerAnimation("like");
        const status = response.status;
        if (status == 201) {
          this.isLiked = true;
          this.isDisliked = false;
          this.offerData.likes += 1;
        } else if (status == 200) {
          this.isLiked = true;
          this.isDisliked = false;
          this.offerData.likes += 1;
          this.offerData.dislikes -= 1;
        }
      },
      error: (error) => {
        if (error.status == 409) {
          (this.isLiked = true), (this.isDisliked = false);
        } else {
          this.showError(
            "Like Error",
            "Failed to update likes. Please try again."
          );
        }
      },
    });
  }

  dislikePost(): void {
    const advertisementId = this.offerData.advertisementId;
    this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
      next: (response) => {
        this.triggerAnimation("dislike");
        const status = response.status;
        if (status === 201) {
          this.isDisliked = true;
          this.isLiked = false;
          this.offerData.dislikes += 1;
        } else if (status === 200) {
          this.isDisliked = true;
          this.isLiked = false;
          this.offerData.dislikes += 1;
          this.offerData.likes -= 1;
        }
      },
      error: (error) => {
        if (error.status === 409) {
          this.isDisliked = true;
          this.isLiked = false;
        } else {
          this.showError(
            "Dislike Error",
            "Failed to update dislike. Please try again."
          );
        }
      },
    });
  }

  savePost(): void {
    const advertisementId = this.offerDataSafe.advertisementId;
    const username = this.offerDataSafe.username;
    this.triggerAnimation("save");
    this.scaleAnimation = true;
    setTimeout(() => {
      this.scaleAnimation = false;
    }, 500);
    this.isSaved = !this.isSaved;
    this.advertisementDetailsService
      .savePost(username, advertisementId)
      .subscribe({
        next: (response) => {
        },
        error: (err) => {
          this.showError(
            "Save Error",
            "Failed to save the post. Please try again."
          );
          this.isSaved = !this.isSaved;
        },
      });
  }

  toggleReportButton(): void {
    this.showReportButton = !this.showReportButton;
  }

  reportPost(): void {
    this.advertisementDetailsService
      .reportPost(this.offerData.advertisementId)
      .subscribe({
        next: (response) => {
          this.showReportSuccess = true;
          this.showReportButton = false;
        },
        error: (err) => {
          this.showError(
            "Report Error",
            "Failed to Report the post. Please try again."
          );
        },
      });
    document.body.style.overflow = "hidden";
  }

  hideReportSuccess(): void {
    this.showReportSuccess = false;
    document.body.style.overflow = "auto";
  }

  showError(title: string, body: string) {
    this.popupTitle = title;
    this.popupBody = body;
    this.showPopup = true;
  }

  triggerAnimation(type: "like" | "dislike" | "save") {
    if (type === "like") {
      this.showLikeAnimation = true;
    } else if (type === "dislike") {
      this.showDislikeAnimation = true;
    }
    setTimeout(() => {
      this.showLikeAnimation = false;
      this.showDislikeAnimation = false;
    }, 500);
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateTranslateX();
    }
  }

  nextImage() {
    if (
      this.offerData.imagePaths &&
      this.currentImageIndex < this.offerData.imagePaths.length - 1
    ) {
      this.currentImageIndex++;
      this.updateTranslateX();
    }
  }

  goToImage(index: number) {
    if (
      this.offerData.imagePaths &&
      index >= 0 &&
      index < this.offerData.imagePaths.length
    ) {
      this.currentImageIndex = index;
      this.updateTranslateX();
    }
  }

  updateTranslateX() {
    const containerWidth = this.imageContainer?.nativeElement?.clientWidth || 0;
    this.translateX = -this.currentImageIndex * containerWidth;
  }

  @HostListener("window:resize")
  onResize() {
    this.updateTranslateX();
  }

  startX: number;

  @HostListener("touchstart", ["$event"])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener("touchend", ["$event"])
  onTouchEnd(event: TouchEvent) {
    const endX = event.changedTouches[0].clientX;
    const diff = endX - this.startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.prevImage();
      } else {
        this.nextImage();
      }
    }
  }

  private loadSavedState(): void {
    const savedState = this.stateService.getState(this.offerData.advertisementId);
    if (savedState) {
      this.isLiked = savedState.isLiked;
      this.isDisliked = savedState.isDisliked;
      this.isSaved = savedState.isSaved;
      this.offerData.likes = savedState.likesCount;
      this.offerData.dislikes = savedState.dislikesCount;
    }
  }
}
