import { BaseService } from "./base.service";
import { TopicUser, TopicUserRolesEnum } from "../schemas/topic-user";
import TopicUsersRepository from "../repositories/topic-user.repository";
import ErrorHandler from "../utilities/error-handler";
import { SchemaTypes } from "../schemas/schema-types";

export default class TopicUserService extends BaseService<
  TopicUser,
  TopicUsersRepository
> {
  constructor() {
    super();
    this.repo = new TopicUsersRepository();
  }

  async get(id: string): Promise<TopicUser> {
    const record = await this.repo.get(id);

    if (!record) {
      ErrorHandler.notFound();
    }

    return record;
  }

  async getTopicUser(
    topicUserId: string,
    topicId: string,
    userId: string
  ): Promise<TopicUser> {
    if (!(await this.repo.userHasTopicPermissions(userId, topicId))) {
      ErrorHandler.notAuthorized();
    }

    const record = await this.repo.getTopicUser(topicUserId, topicId);

    if (!record) {
      ErrorHandler.notFound();
    }

    return record;
  }

  async remove(id: string, userId: string): Promise<number> {
    const record = await this.repo.get(id);

    if (record.user_id != userId) {
      ErrorHandler.notAuthorized();
    }

    return await this.repo.remove(id);
  }

  async removeTopicUser(
    topicUserId: string,
    topicId: string,
    userId: string
  ): Promise<number> {
    if (!(await this.repo.userHasTopicPermissions(userId, topicId))) {
      ErrorHandler.notAuthorized();
    }

    return await this.repo.removeTopicUser(topicUserId, topicId);
  }

  async query(topicId: string): Promise<Array<TopicUser>> {
    return await this.repo.query(topicId);
  }

  async getUsersForTopic(
    topicId: string,
    userId: string
  ): Promise<Array<TopicUser>> {
    if (!(await this.repo.userHasTopicPermissions(userId, topicId))) {
      ErrorHandler.notAuthorized();
    }

    return await this.query(topicId);
  }

  async save(payload: TopicUser, userId: string): Promise<TopicUser> {
    if (!(await this.repo.userHasTopicPermissions(userId, payload.topic_id))) {
      ErrorHandler.notAuthorized();
    }

    if (
      !payload.user_id ||
      !(await this.repo.exists(payload.user_id, SchemaTypes.User))
    ) {
      ErrorHandler.badInput("Topic Users must have a valid user_id.");
    }

    if (
      !payload.topic_id ||
      !(await this.repo.exists(payload.topic_id, SchemaTypes.Topic))
    ) {
      ErrorHandler.badInput("Topic Users must have a valid topic_id.");
    }

    return await this.repo.upsert(payload);
  }

  async update(payload: TopicUser, userId: string): Promise<TopicUser> {
    if (!(await this.repo.userHasTopicPermissions(userId, payload.topic_id))) {
      ErrorHandler.notAuthorized();
    }

    if (!(await this.repo.topicUserExists(payload.user_id, payload.topic_id))) {
      ErrorHandler.badInput("No matching record found.");
    }

    if (!payload.topic_role) {
      ErrorHandler.badInput("Must include a topic_role.");
    }

    return await this.repo.upsert(payload);
  }
}
