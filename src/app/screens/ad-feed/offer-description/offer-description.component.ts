// import { Component, OnInit } from '@angular/core';
// import { AdvertisementDetailsService } from 'src/app/services/advertisementTypes.service';
// import { OfferDescriptionDTO } from 'src/app/models/offerdescriptionGet';
// import { faBars, faUserGroup, faMagnifyingGlass, faThumbsUp, faThumbsDown, faLocationArrow, faBookmark, faEllipsisVertical, faLocationDot, faHeart, faBell, faCircleUser } from '@fortawesome/free-solid-svg-icons';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-offer-description',
//   templateUrl: './offer-description.component.html',
//   styles: []
// })
// export class OfferDescriptionComponent implements OnInit {
//   offerData: OfferDescriptionDTO;
//   remainingDays: number;
//   isExpired: boolean = false;
//   reportVisible: boolean = false; // Property to control visibility of report modal
//   showReportButton: boolean = false;
//   dropdowns: { [key: string]: boolean } = {
//     howToAvail: false,
//     termsConditions: false
//   };

//   // FontAwesome icons
//   faBars = faBars;
//   faUserGroup = faUserGroup;
//   faMagnifyingGlass = faMagnifyingGlass;
//   faThumbsUp = faThumbsUp;
//   faThumbsDown = faThumbsDown;
//   faLocationArrow = faLocationArrow;
//   faBookmark = faBookmark;
//   faEllipsisVertical = faEllipsisVertical;
//   faLocationDot = faLocationDot;
//   faHeart = faHeart;
//   faBell = faBell;
//   faCircleUser = faCircleUser;


//   constructor(private AdvertisementDetailsService: AdvertisementDetailsService,private router: Router) {}

//   ngOnInit(): void {
//     // this.AdvertisementDetailsService.getOfferDescription().subscribe((data: OfferDescriptionDTO[]) => {
//     //   this.offerData = data;

//     //   // Calculate remaining days
//     //   const expiryDate = new Date(this.offerData.offerExpiry);
//     //   const currentDate = new Date();
//     //   const timeDiff = expiryDate.getTime() - currentDate.getTime();
//     //   this.remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert time difference to days

//     //   // Check if expired
//     //   if (this.remainingDays <= 0) {
//     //     this.isExpired = true;
//     //   }
//     // });
//   }



//   viewOnWebsite(): void {
//     window.location.href = 'https://www.example.com'; // Replace with your desired URL
//   }

//   toggleDropdown(key: string): void {
//     this.dropdowns[key] = !this.dropdowns[key];
//   }
//   showDetails() {
//     this.router.navigate(['/ad-feed/offer-description']); // Now using injected router
//   }

//   showReport() {
//     this.showReportButton = true; // Show the report button
//   }

//   confirmReport() {
//     this.reportVisible = true; // Show the confirmation message
//     this.showReportButton = false; // Hide the report button
//   }

//   done() {
//     this.reportVisible = false; // Hide the confirmation message
//     this.showReportButton = false; // Hide the report button
//   }
// }
