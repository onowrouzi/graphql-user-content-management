import { BaseService } from "./base.service";
import { Comment } from "./../schemas/comment";
import CommentsRepository from "./../repositories/comment.repository";
import ErrorHandler from "../utilities/error-handler";
import { SchemaTypes } from "../schemas/schema-types";

export default class CommentService extends BaseService<
  Comment,
  CommentsRepository
> {
  constructor() {
    super();
    this.repo = new CommentsRepository();
  }

  async get(id: string): Promise<Comment> {
    const record = await this.repo.get(id);

    if (!record) {
      ErrorHandler.notFound();
    }

    return record;
  }

  async remove(id: string): Promise<number> {
    return await this.repo.remove(id);
  }

  async query(postId: string): Promise<Array<Comment>> {
    return await this.repo.getCommentsForPost(postId);
  }

  async getCommentReplies(commentId: string): Promise<Array<Comment>> {
    return await this.repo.getCommentReplies(commentId);
  }

  async getReplyDepth(commentId: string): Promise<number> {
    return await this.repo.getReplyDepth(commentId);
  }

  async save(payload: Comment): Promise<Comment> {
    if (!payload || payload.id) {
      ErrorHandler.badInput("Cannot insert record with an id.");
    }

    if (!payload.content) {
      ErrorHandler.badInput("Comments must have content.");
    }

    if (
      !payload.user_id ||
      !(await this.repo.exists(payload.user_id, SchemaTypes.User))
    ) {
      ErrorHandler.badInput("Comments must have a valid user_id.");
    }

    if (
      !payload.post_id ||
      !(await this.repo.exists(payload.post_id, SchemaTypes.Post))
    ) {
      ErrorHandler.badInput("Comments must have a valid post_id.");
    }

    if (
      payload.comment_id &&
      !(await this.repo.exists(payload.comment_id, SchemaTypes.Comment))
    ) {
      ErrorHandler.badInput("Comment replies must have a valid comment_id.");
    }

    return await this.repo.upsert(payload);
  }

  async update(payload: Comment): Promise<Comment> {
    if (!payload || !payload.id) {
      ErrorHandler.badInput("Cannot update record without an id.");
    }

    if (!payload.content) {
      ErrorHandler.badInput("Comments must have content.");
    }

    return await this.repo.upsert(payload);
  }
}
