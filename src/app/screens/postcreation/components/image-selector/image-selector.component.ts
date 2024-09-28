import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { PresignedUrl } from 'src/app/models/presigned-url';
import { postUpload } from 'src/app/services/post-upload.service';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  imagePreviews: string[] = [];
  selectedFiles: File[] = [];
  username: string = '';  
  presignedUrls: string[] = [];

  constructor(private postUpload: postUpload, private jwtDecoder: JwtDecoderService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decodedInfo = token ? this.jwtDecoder.decodeInfoFromToken(token) : this.jwtDecoder.decodeInfoFromToken('');
      this.username = decodedInfo['sub'];
  }

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

    this.postUpload.getPresignedUrl(fileNames, this.username).subscribe({
      next: (presignedUrl: PresignedUrl) => {
        this.presignedUrls = presignedUrl.presignedUrls;

        this.postUpload.setGeneratedFileNames(presignedUrl.generatedFileNames);
        
        this.selectedFiles.forEach((file, index) => {
          const url = this.presignedUrls[index];
          this.postUpload.uploadToS3(file, url);
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

  private updateUploadButtonState(): void {
    this.isUploadDisabled = this.selectedFiles.length === 0 || this.selectedFiles.length > this.maxImageCount || this.isUploadCompleted;
  } 
}
