import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtDecoderService } from 'src/app/services/jwt-decoder.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-aadhar-pan-image',
  templateUrl: './aadhar-pan-image.component.html',
  styleUrls: ['./aadhar-pan-image.component.css']
})
export class AadharPanImageComponent {
  form: FormGroup;
  selectedFiles: File[] = [];
  presignedUrls: string[] = [];
  tempusername: string = 'alice_biz04'; 
  isUploadCompleted: boolean = false;
  popUpTitle: string = '';
  popUpBody: string = '';
  showPopUp: boolean = false;
  username:string='';

  @Output() fileUpload = new EventEmitter<string>();
  constructor(private settingsService: SettingsService,private jwtDecoder: JwtDecoderService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decodedInfo = token ? this.jwtDecoder.decodeInfoFromToken(token) : this.jwtDecoder.decodeInfoFromToken('');
    this.username = decodedInfo['sub'];
  }

  onFileSelected(event: any) {
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files);
      const fileNames = this.selectedFiles.map(file => file.name);

      this.settingsService.getPresignedUrl(fileNames, this.tempusername).subscribe({
        next: (presignedUrl: any) => {
          console.log(presignedUrl);
          this.presignedUrls = presignedUrl.presignedUrls;
          this.selectedFiles.forEach((file, index) => {
            const url = this.presignedUrls[index];
            console.log('Uploading file:', file.name, 'to URL:', url);

            this.settingsService.uploadToS3(file, url).subscribe({
              next: () => {
                const uploadedFileName = presignedUrl.generatedFileNames[index];
                this.fileUpload.emit(uploadedFileName); 
                this.popUpTitle = 'Success!';
                this.popUpBody = 'Successfully uploaded ' + uploadedFileName;
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
    }
  }
}
