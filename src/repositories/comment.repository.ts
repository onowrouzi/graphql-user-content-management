import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import Comment from "../schemas/comment";

export default class CommentsRepository extends BaseRepository<Comment> {
  constructor() {
    super(SchemaTypes.Comment);
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(sql("create-comment-table.sql"), {
      table: this.table
    });
  }

  async upsert(payload: Comment): Promise<Comment> {
    if (!payload.id) {
      return await this.insert(payload);
    } else {
      return await this.update(payload);
    }
  }

  async insert(payload: Comment) {
    return await this.db.connection.one(sql("insert-comment.sql"), {
      table: this.table,
      user_id: payload.user_id,
      post_id: payload.post_id,
      comment_id: payload.comment_id,
      content: payload.content
    });
  }

  async update(payload: Comment) {
    return await this.db.connection.one(sql("update-comment.sql"), {
      table: this.table,
      content: payload.content,
      id: payload.id
    });
  }

  async getCommentsForPost(postId: string): Promise<Comment[]> {
    return await this.db.connection.any(sql("get-comments-for-post.sql"), {
      table: this.table,
      post_id: postId
    });
  }

  async getCommentReplies(commentId: string): Promise<Comment[]> {
    return await this.db.connection.any(sql("get-replies-for-comment.sql"), {
      table: this.table,
      comment_id: commentId
    });
  }

  async getReplyDepth(commentId: string): Promise<number> {
    return await this.db.connection.oneOrNone(
      sql("get-reply-depth.sql"),
      {
        comment_id: commentId
      },
      res => res.max || 0
    );
  }
}
