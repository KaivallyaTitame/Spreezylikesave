import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from 'src/app/models/decodedToken';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  decodeInfoFromToken(token: string) : DecodedToken{
    return jwtDecode<DecodedToken>(token);
  }
}