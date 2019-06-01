import { objectType } from "nexus/dist";
import { SchemaTypes } from "./schema-types";

export const appToken = objectType({
  name: SchemaTypes.AppToken,
  definition(t) {
    t.string("token");
    t.string("refreshToken", { nullable: true });
    t.date("expiresAt");
  }
});
