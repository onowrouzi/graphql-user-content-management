import { BaseService } from "./base.service";
import { HostedContent } from "./../schemas/hosted-content";
import HostedContentsRepository from "./../repositories/hosted-content.repository";
import ErrorHandler from "../utilities/error-handler";

import http from "http";
import https from "https";
import RegexHelper from "../utilities/regex-helper";

export default class HostedContentService extends BaseService<
  HostedContent,
  HostedContentsRepository
> {
  constructor() {
    super();
    this.repo = new HostedContentsRepository();
  }

  async get(id: string): Promise<HostedContent> {
    const record = await this.repo.get(id);

    if (!record) {
      ErrorHandler.notFound();
    }

    return record;
  }

  async remove(id: string, userId: string): Promise<number> {
    const record = await this.repo.get(id);

    if (record.user_id != userId) {
      ErrorHandler.notAuthorized();
    }

    return await this.repo.remove(id);
  }

  async query(userId: string): Promise<Array<HostedContent>> {
    return await this.repo.getForUser(userId);
  }

  async save(payload: HostedContent, userId: string): Promise<HostedContent> {
    if (!payload.hosted_url || !RegexHelper.isValidUrl(payload.hosted_url)) {
      ErrorHandler.badInput("Must be a valid url.");
    }

    if (await this.repo.existsForUser(userId, payload.hosted_url)) {
      ErrorHandler.badInput(
        "Hosted content with given url already exists for this user."
      );
    }

    payload.user_id = userId;
    payload.content_type = await this.getContentType(payload.hosted_url);

    if (!payload.content_type) {
      ErrorHandler.badInput("Could not get content type from url.");
    }

    return await this.repo.insert(payload);
  }

  async update(payload: HostedContent): Promise<HostedContent> {
    throw new Error("Method not implemented.");
  }

  private async getContentType(url: string): Promise<string> {
    return new Promise((res, rej) => {
      try {
        const protocol = url.substr(0, 8) == "https://" ? https : http;
        protocol.get(url, response => {
          res(response.headers["content-type"]);
        });
      } catch (err) {
        res(null);
      }
    });
  }
}
