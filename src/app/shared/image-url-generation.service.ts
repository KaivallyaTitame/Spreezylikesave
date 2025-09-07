import { Injectable } from '@angular/core';
import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class ImageUrlGenerationService {

  baseUrl = API_CONFIG.IMAGE_URL
  constructor() { }

  generateImageUrl(imageUrl : string):string{
    if(!imageUrl.includes(this.baseUrl)) {
      return this.baseUrl + imageUrl
    }
    return imageUrl;
  }
  
  generateImageUrls(imageUrl : string[]) : string[] {
    let generatedImageUrls = []
    for (const url of imageUrl) {
      generatedImageUrls.push(url.includes(this.baseUrl) ? url : this.baseUrl + url)
    }
    return generatedImageUrls
  }

}
