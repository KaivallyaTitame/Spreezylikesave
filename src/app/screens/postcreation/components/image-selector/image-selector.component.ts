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
  username: string = 'user123'; 
  presignedUrls: string[] = [];
  maxImageCount: number = 2; 
  isUploadDisabled: boolean = true; 
  isUploadCompleted: boolean = false; 

  constructor(private backendService: BackendService) { }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const newFiles = Array.from(input.files);
      
      if (newFiles.length + this.selectedFiles.length > this.maxImageCount) {
        alert(`You can only upload a total of ${this.maxImageCount} images.`);
        return;
      }

      newFiles.forEach((file: File) => {
        if (!this.selectedFiles.some(f => f.name === file.name)) {
          this.selectedFiles.push(file);
          this.createImagePreview(file);
        }
      });

      this.updateUploadButtonState();
    }
  }

  uploadImages(): void {
    if (this.isUploadCompleted) {
      alert('Images have already been uploaded.');
      return;
    }

    const fileNames = this.selectedFiles.map(file => file.name);
    this.backendService.getPresignedUrl(fileNames, this.username).subscribe({
      next: (presignedUrl: PresignedUrl) => {
        console.log(presignedUrl);
        this.presignedUrls = presignedUrl.presignedUrls;

        this.backendService.setGeneratedFileNames(presignedUrl.generatedFileNames);
        
        this.selectedFiles.forEach((file, index) => {
          const url = this.presignedUrls[index];
          this.backendService.uploadToS3(file, url);
        });

        this.isUploadCompleted = true;
        this.selectedFiles = [];
        this.imagePreviews = [];
        this.isUploadDisabled = true;
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

    this.updateUploadButtonState();
  }

  private updateUploadButtonState(): void {
    this.isUploadDisabled = this.selectedFiles.length === 0 || this.selectedFiles.length > this.maxImageCount || this.isUploadCompleted;
  }
}
