import { objectType, stringArg, mutationField } from "nexus/dist";
import { SchemaTypes } from "./schema-types";
import AuthorizationService from "../services/authorization.service";

export const appToken = objectType({
  name: SchemaTypes.AppToken,
  definition(t) {
    t.string("token");
    t.string("refreshToken", { nullable: true });
    t.date("expiresAt");
  }
});

export const loginUser = mutationField("loginUser", {
  type: SchemaTypes.AppToken,
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true })
  },
  resolve: async (parent, { email, password }, { services }) => {
    const user = await services.User.login(email, password);
    return AuthorizationService.createToken(user.id);
  }
});

export const useRefreshToken = mutationField("useRefreshToken", {
  type: SchemaTypes.AppToken,
  args: {
    refreshToken: stringArg({ required: true })
  },
  resolve: async (parent, { refreshToken }, { services }) => {
    return AuthorizationService.useRefreshToken(refreshToken);
  }
});
