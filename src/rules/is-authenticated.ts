import { rule } from "graphql-shield";
import ErrorHandler from "../utilities/error-handler";

export const isAuthenticated = rule()((parent, args, { userId }, info) => {
  if (!userId) {
    ErrorHandler.notAuthorized();
  }

  return true;
});
