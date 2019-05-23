import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import { User } from "../schemas/user";

export default class UsersRepository extends BaseRepository<User> {
  constructor() {
    super(SchemaTypes.User);
  }

  async create(payload: User, hash: string) {
    return await this.db.connection.one(
      sql("insert-user.sql"),
      Object.assign(payload, { password_hash: hash })
    );
  }

  async update(payload: User) {
    return await this.db.connection.one(sql("update-user.sql"), payload);
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(sql("create-user-table.sql"));
  }

  async upsert(payload: User): Promise<User> {
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

  insert(payload: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
