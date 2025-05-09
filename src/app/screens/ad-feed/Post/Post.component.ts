import { Component, HostListener, Input, OnInit } from '@angular/core';
import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown, faLocationArrow, faEllipsisVertical, faLocationDot, faBell, faCircleUser , faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline } from '@fortawesome/free-regular-svg-icons'; 
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as regularBookmark  } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { ElementRef, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-Post',
  templateUrl: './Post.component.html',
  styles: []
})
export class PostComponent implements OnInit {
  @Input() postDetails!: AdvertisementDetails;

  baseUrl = "";
  // baseUrl="https://images.spreezy.in/";
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
  popupTitle: string = 'Error';
  popupBody: string = '';
  faBars = faBars;
  faHeartSolid = faHeartSolid
  faHeartRegular = faHeartRegular;
  faPaperPlane = faPaperPlane;
  faUserGroup = faUserGroup;
  faMagnifyingGlass = faMagnifyingGlass;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faLocationArrow = faLocationArrow;
  solidBookmark = solidBookmark;
  regularBookmark = regularBookmark;
  faEllipsisVertical = faEllipsisVertical;
  faLocationDot = faLocationDot;
  faBell = faBell;
  faCircleUser = faCircleUser;
  faThumbsUpOutline = faThumbsUpOutline;
  faThumbsDownOutline = faThumbsDownOutline;
  isLiked: boolean = false;
  isDisliked: boolean = false;
  isFollowing: boolean = false;
  showBelow = false;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  currentImageIndex = 0;
  translateX = 0;
  @ViewChild('imageContainer') imageContainer: ElementRef;
  @ViewChild('threeDotsWrapper', { static: false }) threeDotsRef!: ElementRef;
  constructor(private advertisementDetailsService: AdvertisementDetailsService, private router: Router, private jwtDecoderService: JwtDecoderService) { }

  ngOnInit(): void {
    const { remainingDays, remainingHours, isExpired } = this.advertisementDetailsService.calculateExpiry(this.postDetails.offerExpiry);

    console.log("POST DETAILS", this.postDetails)

    this.remainingDays = remainingDays;
    this.remainingHours = remainingHours;
    this.isExpired = isExpired;
    this.checkIfFollowing();
  }

  toggleFollow(): void {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    const sourceUsername = userName || 'currentUser';  
    const targetUsername = this.postDetails.username;
    if (this.isFollowing) {
      this.advertisementDetailsService.unfollowUser(sourceUsername, targetUsername).subscribe(
        (response) => {
          console.log('Unfollowed successfully:', response);
          this.isFollowing = false;
        },
        (error) => {
          console.error('Error unfollowing:', error);
        }
      );
    } else {
      this.advertisementDetailsService.followUser(sourceUsername, targetUsername).subscribe(
        (response) => {
          console.log('Followed successfully:', response);
          this.isFollowing = true;
        },
        (error) => {
          console.error('Error following:', error);
        }
      );
    }
  }

  // Optionally, check if the user is already following
  checkIfFollowing(): void {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    const sourceUsername = userName || 'currentUser';
    const targetUsername = this.postDetails.username;
    // Check if the current user is following the post
    // This could involve a service method to check follow status.
    // For simplicity, we're assuming this logic is already in place.
    this.isFollowing = false;  // Replace this with actual check
  }

  likePost(): void {
    const advertisementId = this.postDetails.advertisementId;
    this.triggerAnimation('like');

    if (!this.isLiked) {
      this.isLiked = true;
      this.isDisliked = false;
      this.postDetails.likes += 1;

      this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.postDetails.likes += 1;
          this.postDetails.likes = updatedPost.likes;
        },
        error: (err) => {
          this.showError('Like Error', 'Failed to update likes. Please try again.');
        },
      });
    } else {
      this.isLiked = false;
      this.postDetails.likes -= 1;
      this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.postDetails.likes -= 1;
          this.postDetails.likes = updatedPost.likes;
        },
        error: (err) => {
          this.showError('Like Error', 'Failed to update likes. Please try again.');
        },
      });
    }
  }

  dislikePost(): void {
    const advertisementId = this.postDetails.advertisementId;
    this.triggerAnimation('dislike');

    if (!this.isDisliked) {
      this.isDisliked = true;
      this.isLiked = false;
      this.postDetails.dislikes += 1;

      this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.postDetails.dislikes += 1;
          this.postDetails.dislikes = updatedPost.dislikes;
        },
        error: (err) => {
          this.showError('Dislike Error', 'Failed to update dislikes. Please try again.');
        },
      });
    } else {
      this.isDisliked = false;
      this.postDetails.dislikes -= 1;
      this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.postDetails.dislikes -= 1;
          this.postDetails.dislikes = updatedPost.dislikes;
        },
        error: (err) => {
          this.showError('Dislike Error', 'Failed to update dislikes. Please try again.');
        },
      });
    }
  }

  savePost(): void {
    const advertisementId = this.postDetails.advertisementId;
    const username = this.postDetails.username;
    this.triggerAnimation('save');
    this.scaleAnimation = true;
    setTimeout(() => {
      this.scaleAnimation = false;
    }, 500);
    this.isSaved = !this.isSaved;
    this.advertisementDetailsService.savePost(username, advertisementId).subscribe({
      next: (response) => {
        console.log('Post saved successfully:', response);
      },
      error: (err) => {
        this.showError('Save Error', 'Failed to save the post. Please try again.');
        this.isSaved = !this.isSaved;
      },
    });
  }

  toggleReportButton(): void {
    this.showReportButton = !this.showReportButton;
    if (this.showReportButton) {
      this.determinePopupPosition();
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const triggerPoint = 135; 
    this.showBelow = window.scrollY < triggerPoint;
    if (this.showReportButton) {
      this.determinePopupPosition();
    }
  }

  sharePost(){}

  determinePopupPosition(): void {
    if (!this.threeDotsRef) return;
    const rect = this.threeDotsRef.nativeElement.getBoundingClientRect();
    const safeTopLimit = 135; 
    this.showBelow = rect.top < safeTopLimit;
  }

  getReportPopupStyle() {
    return this.showBelow
      ? { top: '2.5rem', bottom: 'auto' } 
      : { bottom: '2.5rem', top: 'auto' };
  }

  reportPost(): void {
    this.advertisementDetailsService.reportPost(this.postDetails.advertisementId).subscribe({
      next: (response) => {
        console.log('Post reported successfully:', response);
        this.showReportSuccess = true;
        this.showReportButton = false;
      },
      error: (err) => {
        this.showError('Report Error', 'Failed to Report the post. Please try again.');
      },
    });
    document.body.style.overflow = 'hidden';
  }

  hideReportSuccess(): void {
    this.showReportSuccess = false;
    document.body.style.overflow = 'auto';
  }

  showError(title: string, body: string) {
    this.popupTitle = title;
    this.popupBody = body;
    this.showPopup = true;
  }

  private triggerAnimation(type: 'like' | 'dislike' | 'save') {
    if (type === 'like') {
      this.showLikeAnimation = true;
    } else if (type === 'dislike') {
      this.showDislikeAnimation = true;
    }

    setTimeout(() => {
      this.showLikeAnimation = false;
      this.showDislikeAnimation = false;
    }, 500);
  }

  showDetails(advertisementId: number): void {
    this.router.navigate(['consumer-home/adfeed/offer-description', advertisementId], {
      queryParams: { data: JSON.stringify(this.postDetails) },
    })
  }


  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateTranslateX();
    }
  }
  
  nextImage() {
    if (this.postDetails.imagePaths && this.currentImageIndex < this.postDetails.imagePaths.length - 1) {
      this.currentImageIndex++;
      this.updateTranslateX();
    }
  }

  goToImage(index: number) {
    if (this.postDetails.imagePaths && index >= 0 && index < this.postDetails.imagePaths.length) {
      this.currentImageIndex = index;
      this.updateTranslateX();
    }
  }

  updateTranslateX() {
    const containerWidth = this.imageContainer?.nativeElement?.clientWidth || 0;
    this.translateX = -this.currentImageIndex * containerWidth;
  }

  @HostListener('window:resize')
  onResize() {
    this.updateTranslateX();
  }

  startX: number;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
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