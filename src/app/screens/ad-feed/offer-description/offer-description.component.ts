import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown, faLocationArrow, faEllipsisVertical, faLocationDot, faHeart, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpOutline, faThumbsDown as faThumbsDownOutline } from '@fortawesome/free-regular-svg-icons'; 
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { ElementRef, ViewChild } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-offer-description',
  templateUrl: './offer-description.component.html',
  styles: []
})
export class OfferDescriptionComponent implements OnInit {
  offerData: AdvertisementDetails 
  dropdowns: { [key: string]: boolean } = {
    howToAvail: false,
    termsConditions: false
  };
  // baseUrl="https://images.spreezy.in/";
  baseUrl = "";

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
  @ViewChild('imageContainer') imageContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private advertisementDetailsService: AdvertisementDetailsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const advertisementId = this.route.snapshot.paramMap.get('advertisementId');
    this.route.queryParams.subscribe((params) => {
      if (params['data']) {
        let details = JSON.parse(params['data']);
        console.log("Received Details:", details);
        this.offerData = details
      }
    });
    if (this.offerData) {
      const expirationDate = new Date(this.offerData.offerExpiry);
      const today = new Date();
      this.remainingDays = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      this.isExpired = this.remainingDays <= 0;
    }
  }

  get offerDataSafe(): AdvertisementDetails {
    if (!this.offerData) {
      throw new Error('offerData is null');
    }
    return this.offerData;
  }

  toggleDropdown(key: string): void {
    this.dropdowns[key] = !this.dropdowns[key];
  }

  viewOnWebsite(): void {
    if (this.offerData && this.offerData.websiteLink) {
      window.open(this.offerData.websiteLink, '_blank');
    }
  }

  likePost(): void {
    const advertisementId = this.offerDataSafe.advertisementId; 
    this.triggerAnimation('like');
    if (!this.isLiked) {
      this.isLiked = true;
      this.isDisliked = false;
      this.offerDataSafe.likes += 1;
      this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.offerDataSafe.likes = updatedPost.likes;
        },
        error: (err) => {
          this.showError('Like Error', 'Failed to update likes. Please try again.');
        },
      });
    } else {
      this.isLiked = false;
      this.offerDataSafe.likes -= 1;
      this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.offerDataSafe.likes = updatedPost.likes;
        },
        error: (err) => {
          console.log(err)
          this.showError('Like Error', 'Failed to update likes. Please try again.');
        },
      });
    }
  }

  dislikePost(): void {
    const advertisementId = this.offerDataSafe.advertisementId; 
    this.triggerAnimation('dislike');
    if (!this.isDisliked) {
      this.isDisliked = true;
      this.isLiked = false;
      this.offerDataSafe.dislikes += 1;

      this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.offerDataSafe.dislikes = updatedPost.dislikes;
        },
        error: (err) => {
          console.log(err)
          this.showError('Dislike Error', 'Failed to update dislikes. Please try again.');
        },
      });
    } else {
      this.isDisliked = false;
      this.offerDataSafe.dislikes -= 1;
      this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
        next: (updatedPost) => {
          this.offerDataSafe.dislikes = updatedPost.dislikes;
        },
        error: (err) => {
          console.log(err)
          this.showError('Dislike Error', 'Failed to update dislikes. Please try again.');
        },
      });
    }
  }

  savePost(): void {
    const advertisementId = this.offerDataSafe.advertisementId; 
    const username = this.offerDataSafe.username;
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
  }

  reportPost(): void {
    this.advertisementDetailsService.reportPost(this.offerData.advertisementId).subscribe({
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
  
  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateTranslateX();
    }
  }

  // Navigate to next image
  nextImage() {
    if (this.offerData.imagePaths && this.currentImageIndex < this.offerData.imagePaths.length - 1) {
      this.currentImageIndex++;
      this.updateTranslateX();
    }
  }

  goToImage(index: number) {
    if (this.offerData.imagePaths && index >= 0 && index < this.offerData.imagePaths.length) {
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