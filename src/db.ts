import UsersRepository from "./repositories/user.repository";
import * as bluebird from "bluebird";
import * as path from "path";
import { IMain, IDatabase, IOptions } from "pg-promise";
import pgPromise from "pg-promise";

import { Repositories } from "./repositories";
import ExamplesRepository from "./repositories/example.repository";

const cp = require("copyfiles");

/**
 * Singleton database connection class.
 */
export class Db {
  static instance: Db;
  connection: IDatabase<Repositories> & Repositories;

  public static get() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {
    this.copySqlFiles();
  }

  /**
   * Initial connection logic.
   * Configure connection settings in your .env file.
   */
  connect = async () => {
    if (Db.instance && Db.instance.connection) {
      return;
    }

    /**
     * Configures what promise library to use.
     * Also attaches repositories to the db connection
     * to be used where needed.
     */
    const initOptions: IOptions<Repositories> = {
      promiseLib: bluebird,
      extend(obj: Repositories, dc: any) {
        // define repositories here.
        obj.Users = new UsersRepository();
        obj.Examples = new ExamplesRepository();
      }
    };

    const config = {
      host: process.env.POSTGRES_HOST,
      port: 5432,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD
    };

    try {
      const pgp: IMain = pgPromise(initOptions);
      this.connection = <IDatabase<Repositories> & Repositories>pgp(config);
      this.createTables();
    } catch (err) {
      console.log("Error connecting to database", err);
    }
  };

  /**
   *  Creates tables for repositories.
   */
  createTables() {
    if (!this.connection) {
      return;
    }

    this.connection.Users.createTable();
    this.connection.Examples.createTable();
  }

  /**
   * Copies sql files from original src to a flattened sql directory in dist.
   */
  copySqlFiles() {
    const sqlDir = path.join(__dirname, "../src/sql/**/*.sql");
    const distDir = path.join(__dirname, "sql");

    cp([sqlDir, distDir], true, (err: any) => {
      if (err) {
        console.error(err);
      }
    });
  }
}
