import {
  objectType,
  inputObjectType,
  mutationField,
  arg,
  queryField,
  stringArg,
  enumType,
  unionType
} from "nexus";
import { SchemaTypes } from "./schema-types";
import { NexusGenFieldTypes } from "../../generated/nexus-typings";

export type UserLike = NexusGenFieldTypes[SchemaTypes.UserLike];

export const enum LikeTypes {
  Post = SchemaTypes.Post,
  Comment = SchemaTypes.Comment
}

export const likeTypes = enumType({
  name: SchemaTypes.LikeTypes,
  members: [SchemaTypes.Post, SchemaTypes.Comment]
});

export const likeTypesUnion = unionType({
  name: SchemaTypes.LikeTypesUnion,
  definition(t) {
    t.members(SchemaTypes.Post, SchemaTypes.Comment);
    t.resolveType(() => null);
  }
});

export const userLike = objectType({
  name: SchemaTypes.UserLike,
  definition(t) {
    t.implements(SchemaTypes.Base);
    t.id("user_id");
    t.id("content_id");
    t.boolean("liked");
    t.field("content_type", { type: SchemaTypes.LikeTypes });
    t.field("user", {
      type: SchemaTypes.User,
      resolve: (userLike: UserLike, {}, { services }) =>
        services.User.get(userLike.user_id)
    });
    t.field("content", {
      type: SchemaTypes.LikeTypesUnion,
      resolve: (userLike: UserLike, {}, { services }) => {
        switch (userLike.content_type) {
          case "post":
            return services.Post.get(userLike.content_id);
          case "comment":
            return services.Comment.get(userLike.content_id);
        }
      }
    });
  }
});

export const userLikeInputType = inputObjectType({
  name: SchemaTypes.UserLikeInput,
  definition(t) {
    t.id("content_id");
    t.field("content_type", { type: SchemaTypes.LikeTypes });
    t.boolean("liked");
  }
});

export const createUserLike = mutationField("createUserLike", {
  type: SchemaTypes.UserLike,
  args: {
    payload: arg({ type: SchemaTypes.UserLikeInput, required: true })
  },
  resolve: async (parent, { payload }, { services, userId }) =>
    await services.UserLike.save(payload, userId)
});

export const getUserLike = queryField("userLike", {
  type: SchemaTypes.UserLike,
  nullable: true,
  args: {
    user_id: stringArg({ required: true }),
    content_id: stringArg({ required: true })
  },
  resolve: async (parent, { user_id, content_id }, { services }) =>
    await services.UserLike.getUserLike(user_id, content_id)
});

export const getUserLikes = queryField("userLikes", {
  type: SchemaTypes.UserLike,
  list: true,
  args: { user_id: stringArg({ required: true }) },
  resolve: async (parent, { user_id }, { services }) =>
    await services.UserLike.query(user_id)
});

export const getContentLikes = queryField("contentLikes", {
  type: SchemaTypes.UserLike,
  list: true,
  args: { content_id: stringArg({ required: true }) },
  resolve: async (parent, { content_id }, { services }) =>
    await services.UserLike.getContentLikes(content_id)
});

export const updateUserLike = mutationField("updateUserLike", {
  type: SchemaTypes.UserLike,
  args: {
    payload: arg({ type: SchemaTypes.UserLikeInput, required: true })
  },
  resolve: async (parent, { payload }, { services, userId }) =>
    await services.UserLike.update(payload, userId)
});

export const deleteUserLike = mutationField("deleteUserLike", {
  type: "String",
  args: {
    user_id: stringArg({ required: true }),
    content_id: stringArg({ required: true })
  },
  resolve: async (parent, { content_id }, { services, userId }) =>
    await services.UserLike.remove(userId, content_id)
});
