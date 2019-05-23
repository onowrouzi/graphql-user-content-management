import {
  objectType,
  inputObjectType,
  mutationField,
  arg,
  queryField,
  stringArg
} from "nexus";
import { SchemaTypes } from "./schema-types";
import { NexusGenFieldTypes } from "../../generated/typings";

export type Comment = NexusGenFieldTypes[SchemaTypes.Comment];

export const comment = objectType({
  name: SchemaTypes.Comment,
  definition(t) {
    t.implements(SchemaTypes.Base);
    t.implements(SchemaTypes.LikableContent);
    t.id("comment_id", { nullable: true });
    t.id("post_id", { nullable: true });
    t.int("reply_depth", {
      resolve: async (comment: Comment, {}, { services }) =>
        await services.Comment.getReplyDepth(comment.id)
    });
    t.field("post", {
      type: SchemaTypes.Post,
      resolve: async (comment: Comment, {}, { services }) =>
        await services.Post.get(comment.post_id)
    });
    t.list.field("replies", {
      type: SchemaTypes.Comment,
      nullable: true,
      resolve: async (comment: Comment, {}, { services }) =>
        await services.Comment.getCommentReplies(comment.id)
    });
  }
});

export const commentInputType = inputObjectType({
  name: SchemaTypes.CommentInput,
  definition(t) {
    t.id("id", { nullable: true });
    t.id("user_id");
    t.id("post_id");
    t.id("comment_id", { nullable: true });
    t.string("content");
  }
});

export const createComment = mutationField("createComment", {
  type: SchemaTypes.Comment,
  args: {
    payload: arg({ type: SchemaTypes.CommentInput, required: true })
  },
  resolve: async (parent, { payload }, { services }) =>
    await services.Comment.save(payload)
});

export const getCommentsForPost = queryField("getCommentsForPost", {
  type: SchemaTypes.Comment,
  list: true,
  args: {
    post_id: stringArg({ required: true })
  },
  resolve: async (parent, { post_id }, { services }) =>
    await services.Comment.query(post_id)
});

export const getCommentReplies = queryField("getCommentReplies", {
  type: SchemaTypes.Comment,
  list: true,
  args: {
    comment_id: stringArg({ required: true })
  },
  resolve: async (parent, { comment_id }, { services }) =>
    await services.Comment.getCommentReplies(comment_id)
});

export const getComment = queryField("comment", {
  type: SchemaTypes.Comment,
  nullable: true,
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) =>
    await services.Comment.get(id)
});

export const updateComment = mutationField("updateComment", {
  type: SchemaTypes.Comment,
  args: {
    payload: arg({ type: SchemaTypes.CommentInput, required: true })
  },
  resolve: async (parent, { payload }, { services }) =>
    await services.Comment.update(payload)
});

export const deleteComment = mutationField("deleteComment", {
  type: "String",
  args: { id: stringArg({ required: true }) },
  resolve: async (parent, { id }, { services }) =>
    await services.Comment.remove(id)
});
