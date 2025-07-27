// src/app/components/report-post/report-post.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-post',
  templateUrl: './report-post.component.html',
  styleUrls: []
})
export class ReportPostComponent {
  @Input() reportVisible: boolean = false; // Ensure this is correctly defined
  confirmationVisible: boolean = false;

  confirmReport() {
    this.reportVisible = false;
    this.confirmationVisible = true;
  }

  done() {
    this.confirmationVisible = false;
  }
}
