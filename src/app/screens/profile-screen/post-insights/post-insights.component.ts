import { Component, Input,Output, EventEmitter,HostListener,ElementRef, ViewChild} from '@angular/core';
import { faCoffee,faHeart,faLocationArrow,faBookmark,faUsers,faHandshake} from '@fortawesome/free-solid-svg-icons';
import { insightDetails } from 'src/app/models/ad-details';

@Component({
  selector: 'app-post-insights',
  templateUrl: './post-insights.component.html',
  styleUrls: ['./post-insights.component.css']
})

export class PostInsightsComponent {
  @Input() showInsightScreen!: boolean; // boolean variable used to show the insights of the post. 
  @Input() feed !: insightDetails; // data which will be shown on component.  
  @Output() ClickOut = new EventEmitter<Event>(); // executed when we clicked on outside of component
  @ViewChild('childDiv') childDiv!: ElementRef;
  
  // when user clicked anywhere of the component then it will hide post insight component.  
  @HostListener('window:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInside = this.childDiv.nativeElement.contains(event.target);
    if (this.childDiv && this.showInsightScreen && !clickedInside) {
      this.ClickOut.emit(event);
    }
  }


  faCoffee = faCoffee;
  faHeart = faHeart; 
  faLocationArrow = faLocationArrow;
  faBookmark = faBookmark; 
  faUsers = faUsers; 
  faHandshake=faHandshake;


 

}
