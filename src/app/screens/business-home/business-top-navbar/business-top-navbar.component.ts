import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faBars, faCircleQuestion, faDiceD20, faDiceD6, faFileLines, faFilePen, faGear, faMessage, faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserProfileDTO } from 'src/app/models/UserProfileDTO';
import { BusinessNavigationServiceService } from 'src/app/services/business-navigation-service.service';

@Component({
  selector: 'app-business-top-navbar',
  templateUrl: './business-top-navbar.component.html',
  styleUrls: ['./business-top-navbar.component.css']
})
export class BusinessTopNavbarComponent implements OnInit {

  faBars = faBars;
  faSearch = faSearch;
  faMessage = faMessage;
  faGear = faGear;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faCircleQuestion = faCircleQuestion;
  faFileLines = faFileLines;
  faDiceD6 = faDiceD6;
  faDiceD20 = faDiceD20;
  faFilePen = faFilePen;

  business: any; 

  constructor(private router: Router, private businessNavigationServiceService: BusinessNavigationServiceService) { }

  ngOnInit(): void {
    this.fetchBusinessDetails();
  }

  navigateToSearch(): void {
    this.router.navigate(['business-home/search']);
  }

  fetchBusinessDetails() {
    this.businessNavigationServiceService.getBusinessDetails().subscribe({
      next: (data: UserProfileDTO[]) => {
        console.log('Raw Data:', data);

        if (data.length > 0) {
          this.business = data[0]; 
          console.log('Business Details:', this.business);
        } else {
          console.warn('No business details found.');
          this.business = {}; 
        }
      },
      error: (error) => {
        console.error('Failed to fetch business details', error);
        this.business = {}; 
      },
      complete: () => {
        console.log('Business information fetching completed');
      }
    });
  }
}