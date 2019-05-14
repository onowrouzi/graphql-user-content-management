import { IResult } from "pg-promise/typescript/pg-subset";

import { Db } from "./../db";
import { SchemaTypes } from "./../schemas/schema-types";
import sql from "../sql/sql-parser";

/**
 * Abstract parent class to define common methods and properties
 * as well as set rules for child classes.
 *
 * tableName: literal name of database table (corresponding with T).
 * db: database connection object.
 */
export abstract class BaseRepository<T> {
  tableName: SchemaTypes;
  db: Db;

  constructor(tableName: SchemaTypes) {
    this.db = Db.get();
    this.tableName = tableName;
  }

  /**
   * Get a single record by primary key.
   * @param id : uuid (primary key)
   */
  async get(id: string): Promise<T> {
    return (await this.db.connection.oneOrNone(sql("get-by-id.sql"), [
      this.tableName,
      id
    ])) as T;
  }

  /**
   * Delete a single record by primary key.
   * @param id : uuid (primary key)
   */
  async remove(id: string): Promise<number> {
    return await this.db.connection.result(
      sql("delete-by-id.sql"),
      [this.tableName, id],
      (r: IResult) => r.rowCount
    );
  }

  /**
   * Get all records from table.
   */
  async all(): Promise<T[]> {
    return (await this.db.connection.any(sql("get-all-in-order-created.sql"), [
      this.tableName
    ])) as T[];
  }

  /**
   * Get total number of records from table.
   */
  async total(): Promise<number> {
    return await this.db.connection.one(
      sql("get-total-rows.sql"),
      [this.tableName],
      (a: { count: number }) => +a.count
    );
  }

  /**
   * Drop table, deleting all records and the table itself.
   */
  async dropTable(): Promise<null> {
    return await this.db.connection.none(sql("drop-table.sql"), [
      this.tableName
    ]);
  }

  /**
   * Clears all records from table as well as corresponding/dependent data from other tables.
   */
  async removeAll(): Promise<null> {
    return await this.db.connection.none(sql("remove-all-cascading.sql"), [
      this.tableName
    ]);
  }

  /**
   * Creates specific table. To be implemented by the child class.
   */
  abstract createTable(): Promise<null>;

  /**
   * Determines whether to insert or update data for table.
   * @param payload : T (type corresponding to table)
   */
  abstract upsert(payload: T): Promise<T>;

  /**
   * Inserts a record into given table.
   * @param payload : T (type corresponding to table)
   */
  abstract insert(payload: T): Promise<T>;

  /**
   * Updates data for corresponding with payload's id in given table.
   * @param payload : T (type corresponding to table)
   */
  abstract update(payload: T): Promise<T>;
}
