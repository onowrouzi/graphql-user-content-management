import { BaseRepository } from "./base.repository";
import { SchemaTypes } from "../schemas/schema-types";
import sql from "../sql/sql-parser";
import { TopicUser, TopicUserRolesEnum } from "../schemas/topic-user";
import { IResult } from "pg-promise/typescript/pg-subset";
import { Topic } from "../schemas";

export default class TopicUsersRepository extends BaseRepository<TopicUser> {
  constructor() {
    super(SchemaTypes.TopicUser);
  }

  async getTopicUser(userId: string, topicId: string): Promise<TopicUser> {
    return await this.db.connection.oneOrNone(sql("get-topic-user.sql"), {
      user_id: userId,
      topic_id: topicId
    });
  }

  async removeTopicUser(userId: string, topicId: string): Promise<number> {
    return await this.db.connection.result(
      sql("soft-delete-topic-user.sql"),
      {
        user_id: userId,
        topic_id: topicId
      },
      (r: IResult) => r.rowCount
    );
  }

  async insert(payload: TopicUser): Promise<TopicUser> {
    return await this.db.connection.one(sql("insert-topic-user.sql"), payload);
  }

  async update(payload: TopicUser): Promise<TopicUser> {
    return await this.db.connection.one(sql("update-topic-user.sql"), payload);
  }

  async createTable(): Promise<null> {
    return await this.db.connection.none(sql("create-topic-user-table.sql"));
  }

  async upsert(payload: any): Promise<TopicUser> {
    if (payload.id) {
      return await this.update(payload);
    } else {
      return await this.insert(payload);
    }
  }

  async query(topicId: string): Promise<TopicUser[]> {
    return await this.db.connection.any(sql("get-users-for-topic.sql"), {
      topic_id: topicId
    });
  }

  async topicUserExists(
    userId: string,
    topicId: string,
    topicUserRole?: TopicUserRolesEnum
  ): Promise<boolean> {
    return await this.db.connection.oneOrNone(
      sql("topic-user-exists.sql"),
      {
        user_id: userId,
        topic_id: topicId,
        topic_role: topicUserRole
      },
      (res: any) => res.exists
    );
  }

  async userHasTopicPermissions(
    userId: string,
    topicId: string
  ): Promise<boolean> {
    const topic = (await this.db.connection.oneOrNone(sql("get-by-id.sql"), {
      table: SchemaTypes.Topic,
      id: topicId
    })) as Topic;

    return (
      topic &&
      (!topic.is_private ||
        (await this.topicUserExists(
          userId,
          topic.id,
          TopicUserRolesEnum.Owner
        )) ||
        (await this.topicUserExists(
          userId,
          topic.id,
          TopicUserRolesEnum.Moderator
        )))
    );
  }
}
