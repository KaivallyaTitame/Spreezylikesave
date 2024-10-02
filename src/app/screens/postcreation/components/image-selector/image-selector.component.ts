import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { PresignedUrl } from 'src/app/models/presigned-url';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { PostUploadService } from 'src/app/services/post-upload.service';

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
  maxImageCount: number = 2; 
  isUploadCompleted: boolean = false; 
  showPopUp: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';
  uploadImageCount:number=0;

  constructor(private postUpload: PostUploadService, private jwtDecoder: JwtDecoderService) {}

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
      const newFiles = Array.from(input.files);
      
      if (newFiles.length + this.selectedFiles.length > this.maxImageCount) {
        this.popUpTitle="Error!";
        this.popUpBody="You can upload maximum of 2 images only";
        this.showPopUp=true;
        return;
      }

      newFiles.forEach((file: File) => {
        if (!this.selectedFiles.some(f => f.name === file.name)) {
          this.selectedFiles.push(file);
          this.createImagePreview(file);
        }else{
          this.popUpTitle="Error!";
          this.popUpBody="Image is already selected";
          this.showPopUp=true;
        }
      });
    }
  }

  uploadImages(): void {
    if (this.isUploadCompleted) {
      this.popUpTitle="Error!";
      this.popUpBody="Maximum limit of uploading image have reached";
      this.showPopUp=true;
      return;
    }

    const fileNames = this.selectedFiles.map(file => file.name);

    this.postUpload.getPresignedUrl(fileNames, this.username).subscribe({
      next: (presignedUrl: PresignedUrl) => {
        console.log(presignedUrl);
        this.presignedUrls = presignedUrl.presignedUrls;

        this.postUpload.setGeneratedFileNames(presignedUrl.generatedFileNames);
        
        this.selectedFiles.forEach((file, index) => {
          const url = this.presignedUrls[index];
          this.postUpload.uploadToS3(file, url);
          this.popUpTitle = 'Sucess!';
          this.popUpBody = 'Sucessfully uploaded';
          this.showPopUp = true;
          this.uploadImageCount+=this.selectedFiles.length;
          if(this.uploadImageCount>this.maxImageCount){
            this.isUploadCompleted=true;
          }

        });
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

  onPopUpClose() {
    this.showPopUp = false; 
  }
}
