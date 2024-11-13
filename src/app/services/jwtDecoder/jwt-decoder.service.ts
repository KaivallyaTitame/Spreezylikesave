import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from 'src/app/models/decodedToken';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  decodeInfoFromToken(token: string) : DecodedToken{
    try{
      return jwtDecode<DecodedToken>(token);
    }
    catch(error){
      throw new Error("Error while decoding token");
    }
  }
}