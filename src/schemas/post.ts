import {
  objectType,
  inputObjectType,
  mutationField,
  arg,
  queryField,
  stringArg
} from "nexus";
import { SchemaTypes } from "./schema-types";
import { NexusGenFieldTypes } from "../../generated/nexus-typings";
import { Comment } from "./comment";

export type Post = NexusGenFieldTypes[SchemaTypes.Post];

export const post = objectType({
  name: SchemaTypes.Post,
  definition(t) {
    t.implements(SchemaTypes.Base);
    t.implements(SchemaTypes.LikableContent);
    t.string("title");
    t.list.field("comments", {
      type: SchemaTypes.Comment,
      nullable: true,
      resolve: async (comment: Comment, {}, { services }) =>
        await services.Comment.query(comment.id)
    });
  }
});

export const postInputType = inputObjectType({
  name: SchemaTypes.PostInput,
  definition(t) {
    t.id("id", { nullable: true });
    t.string("title");
    t.string("content");
  }
});

export const createPost = mutationField("createPost", {
  type: SchemaTypes.Post,
  args: {
    payload: arg({ type: SchemaTypes.PostInput, required: true })
  },
  resolve: async (parent, { payload }, { services, userId }) =>
    await services.Post.save(payload, userId)
});

export const getPost = queryField("post", {
  type: SchemaTypes.Post,
  nullable: true,
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) => await services.Post.get(id)
});

export const getPostsForUser = queryField("getPostsForUser", {
  type: SchemaTypes.Post,
  list: true,
  args: { user_id: stringArg({ required: true }) },
  resolve: async (parent, { user_id }, { services }) =>
    await services.Post.query(user_id)
});

export const updatePost = mutationField("updatePost", {
  type: SchemaTypes.Post,
  args: {
    payload: arg({ type: SchemaTypes.PostInput, required: true })
  },
  resolve: async (parent, { payload }, { services, userId }) =>
    await services.Post.update(payload, userId)
});

export const deletePost = mutationField("deletePost", {
  type: "String",
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services, userId }) =>
    await services.Post.remove(id, userId)
});
