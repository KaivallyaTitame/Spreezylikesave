import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PresignedUrl } from 'src/app/models/presigned-url';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-component.component.html',
  styleUrls: ['./image-component.component.css']
})
export class ImageComponentComponent implements OnInit {
  @Input() imageFileName: string | null = null;
  @Output() fileUploadSuccess: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  imagePreviews: string[] = [];
  selectedFiles: File[] = []; 
  username: string = '';
  presignedUrls: string[] = [];
  isUploadCompleted: boolean = false; 
  showPopUp: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';
  showButton: boolean = false;
  currentProfilePhotoUrl: string | null = null;
  defaultProfileImage: string = 'assets/default-pic.png';

  constructor(private settingsService: SettingsService, private jwtDecoder: JwtDecoderService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decodedInfo = token ? this.jwtDecoder.decodeInfoFromToken(token) : this.jwtDecoder.decodeInfoFromToken('');
    this.username = decodedInfo['sub'];

    if (this.imageFileName) {
      this.settingsService.getImageLink(this.username, this.imageFileName).subscribe({
        next: (imageLink: string) => {
          this.currentProfilePhotoUrl = imageLink;
          this.createImagePreviewFromLink(imageLink);
        },
        error: (err) => {
          this.setDefaultImage();
          throw(err);
        }
      });
    } else {
      this.setDefaultImage();
    }
  }

  private setDefaultImage(): void {
    this.imagePreviews = [this.defaultProfileImage];
    this.currentProfilePhotoUrl = this.defaultProfileImage;
  }

  private createImagePreviewFromLink(imageLink: string): void {
    this.imagePreviews.push(imageLink);
  }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
    this.imagePreviews = []; 
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      newFiles.forEach((file: File) => {
        this.selectedFiles.push(file); 
        this.createImagePreview(file); 
      });
    }
    this.showButton = true;
  }

  uploadImages(): void {
    if (this.isUploadCompleted) {
      this.popUpTitle = "Error!";
      this.popUpBody = "Image upload limit reached. Only one image can be uploaded.";
      this.showPopUp = true;
      return;
    }

    const fileNames = this.selectedFiles.map(file => file.name);

    this.settingsService.getPresignedUrl(fileNames, this.username).subscribe({
      next: (presignedUrl: PresignedUrl) => {
        this.presignedUrls = presignedUrl.presignedUrls;
        this.settingsService.setGeneratedFileNames(presignedUrl.generatedFileNames);

        this.selectedFiles.forEach((file, index) => {
          const url = this.presignedUrls[index];
          this.settingsService.uploadToS3(file, url).subscribe({
            next: () => {
              const uploadedFileName = presignedUrl.generatedFileNames[index];
              this.fileUploadSuccess.emit(uploadedFileName); 
              this.popUpTitle = 'Success!';
              this.popUpBody = 'Successfully uploaded';
              this.showPopUp = true;
              this.isUploadCompleted = true;
            },
            error: (error: any) => {
              console.error('Error uploading image:', error);
            }
          });
        });
      },
      error: (error: any) => {
        console.error('Error retrieving presigned URLs:', error);
      }
    });

    this.isUploadCompleted = true;
  }

  private createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onPopUpClose(): void {
    this.showPopUp = false;
  }
}
