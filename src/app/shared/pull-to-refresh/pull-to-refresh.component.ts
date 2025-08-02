import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pull-to-refresh',
  templateUrl: './pull-to-refresh.component.html',
  styleUrls: ['./pull-to-refresh.component.css']
})
export class PullToRefreshComponent implements OnDestroy, AfterViewInit {
  @Input() isRefreshing: boolean = false;
  @Input() isLoadingMore: boolean = false;
  @Input() hasMoreData: boolean = true;
  @Input() maxPullDistance: number = 120;
  @Input() refreshThreshold: number = 60;
  @Input() resistance: number = 0.6;
  @Input() disabled: boolean = false;
  @Input() infiniteScrollThreshold: number = 200; 
  @Output() refresh = new EventEmitter<void>();
  @Output() loadMore = new EventEmitter<void>();
  
  @ViewChild('contentWrapper', { static: false }) contentWrapper!: ElementRef;

  isPulling: boolean = false;
  pullDistance: number = 0;
  
  private startY: number = 0;
  private currentY: number = 0;
  private isAtTop: boolean = false;
  private touchStarted: boolean = false;
  private lastTouchTime: number = 0;
  private scrollListener: any;

  ngAfterViewInit(): void {
    if (this.contentWrapper && this.contentWrapper.nativeElement) {
      this.scrollListener = this.onScroll.bind(this);
      this.contentWrapper.nativeElement.addEventListener('scroll', this.scrollListener);
    } else {
      console.error('contentWrapper not found');
    }
  }

  ngOnDestroy(): void {
    if (this.contentWrapper && this.contentWrapper.nativeElement && this.scrollListener) {
      this.contentWrapper.nativeElement.removeEventListener('scroll', this.scrollListener);
    }
  }

  onTouchStart(event: TouchEvent): void {
    if (this.isRefreshing || this.disabled) return;

    this.startY = event.touches[0].clientY;
    this.touchStarted = true;
    this.isAtTop = this.checkIfAtTop();
    this.lastTouchTime = Date.now();
    
    if (this.contentWrapper) {
      this.contentWrapper.nativeElement.classList.add('pulling');
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.touchStarted || this.isRefreshing || !this.isAtTop || this.disabled) return;

    this.currentY = event.touches[0].clientY;
    const deltaY = this.currentY - this.startY;
    const currentTime = Date.now();
    const timeDiff = currentTime - this.lastTouchTime;

    if (deltaY > 0) {
      event.preventDefault();
      this.pullDistance = Math.min(deltaY * this.resistance, this.maxPullDistance);
      this.isPulling = true;

      if (this.pullDistance >= this.refreshThreshold && timeDiff > 100) {
        this.triggerHapticFeedback();
        this.lastTouchTime = currentTime;
      }
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.touchStarted || this.isRefreshing || this.disabled) return;
    
    this.touchStarted = false;
    
    if (this.contentWrapper) {
      this.contentWrapper.nativeElement.classList.remove('pulling');
    }

    if (this.isPulling && this.pullDistance >= this.refreshThreshold) {
      this.triggerRefresh();
    } else {
      this.resetPullState();
    }
  }

  private checkIfAtTop(): boolean {
    if (!this.contentWrapper) return true;
    return this.contentWrapper.nativeElement.scrollTop <= 5;
  }

  private triggerRefresh(): void {
    this.isPulling = false;
    this.refresh.emit();
  }

  private resetPullState(): void {
    this.isPulling = false;
    this.pullDistance = 0;
  }

  private triggerHapticFeedback(): void {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
    if (navigator.vibrate) {
      navigator.vibrate([10]);
    }
  }

  getRefreshStatus(): string {
    if (this.isRefreshing) {
      return 'Refreshing content...';
    } else if (this.isPulling && this.pullDistance >= this.refreshThreshold) {
      return 'Release to refresh';
    } else if (this.isPulling) {
      return 'Pull down to refresh';
    }
    return 'Pull down to refresh';
  }

  manualRefresh(): void {
    if (!this.isRefreshing && !this.disabled) {
      this.triggerRefresh();
    }
  }

  private onScroll(event: Event): void {
    if (this.isLoadingMore || !this.hasMoreData || this.disabled) {
      return;
    }
    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    if (distanceFromBottom < this.infiniteScrollThreshold) {
      this.loadMore.emit();
    }
  }
}