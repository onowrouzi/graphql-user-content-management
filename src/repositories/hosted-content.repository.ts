import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import { HostedContent } from "../schemas/hosted-content";

export default class HostedContentRepository extends BaseRepository<
  HostedContent
> {
  constructor() {
    super(SchemaTypes.HostedContent);
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(
      sql("create-hosted-content-table.sql")
    );
  }

  async insert(payload: HostedContent): Promise<HostedContent> {
    return await this.db.connection.one(
      sql("insert-hosted-content.sql"),
      payload
    );
  }

  async getForUser(userId: string): Promise<HostedContent[]> {
    return await this.db.connection.any(
      sql("get-hosted-content-for-user.sql"),
      {
        user_id: userId
      }
    );
  }

  async existsForUser(userId: string, url: string) {
    return await this.db.connection.oneOrNone(
      sql("hosted-content-exists-for-user.sql"),
      {
        user_id: userId,
        hosted_url: url
      },
      (res: any) => res.exists
    );
  }

  upsert(payload: HostedContent): Promise<HostedContent> {
    throw new Error("Method not implemented.");
  }

  update(payload: HostedContent): Promise<HostedContent> {
    throw new Error("Method not implemented.");
  }
}
