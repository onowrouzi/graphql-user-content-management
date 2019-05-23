import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import UserLike from "../schemas/user-like";
import { IResult } from "pg-promise/typescript/pg-subset";

export default class UserLikesRepository extends BaseRepository<UserLike> {
  constructor() {
    super(SchemaTypes.UserLike);
  }

  async getUserLike(userId: string, contentId: string): Promise<UserLike> {
    return await this.db.connection.oneOrNone(sql("get-user-like.sql"), {
      user_id: userId,
      content_id: contentId
    });
  }

  async getUserLikes(userId: string): Promise<Array<UserLike>> {
    return await this.db.connection.any(sql("get-user-likes.sql"), {
      user_id: userId
    });
  }

  async getContentLikes(contentId: string): Promise<Array<UserLike>> {
    return await this.db.connection.any(sql("get-content-likes.sql"), {
      content_id: contentId
    });
  }

  async getCount(
    contentId: string,
    contentType: SchemaTypes.Post | SchemaTypes.Comment,
    liked: boolean
  ) {
    return await this.db.connection.one(
      sql("get-content-likes-count.sql"),
      {
        content_id: contentId,
        content_type: contentType,
        liked: liked
      },
      (a: { count: number }) => +a.count
    );
  }

  async removeUserLike(userId: string, contentId: string): Promise<number> {
    return await this.db.connection.result(
      sql("delete-user-like.sql"),
      {
        user_id: userId,
        content_id: contentId
      },
      (r: IResult) => r.rowCount
    );
  }

  async existsUserLike(userId: string, contentId: string): Promise<boolean> {
    return await this.db.connection.oneOrNone(
      sql("exists-user-like.sql"),
      {
        user_id: userId,
        content_id: contentId
      },
      res => res.exists
    );
  }

  async insert(payload: UserLike) {
    return await this.db.connection.one(sql("insert-user-like.sql"), payload);
  }

  async update(payload: UserLike) {
    return await this.db.connection.one(sql("update-user-like.sql"), payload);
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(sql("create-user-like-table.sql"));
  }

  async upsert(payload: any): Promise<UserLike> {
    if (await this.existsUserLike(payload.user_id, payload.content_id)) {
      return await this.update(payload);
    } else {
      return await this.insert(payload);
    }
  }

  get(id: string): Promise<UserLike> {
    throw new Error("Method not implemented");
  }

  remove(id: string): Promise<number> {
    throw new Error("Method not implemented");
  }
}
