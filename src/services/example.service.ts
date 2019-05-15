/**
 * Services should be the middleware for business logic between resolvers and repositories.
 */
import { BaseService } from "./base.service";
import ExampleRepository from "../repositories/example.repository";
import Example from "../schemas/example";
import ErrorHandler from "../utilities/error-handler";

export default class ExampleService extends BaseService<
  Example,
  ExampleRepository
> {
  constructor() {
    super();
    this.repo = new ExampleRepository();
  }

  async get(id: string): Promise<Example> {
    const record = await this.repo.get(id);

    if (!record) {
      ErrorHandler.notFound();
      return;
    }

    return record;
  }

  async remove(id: string): Promise<number> {
    return await this.repo.remove(id);
  }

  async query(parentId: string): Promise<Array<Example>> {
    return await this.repo.query(parentId);
  }

  async save(payload: Example): Promise<Example> {
    if (!payload || payload.id) {
      ErrorHandler.badInput("Cannot insert record with an id.");
      return;
    }

    return await this.repo.upsert(payload);
  }

  async update(payload: Example): Promise<Example> {
    if (!payload || !payload.id) {
      ErrorHandler.badInput("Cannot update record without an id.");
      return;
    }

    if (!(await this.repo.exists(payload.id))) {
      ErrorHandler.badInput("No matching record.");
      return;
    }

    return await this.repo.upsert(payload);
  }

  async upsert(payload: Example): Promise<Example> {
    if (payload.id) {
      return await this.update(payload);
    } else {
      return await this.save(payload);
    }
  }
}
