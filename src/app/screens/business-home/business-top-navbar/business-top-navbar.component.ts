import { Component } from '@angular/core';
import { faArrowRightFromBracket, faBars, faCircleQuestion, faDiceD20, faDiceD6, faFileLines, faFilePen, faGear, faMessage, faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-business-top-navbar',
  templateUrl: './business-top-navbar.component.html',
  styleUrls: [
'./business-top-navbar.component.css'
  ]
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
}
