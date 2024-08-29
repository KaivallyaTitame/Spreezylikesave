import { Component, ViewChild, ElementRef } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  imagePreviews: string[] = [];
  imagesUploaded: boolean = false;
  username: string = 'user123'; 
  presignedUrl:string="";

  constructor(private backendService: BackendService) { }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileName = [file.name]; 
      this.imagePreviews = [];
      this.createImagePreview(file);
      this.presignedUrl=this.backendService.getPresignedUrl(fileName, this.username);
      console.log(this.presignedUrl);
      this.backendService.uploadToS3(file,this.presignedUrl);
    }
  }

  private createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}