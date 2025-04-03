import { arweaveSearchNode } from "./helpers/arweave/config/arweaveInstance";
import * as user from "./services/user";
import { User } from "./types";

export class ProtocolLandSDK {
  constructor(host?: string) {
    if (host) {
      arweaveSearchNode.api.config.host = host;
    }
  }

  getVersion() {
    return "0.0.1";
  }

  User() {
    return {
      createProfile: user.createProfile,
      updateProfile: user.updateProfile,
      getUserDetails: user.getUserDetails,
      getUsers: user.getUsers,
      getUsernameAvailable: user.getUsernameAvailable,
    };
  }
}
