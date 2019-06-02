import { objectType, mutationField, arg, queryField, stringArg } from "nexus";
import { SchemaTypes } from "./schema-types";
import { NexusGenFieldTypes } from "../../generated/nexus-typings";

export type HostedContent = NexusGenFieldTypes[SchemaTypes.HostedContent];

export const hostedContent = objectType({
  name: SchemaTypes.HostedContent,
  definition(t) {
    t.implements(SchemaTypes.Base);
    t.id("user_id");
    t.string("content_type");
    t.string("hosted_url");
  }
});

export const createHostedContent = mutationField("createHostedContent", {
  type: SchemaTypes.HostedContent,
  args: {
    url: arg({ type: "String", required: true })
  },
  resolve: async (parent, { url }, { services, userId }) =>
    await services.HostedContent.save({ hosted_url: url }, userId)
});

export const getHostedContent = queryField("hostedContent", {
  type: SchemaTypes.HostedContent,
  nullable: true,
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) =>
    await services.HostedContent.get(id)
});

export const getHostedContentForUser = queryField("getHostedContentForUser", {
  type: SchemaTypes.HostedContent,
  list: true,
  args: { user_id: stringArg({ required: false }) },
  resolve: async (parent, { user_id }, { services, userId }) =>
    await services.HostedContent.query(user_id || userId)
});

export const deleteHostedContent = mutationField("deleteHostedContent", {
  type: "String",
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services, userId }) =>
    await services.HostedContent.remove(id, userId)
});
