import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faBars, faCircleQuestion, faFileLines, faFilePen, faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import { BusinessNavigationService } from 'src/app/services/business-navigation.service';

@Component({
  selector: 'app-business-top-navbar',
  templateUrl: './business-top-navbar.component.html',
  styleUrls: ['./business-top-navbar.component.css']
})
export class BusinessTopNavbarComponent implements OnInit {

  faBars = faBars;
  faSearch = faSearch;
  faGear = faGear;
  faArrowRightFromBracket = faArrowRightFromBracket;
  faCircleQuestion = faCircleQuestion;
  faFileLines = faFileLines;
  faFilePen = faFilePen;

  business: any;

  constructor(private router: Router, private businessNavigationService: BusinessNavigationService) { }

  ngOnInit(): void {
    this.fetchBusinessDetails();
  }

  navigateToSettings(drawerLeft: HTMLInputElement): void {
    drawerLeft.checked = false;
    this.router.navigate(['business-home/settings']);
  }

  navigateToSearch(): void {
    this.router.navigate(['business-home/search']);
  }

  fetchBusinessDetails() {
    this.businessNavigationService.getBusinessDetails().subscribe({
      next: (data: any[]) => {
        if (data.length > 0) {
          this.business = data[0];
        } else {
          this.business = {};
        }
      },
      error: (error: any) => {
        this.business = {};
      }
    });
  }
}
