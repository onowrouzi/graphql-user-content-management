import Base from "./base";
import { interfaceType } from "nexus/dist";
import { SchemaTypes } from "./schema-types";

export default abstract class LikableContent extends Base {
  user_id: string;
  content: string;
  likes_count: number;
  dislikes_count: number;
}

export const likableContent = interfaceType({
  name: SchemaTypes.LikableContent,
  definition(t) {
    t.string("content");
    t.id("user_id");
    t.int("likes_count", {
      resolve: async (parent, {}, { services }) =>
        await services.UserLike.getCount(parent.id, SchemaTypes.Post, true)
    });
    t.int("dislikes_count", {
      resolve: async (parent, {}, { services }) =>
        await services.UserLike.getCount(parent.id, SchemaTypes.Post, false)
    });
    t.field("user", {
      type: SchemaTypes.User,
      nullable: true,
      resolve: async (parent, {}, { services }) =>
        await services.User.get(parent.user_id)
    });
    t.list.field("likes", {
      type: SchemaTypes.UserLike,
      nullable: true,
      resolve: async (parent, {}, { services }) =>
        await services.UserLike.getContentLikes(parent.id)
    });
    t.resolveType(() => null);
  }
});
