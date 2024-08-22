import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from 'src/app/models/decodedToken';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  decodeInfoFromToken(token: string) : DecodedToken{
<<<<<<< HEAD
    return jwtDecode<DecodedToken>(token);
  }
}
=======

    return jwtDecode<DecodedToken>(token);

  }
}
>>>>>>> 20f3341 (login functinality is working)
