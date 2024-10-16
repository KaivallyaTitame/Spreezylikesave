import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faBars, faCircleQuestion, faFileLines, faFilePen, faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ConsumerNavigationService } from 'src/app/services/consumer-navigation.service';
import { UserProfileDto } from 'src/app/models/UserProfileDTO';

@Component({
  selector: 'app-consumer-top-navbar',
  templateUrl: './consumer-top-navbar.component.html',
  styleUrls: ['./consumer-top-navbar.component.css']
})
export class ConsumerTopNavbarComponent {
<<<<<<< HEAD
  faBars = faBars;
  faSearch = faSearch;
  faMessage = faMessage;
  faGear = faGear;
  faFilePen = faFilePen;
  faDiceD20 = faDiceD20;
  faCircleQuestion = faCircleQuestion;
  faFileLines = faFileLines;
  faArrowRightFromBracket = faArrowRightFromBracket;
<<<<<<< HEAD

  toggleSidebar() {
    const consumerTopNavbar = document.querySelector('.consumer-top-navbar') as HTMLElement;
    const bottomNavbar = document.querySelector('#bottom-navbar') as HTMLElement;

    if (consumerTopNavbar) {
      consumerTopNavbar.classList.toggle('drawer-open'); // Change this to the appropriate class for showing/hiding the top navbar
    }

<<<<<<< HEAD
  ngOnInit(): void {
    this.fetchConsumerInformation();
  }

  fetchConsumerInformation() {
    this.consumernavigationservice.getConsumerDetails().subscribe({
      next: (data: UserProfileDTO[]) => {
        if (data.length > 0) {
          this.consumer = data[0];
        } else {
          this.consumer = {};
        }
      },
      error: () => {
        this.consumer = {};
      }
    });
=======
    if (bottomNavbar) {
      bottomNavbar.classList.toggle('bottom-navbar-shifted');
    }
>>>>>>> a3409d9 (improved folder and file structure, edited names of consumer and business navigation bars)
  }
=======
>>>>>>> 526736d (Business and consumer navigation bar working)
}
=======
  faIcons = {
    bars: faBars,
    search: faSearch,
    gear: faGear,
    filePen: faFilePen,
    fileLines: faFileLines,
    circleQuestion: faCircleQuestion,
    arrowRightFromBracket: faArrowRightFromBracket,
  };

  constructor(private router: Router, private consumernavigationservice: ConsumerNavigationService ) {}

  @Input() userinformation!: UserProfileDto[];
  user: any;

  ngOnInit(): void{
    this.fetchUserInformation();
  }

  fetchUserInformation() {
    this.consumernavigationservice.getUserDetails().subscribe(
      (data: UserProfileDto[]) => {
        this.user = data;
        console.log('Consumer Details:', this.user);

      }
    );
  }
}
>>>>>>> 9a99b50 (Corrected Routes for consumer-home and business-home)
