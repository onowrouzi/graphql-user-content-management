import { BaseService } from "./base.service";
import { Topic } from "./../schemas/topic";
import TopicsRepository from "./../repositories/topic.repository";
import ErrorHandler from "../utilities/error-handler";
import { SchemaTypes } from "../schemas/schema-types";
import TopicUsersRepository from "../repositories/topic-user.repository";

export default class TopicService extends BaseService<Topic, TopicsRepository> {
  private topicUserRepo: TopicUsersRepository;

  constructor() {
    super();
    this.repo = new TopicsRepository();
    this.topicUserRepo = new TopicUsersRepository();
  }

  async get(id: string): Promise<Topic> {
    const record = await this.repo.get(id);

    if (!record) {
      ErrorHandler.notFound();
    }

    return record;
  }

  async getTopic(id: string, userId: string): Promise<Topic> {
    if (!(await this.topicUserRepo.userHasTopicPermissions(userId, id))) {
      ErrorHandler.notAuthorized();
    }

    const record = await this.repo.get(id);

    if (!record) {
      ErrorHandler.notFound();
    }

    return record;
  }

  async remove(id: string, userId: string): Promise<number> {
    if (!(await this.topicUserRepo.userHasTopicPermissions(userId, id))) {
      ErrorHandler.notAuthorized();
    }

    return await this.repo.remove(id);
  }

  async query(userId: string): Promise<Array<Topic>> {
    return await this.repo.query(userId);
  }

  async save(payload: Topic, userId: string): Promise<Topic> {
    if (!payload || payload.id) {
      ErrorHandler.badInput("Cannot insert record with an id.");
    }

    if (!payload.title) {
      ErrorHandler.badInput("Topics must have a title.");
    }

    return await this.repo.create(payload, userId);
  }

  async update(payload: Topic, userId: string): Promise<Topic> {
    if (!payload || !payload.id) {
      ErrorHandler.badInput("Cannot update record without an id.");
    }

    if (!payload.title) {
      ErrorHandler.badInput("Topics must have a title and content.");
    }

    if (!(await this.repo.exists(payload.id, SchemaTypes.Topic))) {
      ErrorHandler.badInput("No matching record.");
    }

    if (
      !(await this.topicUserRepo.userHasTopicPermissions(userId, payload.id))
    ) {
      ErrorHandler.notAuthorized();
    }

    return await this.repo.upsert(payload);
  }
}
