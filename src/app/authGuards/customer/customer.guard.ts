import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { DecodedToken } from "src/app/models/decodedToken";
import { AuthService } from "src/app/services/auth.service";
import { JwtDecoderService } from "src/app/services/jwtDecoder/jwt-decoder.service";

export const customerGuard: CanActivateFn = (route, state) => {
  console.log("in customer guard");
  const router = inject(Router);
  const jwtDecoder = inject(JwtDecoderService);
  const authService = inject(AuthService);
  const token = localStorage.getItem("token") || "";
  const refreshToken = localStorage.getItem("refreshToken") || "";

  function isTokenExpired(decodedToken: DecodedToken): boolean {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds since the epoch
    return currentTime > decodedToken.exp;
  }

  if (token) {
    let decodedInfoFromAccessToken: DecodedToken =
      jwtDecoder.decodeInfoFromToken(token);
    const decodedInfoFromRefreshToken =
      jwtDecoder.decodeInfoFromToken(refreshToken);
    if (isTokenExpired(decodedInfoFromAccessToken)) {
      if (isTokenExpired(decodedInfoFromRefreshToken) || refreshToken == "") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        router.navigate(["/login"]);
        return false;
      } else {
        authService.recycleTokenUsingRefreshToken(refreshToken).subscribe({
          next: (response) => {
            const token = response.accessToken;
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", response.refreshToken);
            decodedInfoFromAccessToken = jwtDecoder.decodeInfoFromToken(token);
            window.location.reload();
          },
          error: (error) => {
            alert(
              error?.error?.errorDescription ||
                "Internal server error please try again later"
            );
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            router.navigate(["/login"]);
            return false;
          },
        });
      }
    }
    const userType = decodedInfoFromAccessToken.userType;

    if (userType === "Consumer") return true;
  }
  router.navigate(["/login"]);

  return false;
};
