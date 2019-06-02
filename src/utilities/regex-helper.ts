export default class RegexHelper {
  private static readonly URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/){1}[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  private static readonly EMAIL_REGEX = /^([\w\.\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{3,}\@([a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}))$/;
  private static readonly PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  static isValidUrl(url: string): boolean {
    return this.URL_REGEX.test(url);
  }

  static isValidEmail(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }

  static isValidPassword(password: string): boolean {
    return this.PASSWORD_REGEX.test(password);
  }
}
