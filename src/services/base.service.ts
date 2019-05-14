/**
 * Abstract parent class to set requirements for services.
 */
export abstract class BaseService<T, Repository> {
  repo: Repository;

  constructor() {}

  /**
   * Get single record by id.
   * @param id : uuid (primary key)
   */
  abstract get(id: string): Promise<T>;

  /**
   * Remove single record by id.
   * @param id : uuid (primary key)
   */
  abstract remove(id: string): Promise<number>;

  /**
   * Query by foreign key.
   * @param parentId : uuid (foreign key)
   */
  abstract query(parentId: string): Promise<Array<T>>;

  /**
   * Inserts a record that matches the type T.
   * @param payload : T (generic to be defined in instantiated service/class)
   */
  abstract save(payload: T): Promise<T>;

  /**
   * Updates a record that matches the type T and payload's id (uuid).
   * @param payload : T (generic to be defined in instantiated service/class)
   */
  abstract update(payload: T): Promise<T>;
}
