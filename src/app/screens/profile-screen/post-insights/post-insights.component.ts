import { Component, Input, SimpleChanges,Output, EventEmitter,HostListener,ElementRef, ViewChild} from '@angular/core';
import { faCoffee,faHeart,faLocationArrow,faBookmark,faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-insights',
  templateUrl: './post-insights.component.html',
  styleUrls: ['./post-insights.component.css']
})

export class PostInsightsComponent {
  @Input() showInsightScreen!: boolean; 
  @Input() likes!: number | undefined; 
  @Input() shares!: number | undefined; 
  @Input() engagement!: number | undefined; 
  @Input() comments !: number | undefined; 
  @Output() ClickOut = new EventEmitter<Event>(); 
  @ViewChild('childDiv') childDiv!: ElementRef;


  @HostListener('document:click', ['$event'])
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


  ngOnInit(): void {
  }

}
