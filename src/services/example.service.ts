/**
 * Services should be the middleware for business logic between resolvers and repositories.
 */
import { BaseService } from "./base.service";
import ExampleRepository from "../repositories/example.repository";
import Example from "../schemas/example";

export default class ExampleService extends BaseService<
  Example,
  ExampleRepository
> {
  constructor() {
    super();
    this.repo = new ExampleRepository();
  }

  async get(id: string): Promise<Example> {
    return await this.repo.get(id);
  }

  async remove(id: string): Promise<number> {
    return await this.repo.remove(id);
  }

  async query(parentId: string): Promise<Array<Example>> {
    return await this.repo.query(parentId);
  }

  async save(payload: Example): Promise<Example> {
    return await this.repo.upsert(payload);
  }

  async update(payload: Example): Promise<Example> {
    return await this.repo.upsert(payload);
  }

  async upsert(payload: Example): Promise<Example> {
    return await this.repo.upsert(payload);
  }
}
