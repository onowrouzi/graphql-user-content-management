import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import User from "../schemas/user";

export default class UsersRepository extends BaseRepository<User> {
  constructor() {
    super(SchemaTypes.User);
  }

  async insert(payload: User) {
    return await this.db.connection.one(sql("insert-user.sql"), payload);
  }

  async update(payload: User) {
    return await this.db.connection.one(sql("update-user.sql"), payload);
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(sql("create-user-table.sql"));
  }

  async upsert(payload: any): Promise<User> {
    if (payload.id) {
      return await this.update(payload);
    } else {
      return await this.insert(payload);
    }
  }

  async query(parentId: string): Promise<User[]> {
    return await this.all();
  }

  async getByEmail(email: string) {
    return await this.db.connection.oneOrNone(sql("get-user-by-email.sql"), {
      email: email
    });
  }
}
