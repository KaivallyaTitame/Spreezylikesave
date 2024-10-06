export interface DecodedToken {
    "User Type": string,
    Token_type: string,
    iss: "Spreezy",
    sub: string, //user-name (consumer and business owner)
    iat: number,
    exp: number
  }