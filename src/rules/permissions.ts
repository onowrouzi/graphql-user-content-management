import { allow, shield } from "graphql-shield";
import { isAuthenticated } from "./is-authenticated";

export const permissions = shield({
  Query: {
    "*": isAuthenticated
  },
  Mutation: {
    "*": isAuthenticated,
    loginUser: allow,
    useRefreshToken: allow,
    createUser: allow
  }
});
