import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  async shareContent(data : any) {
    try {
      await Share.share({
        title : data.advertisementType,
        text : JSON.stringify(data),
        url : "",
        dialogTitle: 'Share via'
      });
    } catch (error) {
      console.error('Error sharing', error);
    }
  }

  async shareItem(item: any) {
    const link = `https://yourapp.com/${item.advertisementType.toLowerCase()}/${item.advertisementId}`;

    await Share.share({
      title: `Check out this ${item.advertisementType}`,
      text: item.offerTitle + '\n' + item.description,
      url: link,
      dialogTitle: 'Share with others'
    });
  }
}
