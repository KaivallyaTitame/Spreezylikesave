import { Component, ViewChild, ElementRef } from '@angular/core';
import { PresignedUrl } from 'src/app/models/presigned-url';
import { BackendService } from 'src/app/services/post-upload.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  imagesUploaded: boolean = false;
  username: string = 'user123'; 
  presignedUrls: string[] = [];

  constructor(private backendService: BackendService) { }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file: File) => {
        this.selectedFiles.push(file);
        this.createImagePreview(file);
      });
    }
  }

  uploadImages(): void {
    const fileNames = this.selectedFiles.map(file => file.name);
    this.backendService.getPresignedUrl(fileNames, this.username).subscribe({
      next: (presignedUrl: PresignedUrl) => {
        this.presignedUrls = presignedUrl.presignedUrls;
        this.selectedFiles.forEach((file, index) => {
          const url = this.presignedUrls[index];
          this.backendService.uploadToS3(file, url)
        });
        this.imagesUploaded = true;
      },
      error: (error: any) => {
        console.error('Error retrieving presigned URLs:', error);
      }
    });
  }

  private createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1); 
    this.selectedFiles.splice(index, 1);
  }
  
}
