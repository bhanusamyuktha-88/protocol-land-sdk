import { arweaveSearchNode } from "./helpers/arweave/config/arweaveInstance";
import * as org from "./services/organization";
import * as repo from "./services/repository";
import * as user from "./services/user";
import * as issue from "./services/issues";
import * as hackathon from "./services/hackathon";
import * as pr from "./services/pull-request";

export class ProtocolLandSDK {
  constructor(host?: string) {
    if (host) {
      arweaveSearchNode.api.config.host = host;
    }
  }

  getVersion() {
    return "0.0.1";
  }

  user() {
    return user;
  }

  repository() {
    return repo;
  }

  organization() {
    return org;
  }

  issues() {
    return issue;
  }

  hackathon() {
    return hackathon;
  }

  pullRequest() {
    return pr;
  }
}
