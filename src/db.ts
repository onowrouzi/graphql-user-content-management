import Repositories from "./repositories";
import UserLikesRepository from "./repositories/user-like.repository";
import CommentsRepository from "./repositories/comment.repository";
import PostsRepository from "./repositories/post.repository";
import UsersRepository from "./repositories/user.repository";

import * as bluebird from "bluebird";
import { IMain, IDatabase, IOptions } from "pg-promise";
import pgPromise from "pg-promise";

/**
 * Singleton database connection class.
 */
export class Db {
  static instance: Db;
  connection: IDatabase<Repositories> & Repositories;

  public static get() {
    return this.instance || (this.instance = new this());
  }

  private constructor() {}

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
        obj.UserLikes = new UserLikesRepository();
        obj.Comments = new CommentsRepository();
        obj.Posts = new PostsRepository();
        obj.Users = new UsersRepository();
      }
    };

    const config = {
      host: process.env.POSTGRES_HOST,
      port: 5432,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      ssl: true
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
    this.connection.Posts.createTable();
    this.connection.Comments.createTable();
    this.connection.UserLikes.createTable();
  }
}
