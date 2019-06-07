import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import { Topic } from "../schemas/topic";
import { TopicUserRolesEnum } from "../schemas";

export default class TopicsRepository extends BaseRepository<Topic> {
  constructor() {
    super(SchemaTypes.Topic);
  }

  async insert(payload: Topic): Promise<Topic> {
    return await this.db.connection.one(sql("insert-topic.sql"), payload);
  }

  async create(payload: Topic, userId: string): Promise<Topic> {
    const record = await this.insert(payload);
    await this.db.connection.one(sql("insert-topic-user.sql"), {
      topic_id: record.id,
      user_id: userId,
      topic_role: TopicUserRolesEnum.Owner
    });
    return record;
  }

  async update(payload: Topic): Promise<Topic> {
    return await this.db.connection.one(sql("update-topic.sql"), payload);
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(sql("create-topic-table.sql"));
  }

  async upsert(payload: any): Promise<Topic> {
    if (payload.id) {
      return await this.update(payload);
    } else {
      return await this.insert(payload);
    }
  }

  async query(userId: string): Promise<Topic[]> {
    return await this.db.connection.any(sql("get-topics-for-user.sql"), {
      user_id: userId,
      order_by: "created_at"
    });
  }
}
