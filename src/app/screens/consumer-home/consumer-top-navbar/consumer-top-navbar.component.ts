import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faBars, faCircleQuestion, faFileLines, faFilePen, faGear, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ConsumerNavigationService } from 'src/app/services/consumer-navigation.service';
import { UserProfileDTO } from 'src/app/models/UserProfileDTO';

@Component({
  selector: 'app-consumer-top-navbar',
  templateUrl: './consumer-top-navbar.component.html',
  styleUrls: ['./consumer-top-navbar.component.css']
})
export class ConsumerTopNavbarComponent implements OnInit {
  faIcons = {
    bars: faBars,
    search: faSearch,
    gear: faGear,
    filePen: faFilePen,
    fileLines: faFileLines,
    circleQuestion: faCircleQuestion,
    arrowRightFromBracket: faArrowRightFromBracket
  };

  consumer: any;  

  constructor(private router: Router, private consumernavigationservice: ConsumerNavigationService) {}

  ngOnInit(): void {
    this.fetchConsumerInformation();
  }

  fetchConsumerInformation() {
    this.consumernavigationservice.getConsumerDetails().subscribe({
      next: (data: UserProfileDTO[]) => {
        console.log('Raw Data:', data); 
  
        if (data.length > 0) {
          this.consumer = data[0];  
          console.log('Consumer Details:', this.consumer);
        } else {
          console.warn('No Consumer details found.');
          this.consumer = {};  
        }
      },
      error: (error) => {
        console.error('Failed to fetch Consumer details', error);
        this.consumer = {}; 
      },
      complete: () => {
        console.log('Consumer information fetching completed');
      }
    });
  }
}