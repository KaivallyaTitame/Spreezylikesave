import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { DecodedToken } from "src/app/models/decodedToken";
import { JwtDecoderService } from "src/app/services/jwtDecoder/jwt-decoder.service";

export const loginGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken") || "";
  const router = inject(Router);

  function isTokenExpired(decodedToken: DecodedToken): boolean {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since the epoch
    return currentTime > decodedToken.exp;
  }

  const jwtDecoder = inject(JwtDecoderService);

  if (token) {
    const decodedInfoFromToken: DecodedToken =
      jwtDecoder.decodeInfoFromToken(token);
    const decodedInfoFromRefreshToken: DecodedToken =
      jwtDecoder.decodeInfoFromToken(refreshToken || "");
    console.log(decodedInfoFromRefreshToken);
    if (isTokenExpired(decodedInfoFromRefreshToken)) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      return true;
    }

    const userType = decodedInfoFromToken.userType;
    if (userType === "Consumer") router.navigate(["consumer-home/adfeed"]);
    else if (userType === "Business") router.navigate(["business-home/adfeed"]);
    else router.navigate(["consumer-home"]);
    return false;
  }

  return true;
};
