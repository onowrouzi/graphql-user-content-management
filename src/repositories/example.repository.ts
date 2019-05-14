/**
 * The repositories are where direct database interaction logic occurs.
 * This utilizes pg-promise which allows for raw sql or parsed sql files from the sql parser.
 */
import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import Example from "../schemas/example";

export default class ExamplesRepository extends BaseRepository<Example> {
  constructor() {
    super(SchemaTypes.Example);
  }

  async insert(payload: Example) {
    return await this.db.connection
      .one(sql("insert-example.sql"), [this.tableName, payload.name, false])
      .then(inserted => inserted);
  }

  async update(payload: Example) {
    return await this.db.connection
      .one(sql("update-example.sql"), [
        this.tableName,
        payload.name,
        new Date(),
        payload.id
      ])
      .then(updated => updated);
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(sql("create-example-table.sql"));
  }

  async upsert(payload: any): Promise<Example> {
    if (payload.id) {
      return await this.update(payload);
    } else {
      return await this.insert(payload);
    }
  }

  async query(parentId: string): Promise<Example[]> {
    return await this.all();
  }
}