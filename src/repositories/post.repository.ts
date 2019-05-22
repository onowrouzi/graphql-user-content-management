import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import Post from "../schemas/post";

export default class PostsRepository extends BaseRepository<Post> {
  constructor() {
    super(SchemaTypes.Post);
  }

  async insert(payload: Post) {
    return await this.db.connection.one(sql("insert-post.sql"), {
      table: this.table,
      title: payload.title,
      content: payload.content,
      user_id: payload.user_id
    });
  }

  async update(payload: Post) {
    return await this.db.connection.one(sql("update-post.sql"), {
      table: this.table,
      title: payload.title,
      content: payload.content,
      id: payload.id
    });
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(sql("create-post-table.sql"), {
      table: this.table
    });
  }

  async upsert(payload: any): Promise<Post> {
    if (payload.id) {
      return await this.update(payload);
    } else {
      return await this.insert(payload);
    }
  }

  async query(userId: string): Promise<Post[]> {
    return await this.db.connection.any(sql("get-posts-for-user.sql"), {
      table: this.table,
      user_id: userId
    });
  }
}
