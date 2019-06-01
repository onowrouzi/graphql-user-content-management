import {
  ApolloError,
  UserInputError,
  AuthenticationError
} from "apollo-server";

export default class ErrorHandler {
  static throw(
    message: string,
    code: string,
    properties?: Record<string, any>
  ) {
    throw new ApolloError(message, code, properties);
  }

  static notAuthorized() {
    throw new AuthenticationError("Action not authorized!");
  }

  static badInput(message?: string, properties?: Record<string, any>) {
    throw new UserInputError(message, properties);
  }

  static notFound(message?: string, properties?: Record<string, any>) {
    throw new ApolloError(
      message || "Entry not found.",
      "NOT_FOUND",
      properties
    );
  }
}
