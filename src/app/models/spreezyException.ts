export class SpreezyError implements Error {
  name: string;
  message: string;

  constructor(name: string, message: string) {
    this.name = name;
    this.message = message;
  }
}

export enum SpreezyException {
  SPEX_0 = "Unknown Error",
  SPEX_1 = "Invalid Credentials",
  SPEX_2 = "Multiple attempts failed",
  SPEX_3 = "Registration failed",
  SPEX_4 = "Login Exception",
  SPEX_5 = "Logout Exception",
}
