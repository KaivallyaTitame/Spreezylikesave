import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'; // Import the type
import { faBookmark as faBookmarkRegular, faThumbsDown as faThumbsDownOutline, faThumbsUp as faThumbsUpOutline, faBookmark as regularBookmark, faBookmark as solidBookmark, } from '@fortawesome/free-regular-svg-icons'; // Import outlined icons
import { faBars, faBell, faBookmark, faChevronLeft, faChevronRight, faCircleUser, faEllipsisVertical, faHeart, faLocationArrow, faLocationDot, faMagnifyingGlass, faPaperPlane, faThumbsDown, faThumbsUp, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { API_CONFIG } from 'src/app/api-config';
import { AdvertisementDetails } from 'src/app/models/ad-details';
import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
import { ShareAddService } from 'src/app/services/share-add.service';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';

@Component({
  selector: 'app-Coupon',
  templateUrl: './Coupon.component.html',
  styles: []
})
export class CouponComponent implements OnInit {
  @Input() couponDetails!: AdvertisementDetails;
  // baseUrl="https://images.spreezy.in/";
  baseUrl=""; 
  @Input() index!: number; 
  @Input() activeIndex!: number | undefined; 
  @Output() setActiveIndex = new EventEmitter<number>();  
  @Output() setInsightScreen = new EventEmitter<Event>();
  @Input() showButton !:boolean; 
  remainingDays: number;
  isExpired: boolean = false;
  reportVisible: boolean = false;
  showReportButton: boolean = false;
  remainingHours: number;
  scaleAnimation: boolean = false; 
  showLikeAnimation: boolean = false; 
  showDislikeAnimation: boolean = false;
  isSaved: boolean = false; 
  showSavedMessage: boolean = false; 
  copyButtonText: string = 'Copy';
  showReportSuccess: boolean = false; 
  showPopup: boolean = false;
  popupTitle: string = 'Error';
  popupBody: string = '';
  faBars: IconDefinition = faBars;
  faUserGroup: IconDefinition = faUserGroup;
  solidBookmark: IconDefinition = solidBookmark; 
  regularBookmark: IconDefinition = regularBookmark; 
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faThumbsUp: IconDefinition = faThumbsUp;
  faThumbsDown: IconDefinition = faThumbsDown;
  faLocationArrow: IconDefinition = faLocationArrow;
  faEllipsisVertical: IconDefinition = faEllipsisVertical;
  faLocationDot: IconDefinition = faLocationDot;
  faHeart: IconDefinition = faHeart;
  faBell: IconDefinition = faBell;
  faBookmark : IconDefinition = faBookmark;
  faBookmarkRegular : IconDefinition = faBookmarkRegular;
  faCircleUser : IconDefinition = faCircleUser;
  faPaperPlane : IconDefinition = faPaperPlane;
  showBelow = false;
  isFollowing: boolean = false;
  faThumbsUpOutline: IconDefinition = faThumbsUpOutline;
  faThumbsDownOutline: IconDefinition = faThumbsDownOutline;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  currentImageIndex = 0;
  translateX = 0;
  @ViewChild('imageContainer') imageContainer: ElementRef;
  @ViewChild('threeDotsWrapper', { static: false }) threeDotsRef!: ElementRef;
  isLiked: boolean = false; 
  isDisliked: boolean = false; 
  constructor(private advertisementDetailsService: AdvertisementDetailsService,private router:Router , private shareService : ShareAddService,private jwtDecoderService: JwtDecoderService ) {}

  hasValidImages: boolean = true;
  handleImageError(event: any): void {
    this.hasValidImages = false;
    event.target.classList.add('min-h-48');
  }

  ngOnInit(): void {
    try {
      const { remainingDays, remainingHours, isExpired } = this.advertisementDetailsService.calculateExpiry(this.couponDetails.offerExpiry);
      this.remainingDays = remainingDays;
      this.remainingHours = remainingHours;
      this.isExpired = isExpired;
    } catch (error) {
      console.error('Error calculating expiry:', error);
    }
  }
  
  toggleFollow(): void {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    const sourceUsername = userName || 'currentUser';  
    const targetUsername = this.couponDetails.username;
    if (this.isFollowing) {
      this.advertisementDetailsService.unfollowUser(sourceUsername, targetUsername).subscribe({
        next : (response) => {
          console.log('Unfollowed successfully:', response);
          this.isFollowing = true;
        },
        error: (error) => {
          console.error('Error unfollowing:', error);
        }
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

  checkIfFollowing(): void {
    let token = localStorage.getItem("token") || "";
    let userName = this.jwtDecoderService.decodeInfoFromToken(token)["sub"] || "";
    const sourceUsername = userName || 'currentUser';
    const targetUsername = this.couponDetails.username;
    // Check if the current user is following the post
    // This could involve a service method to check follow status.
    // For simplicity, we're assuming this logic is already in place.
    this.isFollowing = false;  // Replace this with actual check
  }

  sharePost(){
    this.shareService.shareContent(this.couponDetails);
  }

  navigateToProfile(){
    console.log(this.router.url)
    if(this.router.url == "/business-home/adfeed"){
      this.router.navigate(['/profile-screen/business-profile',this.couponDetails.username])
    }else{
      this.router.navigate(['/profile-screen/consumer-profile',this.couponDetails.username])
    }
  }
  
  showInsights(event: Event) : void{
    this.setActiveIndex.emit(this.index); 
    this.setInsightScreen.emit(event);
  }

  likePost(): void {
    const advertisementId = this.couponDetails.advertisementId;
    this.advertisementDetailsService.updateLikes(advertisementId).subscribe({
      next: (response) => {
        this.triggerAnimation('like');
        const status = response.status;
        if (status == 201) {
          this.isLiked = true;
          this.isDisliked = false;
          this.couponDetails.likes += 1;
        } else if (status == 200) {
          this.isLiked = true;
          this.isDisliked = false;
          this.couponDetails.likes += 1;
          this.couponDetails.dislikes -= 1;
        } 
      },
      error: (error) => {
        console.log(error.status)
        if(error.status == 409){
          this.isLiked = true,
          this.isDisliked = false
        }else{
          this.showError('Like Error', 'Failed to update likes. Please try again.');
        }
      },
    });
  }
  
  dislikePost(): void {
    const advertisementId = this.couponDetails.advertisementId;
    this.advertisementDetailsService.updateDislikes(advertisementId).subscribe({
      next: (response) => {
        this.triggerAnimation('dislike');
        const status = response.status;
        if (status === 201) {
          this.isDisliked = true;
          this.isLiked = false;
          this.couponDetails.dislikes += 1;
        } else if (status === 200) {
          this.isDisliked = true;
          this.isLiked = false;
          this.couponDetails.dislikes += 1;
          this.couponDetails.likes -= 1;
        } 
      },
      error: (error) => {
        console.log(error.status)
        if (error.status === 409) {
          this.isDisliked = true;
          this.isLiked = false;
        }else{
          this.showError('Dislike Error', 'Failed to update dislike. Please try again.');
        }
      },
    });
  }

  savePost(): void {
    const advertisementId = this.couponDetails.advertisementId;
    const username = this.couponDetails.username;
    this.triggerAnimation('save');
    this.scaleAnimation = true;
    this.scaleAnimation = true;
    setTimeout(() => {
      this.scaleAnimation = false;
      this.scaleAnimation = false;
    }, 500);
    this.isSaved = !this.isSaved; 
    this.isSaved = !this.isSaved; 
    this.advertisementDetailsService.savePost(username, advertisementId).subscribe({
      next: (response) => {
      },
      error: (err) => {
        this.showError('Save Error', 'Failed to save the post. Please try again.');
        this.isSaved = !this.isSaved; 
        this.isSaved = !this.isSaved; 
      },
    });
  }

  copyToClipboard(couponCode: string): void {
    console.log(this.couponDetails)
    console.log(couponCode)
    console.log(this.couponDetails)
    console.log(couponCode)
    navigator.clipboard.writeText(couponCode).then(() => {
      this.copyButtonText = 'Copied';
      setTimeout(() => {
        this.copyButtonText = 'Copy';
      }, 2000);
    }).catch(err => {
      this.showError('Copy Error', 'Failed to copy coupon code. Please try again.');
    });
  }

  showError(title: string, body: string) {
    this.popupTitle = title;
    this.popupBody = body;
    this.showPopup = true;
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
    this.advertisementDetailsService.reportPost(this.couponDetails.advertisementId).subscribe({
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
    this.router.navigate([`${this.router.url}/offer-description` , advertisementId ] ,  {
      queryParams: { data: JSON.stringify(this.couponDetails) },
    });
  }

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.updateTranslateX();
    }
  }
  
  nextImage() {
    if (this.couponDetails.imagePaths && this.currentImageIndex < this.couponDetails.imagePaths.length - 1) {
      this.currentImageIndex++;
      this.updateTranslateX();
    }
  }
  
  goToImage(index: number) {
    if (this.couponDetails.imagePaths && index >= 0 && index < this.couponDetails.imagePaths.length) {
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