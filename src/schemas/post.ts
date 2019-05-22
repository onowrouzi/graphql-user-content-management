import {
  objectType,
  inputObjectType,
  mutationField,
  arg,
  queryField,
  stringArg
} from "nexus";
import { SchemaTypes } from "./schema-types";
import Base from "./base";
import User from "./user";

export default class Post extends Base {
  title: string;
  content: string;
  user_id: string;
  user: User;
  comments: Comment[];
}

export const post = objectType({
  name: SchemaTypes.Post,
  definition(t) {
    t.implements(SchemaTypes.Base);
    t.string("title");
    t.string("content");
    t.id("user_id");
    t.field("user", {
      type: SchemaTypes.User,
      nullable: true,
      resolve: async (post, {}, { services }) =>
        await services.User.get(post.user_id)
    });
    t.list.field("comments", {
      type: SchemaTypes.Comment,
      nullable: true,
      resolve: async (post, {}, { services }) =>
        await services.Comment.query(post.id)
    });
  }
});

export const postInputType = inputObjectType({
  name: SchemaTypes.PostInput,
  definition(t) {
    t.id("id", { nullable: true });
    t.string("title");
    t.string("content");
    t.id("user_id");
  }
});

export const createPost = mutationField("createPost", {
  type: SchemaTypes.Post,
  args: {
    payload: arg({ type: SchemaTypes.PostInput, required: true })
  },
  resolve: async (parent, { payload }, { services }) =>
    await services.Post.save(payload)
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
  resolve: async (parent, { payload }, { services }) =>
    await services.Post.update(payload)
});

export const deletePost = mutationField("deletePost", {
  type: "String",
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) =>
    await services.Post.remove(id)
});
