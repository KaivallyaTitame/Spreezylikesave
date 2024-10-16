import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faBars, faCircleQuestion, faDiceD20, faDiceD6, faFileLines, faFilePen, faGear, faMessage, faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from 'firebase/auth';
import { UserProfileDto } from 'src/app/models/UserProfileDTO';
import { BusinessNavigationServiceService } from 'src/app/services/business-navigation-service.service';

@Component({
  selector: 'app-business-top-navbar',
  templateUrl: './business-top-navbar.component.html',
  styleUrls: ['./business-top-navbar.component.css']
})
export class BusinessTopNavbarComponent {
  faBars = faBars
  faSearch = faSearch
  faMessage = faMessage
  faGear = faGear
  faArrowRightFromBracket = faArrowRightFromBracket
  faCircleQuestion = faCircleQuestion 
  faFileLines = faFileLines
  faDiceD6 = faDiceD6
  faDiceD20 = faDiceD20
  faFilePen = faFilePen

  constructor(private router: Router) {} 

  navigateToSearch(): void {
    this.router.navigate(['business-home/search']); 
  }

  @Input() businessDetails!: UserProfileDto[];
  business: any;

  ngOnInit(): void {
    this.fetchBusinessDetails();
  }

  fetchBusinessDetails() {
    this.businessNavigationServiceService.getBusinessDetails().subscribe(
      (data: UserProfileDto[]) => {
        this.business = data;
        console.log('Business Details:', this.business);
      }
    );
}
}
