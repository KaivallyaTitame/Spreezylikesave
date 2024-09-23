<<<<<<< HEAD
export class DecodedToken {
    userType: string;
    tokenType: string;
    iss: "Spreezy";
    sub: string;
    iat: number;
    exp: number;
}
=======
export interface DecodedToken {
    "User Type": string,
    Token_type: string,
    iss: "Spreezy",
    sub: string,
    iat: number,
    exp: number
}
>>>>>>> e055e2b (adressed all the review comments)
