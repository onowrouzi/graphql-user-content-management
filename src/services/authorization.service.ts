import * as jwt from "jsonwebtoken";

export default class AuthorizationService {
  createToken(userId: string): string {
    return jwt.sign({ userId }, process.env.APP_SECRET, {
      expiresIn: "1h"
    });
  }

  static getUserId(token: string): string {
    try {
      const verification = jwt.verify(
        token,
        process.env.APP_SECRET
      ) as AppTokenVerification;
      if (verification) {
        return verification.userId;
      }
    } catch (err) {
      return;
    }
  }
}

export class AppTokenVerification {
  exp: number;
  userId: string;
}
