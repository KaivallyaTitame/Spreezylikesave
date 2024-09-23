import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from 'src/app/models/decoded-token';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  constructor() { }

  decodeInfoFromToken(token: string): DecodedToken {
    const dummyDecodedToken: DecodedToken = {
      "User Type": "guest",
      Token_type: "Bearer",
      iss: "Spreezy",
      sub: "dummyUser",
      iat: Date.now() / 1000, 
      exp: Math.floor(Date.now() / 1000) + 3600 
    };

    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return dummyDecodedToken; 
    }
  }
}
