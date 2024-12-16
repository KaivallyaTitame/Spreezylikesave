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
  faIcons = {
    bars: faBars,
    search: faSearch,
    gear: faGear,
    arrowRightFromBracket: faArrowRightFromBracket,
    circleQuestion: faCircleQuestion,
    fileLines: faFileLines,
    filePen: faFilePen,
  };

  business: any;

  constructor(
    private router: Router,
    private businessNavigationService: BusinessNavigationService
  ) { }

  ngOnInit(): void {
    this.fetchBusinessDetails();
  }

  navigateToSettings(drawerLeft: HTMLInputElement): void {
    drawerLeft.checked = false;
    this.router.navigate(['business-home/settings']);
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
      error: () => {
        this.business = {};
      }
    });
  }
}
