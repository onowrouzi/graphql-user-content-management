import { interfaceType } from "nexus/dist";
import { SchemaTypes } from "./schema-types";
import { NexusGenFieldTypes } from "../../generated/nexus-typings";

export type LikableContent = NexusGenFieldTypes[SchemaTypes.LikableContent];

export const likableContent = interfaceType({
  name: SchemaTypes.LikableContent,
  definition(t) {
    t.id("id");
    t.string("content");
    t.id("user_id");
    t.int("likes_count", {
      resolve: (parent: LikableContent, {}, { services }) =>
        services.UserLike.getCount(parent.id, SchemaTypes.Post, true)
    });
    t.int("dislikes_count", {
      resolve: (parent: LikableContent, {}, { services }) =>
        services.UserLike.getCount(parent.id, SchemaTypes.Post, false)
    });
    t.field("user", {
      type: SchemaTypes.User,
      nullable: true,
      resolve: (parent: LikableContent, {}, { services }) =>
        services.User.get(parent.user_id)
    });
    t.list.field("likes", {
      type: SchemaTypes.UserLike,
      nullable: true,
      resolve: (parent: LikableContent, {}, { services }) =>
        services.UserLike.getContentLikes(parent.id)
    });
    t.resolveType((data: any) => null);
  }
});
