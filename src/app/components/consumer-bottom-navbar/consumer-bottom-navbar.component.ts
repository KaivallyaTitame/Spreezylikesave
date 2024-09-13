import { Component } from '@angular/core';
import { faSearch, faBell, faHome, faUser, faCircleUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consumer-bottom-navbar',
  templateUrl: './consumer-bottom-navbar.component.html',
  styles: []
})
export class ConsumerBottomNavbarComponent {
  faHome = faHome
  faSearch = faSearch
  faBell = faBell
  faUser = faUser
  faCircleUser = faCircleUser
}
