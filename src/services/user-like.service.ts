import { BaseService } from "./base.service";
import { UserLike } from "./../schemas/user-like";
import UserLikesRepository from "./../repositories/user-like.repository";
import ErrorHandler from "../utilities/error-handler";
import { SchemaTypes } from "../schemas/schema-types";

export default class UserLikeService extends BaseService<
  UserLike,
  UserLikesRepository
> {
  constructor() {
    super();
    this.repo = new UserLikesRepository();
  }

  async getUserLike(userId: string, contentId: string): Promise<UserLike> {
    const record = await this.repo.getUserLike(userId, contentId);

    if (!record) {
      ErrorHandler.notFound();
    }

    return record;
  }

  get(id: string): Promise<UserLike> {
    throw new Error("Method not implemented");
  }

  async remove(userId: string, contentId: string): Promise<number> {
    return await this.repo.removeUserLike(userId, contentId);
  }

  async query(userId: string): Promise<Array<UserLike>> {
    return await this.repo.getUserLikes(userId);
  }

  async getContentLikes(contentId: string): Promise<Array<UserLike>> {
    return await this.repo.getContentLikes(contentId);
  }

  async getCount(
    contentId: string,
    contentType: SchemaTypes.Post | SchemaTypes.Comment,
    liked: boolean
  ) {
    return await this.repo.getCount(contentId, contentType, liked);
  }

  async save(payload: UserLike): Promise<UserLike> {
    if (!payload || !payload.user_id || !payload.content_id) {
      ErrorHandler.badInput("Record must have user_id & content_id.");
    }

    if (await this.repo.existsUserLike(payload.user_id, payload.content_id)) {
      ErrorHandler.badInput("Record exists.");
    }

    return await this.repo.upsert(payload);
  }

  async update(payload: UserLike): Promise<UserLike> {
    if (!payload || !payload.user_id || !payload.content_id) {
      ErrorHandler.badInput("Record must have user_id & content_id.");
    }

    if (
      !(await this.repo.existsUserLike(payload.user_id, payload.content_id))
    ) {
      ErrorHandler.badInput("Record does not exist.");
    }

    return await this.repo.upsert(payload);
  }
}
