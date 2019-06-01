import * as jwt from "jsonwebtoken";

export default class AuthorizationService {
  static createToken(userId: string): AppToken {
    const expiresAt = new Date(Date.now() + 3600000);
    const exp = Math.floor(expiresAt.getTime() / 1000);
    var token = jwt.sign({ exp, userId }, process.env.APP_SECRET);

    var refreshToken = jwt.sign(
      { exp, userId, isRefresh: true },
      process.env.APP_SECRET
    );

    return {
      token,
      refreshToken,
      expiresAt
    };
  }

  static getUserId(token: string): string {
    try {
      const verification = jwt.verify(
        token,
        process.env.APP_SECRET
      ) as AppTokenVerification;

      if (verification.isRefresh) {
        const appToken = this.createToken(verification.userId);
        return this.getUserId(appToken.token);
      }

      if (verification) {
        return verification.userId;
      }
    } catch (err) {
      return;
    }
  }
}

export class AppToken {
  token: string;
  refreshToken: string;
  expiresAt: Date;
}

export class AppTokenVerification {
  exp: number;
  userId: string;
  isRefresh?: boolean;
}
