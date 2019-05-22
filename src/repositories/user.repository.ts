import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import User from "../schemas/user";

export default class UsersRepository extends BaseRepository<User> {
  constructor() {
    super(SchemaTypes.User);
  }

  async insert(payload: User) {
    return await this.db.connection.one(sql("insert-user.sql"), {
      table: this.table,
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      password_hash: payload.password_hash
    });
  }

  async update(payload: User) {
    return await this.db.connection.one(sql("update-user.sql"), {
      table: this.table,
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      id: payload.id
    });
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(sql("create-user-table.sql"), {
      table: this.table
    });
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
      table: this.table,
      email: email
    });
  }
}
