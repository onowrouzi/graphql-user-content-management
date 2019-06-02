import { BaseService } from "./base.service";
import { User } from "./../schemas/user";
import UsersRepository from "./../repositories/user.repository";
import ErrorHandler from "../utilities/error-handler";

const bcrypt = require("bcrypt");

export default class UserService extends BaseService<User, UsersRepository> {
  private emailRegex = /^([\w\.\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]{3,}\@([a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}))$/;
  private pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor() {
    super();
    this.repo = new UsersRepository();
  }

  async login(email: string, password: string): Promise<User> {
    var user = await this.repo.getByEmail(email);

    if (
      user != null &&
      user.id != null &&
      (await bcrypt.compare(password, user.password_hash))
    ) {
      return user;
    }

    ErrorHandler.badInput("Email or password did not match.");
  }

  async get(id: string): Promise<User> {
    const record = await this.repo.get(id);

    if (!record) {
      ErrorHandler.notFound();
    }

    return record;
  }

  async remove(id: string, reqUserId: string): Promise<number> {
    if (id != reqUserId) {
      ErrorHandler.notAuthorized();
    }

    return await this.repo.remove(id);
  }

  async query(parentId: string): Promise<Array<User>> {
    return await this.repo.all(parentId);
  }

  async create(payload: User, password: string): Promise<User> {
    if (!payload || payload.id) {
      ErrorHandler.badInput("Cannot insert record with an id.");
    }

    if (!password) {
      ErrorHandler.badInput("Must supply a password for a new user.");
    }

    if (!this.emailRegex.test(payload.email)) {
      ErrorHandler.badInput("Email is not valid.");
    }

    if (!this.pwdRegex.test(password)) {
      ErrorHandler.badInput("Password is not valid.");
    }

    const user = await this.repo.getByEmail(payload.email);
    if (user) {
      ErrorHandler.badInput("User email already exists.");
      return;
    }

    const hash = await bcrypt.hash(password, 10);

    return await this.repo.create(payload, hash);
  }

  async save(payload: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async update(payload: User): Promise<User> {
    if (!payload || !payload.id) {
      ErrorHandler.badInput("Cannot update record without an id.");
    }

    if (!(await this.repo.exists(payload.id))) {
      ErrorHandler.badInput("No matching record.");
    }

    return await this.repo.upsert(payload);
  }
}
