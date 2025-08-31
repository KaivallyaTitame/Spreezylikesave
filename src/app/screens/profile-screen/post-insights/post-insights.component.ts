import { Component, Input,Output, EventEmitter,HostListener,ElementRef, ViewChild} from '@angular/core';
import { faCoffee,faHeart,faThumbsDown, faLocationArrow,faBookmark,faUsers, faArrowTrendUp as faArrowTrendUp} from '@fortawesome/free-solid-svg-icons';
import { InsightDetails } from 'src/app/models/ad-details';

@Component({
  selector: 'app-post-insights',
  templateUrl: './post-insights.component.html',
  styleUrls: ['./post-insights.component.css']
})

export class PostInsightsComponent {
  @Input() showInsightScreen!: boolean;
  @Input() feed !: InsightDetails;   
  @Output() ClickOut = new EventEmitter<Event>();
  @ViewChild('childDiv') childDiv!: ElementRef;
 
  faCoffee = faCoffee;
  faHeart = faHeart;
  faThumbsDown = faThumbsDown;
  faLocationArrow = faLocationArrow;
  faBookmark = faBookmark; 
  faUsers = faUsers; 
  faHandshake=faArrowTrendUp;
  
  // when user clicked anywhere of the component then it will hide post insight component.  
  @HostListener('window:touchstart', ['$event'])
  @HostListener('window:click', ['$event'])
  onClickOutside(event: Event) {
    const clickedInside = this.childDiv.nativeElement.contains(event.target);
    if(clickedInside === true){
        return;
    }
    else if (this.childDiv && this.showInsightScreen && !clickedInside) {
      this.ClickOut.emit(event);
    }
  }


 

}
