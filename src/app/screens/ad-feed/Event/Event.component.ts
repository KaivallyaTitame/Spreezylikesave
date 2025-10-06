import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
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
import { EngageService } from "src/app/shared/engage.service";
import { ImageUrlGenerationService } from "src/app/shared/image-url-generation.service";
@Component({
  selector: "app-Event",
  templateUrl: "./Event.component.html",
  styleUrls: [],
})
export class EventComponent implements OnInit, OnChanges {
  @Input() eventDetails!: AdvertisementDetails;
  @Input() index!: number;
  @Input() activeIndex!: number | undefined;
  @Output() setActiveIndex = new EventEmitter<number>();
  @Output() setInsightScreen = new EventEmitter<Event>();
  @Input() showButton!: boolean;
  @Output() followStatusChanged = new EventEmitter<{
    username: string;
    isFollowing: boolean;
  }>();
  remainingDays: number;
  remainingHours: number;
  isExpired: boolean = false;
  reportVisible: boolean = false;
  showReportButton: boolean = false;
  showReportSuccess: boolean = false;
  showLikeAnimation: boolean = false;
  showDislikeAnimation: boolean = false;
  isSaved: boolean = false;
  showSavedMessage: boolean = false;
  scaleAnimation: boolean = false;
  showPopup: boolean = false;
  popupTitle: string = "Error";
  popupBody: string = "";
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
  faPaperPlane = faPaperPlane;
  faCircleUser = faCircleUser;
  faThumbsUpOutline = faThumbsUpOutline;
  faThumbsDownOutline = faThumbsDownOutline;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  loggedInUsername: string;
  showBelow = false;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  currentImageIndex = 0;
  translateX = 0;
  isFollowing: boolean = false;
  @ViewChild("imageContainer") imageContainer: ElementRef;
  @ViewChild("threeDotsWrapper", { static: false }) threeDotsRef!: ElementRef;

  constructor(
    private advertisementDetailsService: AdvertisementDetailsService,
    private router: Router,
    private shareService: ShareService,
    private jwtDecoderService: JwtDecoderService,
    private imageUrlGeneratorService: ImageUrlGenerationService,
    private engageService: EngageService
  ) {}

  hasValidImages: boolean = true;
  handleImageError(event: any): void {
    this.hasValidImages = false;
    event.target.classList.add("min-h-48");
  }

  ngOnInit(): void {
    const { remainingDays, remainingHours, isExpired } =
      this.advertisementDetailsService.calculateExpiry(
        this.eventDetails.offerExpiry
      );
    this.remainingDays = remainingDays;
    this.remainingHours = remainingHours;
    this.isExpired = isExpired;
    this.checkIfFollowing();
    this.loggedInUsername = this.jwtDecoderService.getUsername();
    this.eventDetails.profileImageUrl =
      this.imageUrlGeneratorService.generateImageUrl(
        this.eventDetails.profileImageUrl
      );
    this.eventDetails.imagePaths =
      this.imageUrlGeneratorService.generateImageUrls(
        this.eventDetails.imagePaths
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["eventDetails"] && changes["eventDetails"].currentValue) {
      this.checkIfFollowing();
    }
  }

  toggleFollow(): void {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoderService.getUsername() || "";
    const sourceUsername = userName || "currentUser";
    const targetUsername = this.eventDetails.username;
    if (this.isFollowing) {
      this.advertisementDetailsService
        .unfollowUser(sourceUsername, targetUsername)
        .subscribe({
          next: (response) => {
            console.log("Unfollowed successfully:", response);
            if (response.status === 200) {
              this.isFollowing = false;
              this.eventDetails.following = false;
              this.followStatusChanged.emit({
                username: targetUsername,
                isFollowing: false,
              });
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
              this.eventDetails.following = true;
              this.followStatusChanged.emit({
                username: targetUsername,
                isFollowing: true,
              });
            }
          },
          error: (error) => {
            console.error("Error following:", error);
          },
        });
    }
  }

  checkIfFollowing(): void {
    this.isFollowing = this.eventDetails.following;
  }

  navigateToProfile() {
    this.router.navigate([
      "/profile-screen/business-profile",
      this.eventDetails.username,
    ]);
  }

  showInsights(event: Event): void {
    this.setActiveIndex.emit(this.index);
    this.setInsightScreen.emit(event);
  }

  likePost(): void {
    const advertisementId = this.eventDetails.advertisementId;
    this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
      next: (response) => {
        this.triggerAnimation("like");
        const status = response.status;
        if (status == 201) {
          this.isLiked = true;
          this.isDisliked = false;
          this.eventDetails.likes += 1;
        } else if (status == 200) {
          this.isLiked = true;
          this.isDisliked = false;
          this.eventDetails.likes += 1;
          this.eventDetails.dislikes -= 1;
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
    const advertisementId = this.eventDetails.advertisementId;
    this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
      next: (response) => {
        this.triggerAnimation("dislike");
        const status = response.status;
        if (status === 201) {
          this.isDisliked = true;
          this.isLiked = false;
          this.eventDetails.dislikes += 1;
        } else if (status === 200) {
          this.isDisliked = true;
          this.isLiked = false;
          this.eventDetails.dislikes += 1;
          this.eventDetails.likes -= 1;
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
    const advertisementId = this.eventDetails.advertisementId;
    const username = this.jwtDecoderService.getUsername();
    const previousSavedState = this.isSaved;
    this.isSaved = !this.isSaved;
    this.triggerAnimation("save");
    this.scaleAnimation = true;

    setTimeout(() => {
      this.scaleAnimation = false;
    }, 500);

    this.advertisementDetailsService
      .savePost(username, advertisementId)
      .subscribe({
        next: (response) => {
          if (this.isSaved) {
            this.showSavedMessage = true;
            setTimeout(() => {
              this.showSavedMessage = false;
            }, 2000);
          }
        },
        error: (err) => {
          this.isSaved = previousSavedState;
          this.showError(
            "Save Error",
            "Failed to save/unsave the post. Please try again."
          );
        },
      });
  }

  toggleReportButton(): void {
    this.showReportButton = !this.showReportButton;
    if (this.showReportButton) {
      this.determinePopupPosition();
    }
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    const triggerPoint = 135;
    this.showBelow = window.scrollY < triggerPoint;
    if (this.showReportButton) {
      this.determinePopupPosition();
    }
  }

  determinePopupPosition(): void {
    if (!this.threeDotsRef) return;
    const rect = this.threeDotsRef.nativeElement.getBoundingClientRect();
    const safeTopLimit = 135;
    this.showBelow = rect.top < safeTopLimit;
  }

  getReportPopupStyle() {
    return this.showBelow
      ? { top: "2.5rem", bottom: "auto" }
      : { bottom: "2.5rem", top: "auto" };
  }

  sharePost() {
    this.shareService.shareContent(this.eventDetails);
  }

  reportPost(): void {
    this.advertisementDetailsService
      .reportPost(this.eventDetails.advertisementId)
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
    this.advertisementDetailsService
      .reportPost(this.eventDetails.advertisementId)
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
    this.showReportSuccess = false;
    document.body.style.overflow = "auto";
  }

  private triggerAnimation(type: "like" | "dislike" | "save") {
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

  showError(title: string, body: string) {
    this.popupTitle = title;
    this.popupBody = body;
    this.showPopup = true;
  }

  bookNow(): void {
    window.location.href = this.eventDetails.websiteLink;
  }

  showDetails(advertisementId: number): void {
    this.engageService.incrementEngagementCount(advertisementId);
    this.router.navigate([`${this.router.url}/offer-description`, advertisementId], {
      state: { offerData: this.eventDetails }
    });
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateTranslateX();
    }
  }

  nextImage() {
    if (
      this.eventDetails.imagePaths &&
      this.currentImageIndex < this.eventDetails.imagePaths.length - 1
    ) {
      this.currentImageIndex++;
      this.updateTranslateX();
    }
  }

  goToImage(index: number) {
    if (
      this.eventDetails.imagePaths &&
      index >= 0 &&
      index < this.eventDetails.imagePaths.length
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
}
