import { BaseService } from "./base.service";
import { Post } from "./../schemas/post";
import PostsRepository from "./../repositories/post.repository";
import ErrorHandler from "../utilities/error-handler";
import { SchemaTypes } from "../schemas/schema-types";

export default class PostService extends BaseService<Post, PostsRepository> {
  constructor() {
    super();
    this.repo = new PostsRepository();
  }

  async get(id: string): Promise<Post> {
    const record = await this.repo.get(id);

    if (!record) {
      ErrorHandler.notFound();
    }

    return record;
  }

  async remove(id: string): Promise<number> {
    return await this.repo.remove(id);
  }

  async query(userId: string): Promise<Array<Post>> {
    return await this.repo.query(userId);
  }

  async save(payload: Post): Promise<Post> {
    if (!payload || payload.id) {
      ErrorHandler.badInput("Cannot insert record with an id.");
    }

    if (!payload.title || !payload.content) {
      ErrorHandler.badInput("Posts must have a title and content.");
    }

    if (
      !payload.user_id ||
      !(await this.repo.exists(payload.user_id, SchemaTypes.User))
    ) {
      ErrorHandler.badInput("Posts must have a valid user_id.");
    }

    return await this.repo.upsert(payload);
  }

  async update(payload: Post): Promise<Post> {
    if (!payload || !payload.id) {
      ErrorHandler.badInput("Cannot update record without an id.");
    }

    if (!payload.title || !payload.content) {
      ErrorHandler.badInput("Posts must have a title and content.");
    }

    return await this.repo.upsert(payload);
  }
}
