import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import { Post } from "../schemas/post";

export default class PostsRepository extends BaseRepository<Post> {
  constructor() {
    super(SchemaTypes.Post);
  }

  async insert(payload: Post) {
    return await this.db.connection.one(sql("insert-post.sql"), payload);
  }

  async update(payload: Post) {
    return await this.db.connection.one(sql("update-post.sql"), payload);
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(sql("create-post-table.sql"));
  }

  async upsert(payload: any): Promise<Post> {
    if (payload.id) {
      return await this.update(payload);
    } else {
      return await this.insert(payload);
    }
  }

  async getPostsForTopic(topicId: string): Promise<Post[]> {
    return await this.db.connection.any(sql("get-posts-for-topic.sql"), {
      table: this.table,
      topic_id: topicId
    });
  }

  async query(userId: string): Promise<Post[]> {
    return await this.db.connection.any(sql("get-posts-for-user.sql"), {
      table: this.table,
      user_id: userId
    });
  }
}
