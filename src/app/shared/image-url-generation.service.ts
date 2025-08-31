import { Injectable } from '@angular/core';
import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class ImageUrlGenerationService {

  baseUrl = API_CONFIG.IMAGE_URL
  constructor() { }

  generateImageUrl(imageUrl : string):string{
    return this.baseUrl + imageUrl
  }
  
  generateImageUrls(imageUrl : string[]) : string[] {
    let generatedImageUrls = []
    for (const url of imageUrl) {
      generatedImageUrls.push(this.baseUrl + url)
    }
    return generatedImageUrls
  }

}
