import {Collection} from "./Collection";

export class User {
  private username: string;
  private password: string;
  private name: string;
  private collections: Array<Collection>;

  constructor(username: string, name: string, password: string, collections: Array<Collection>) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.collections = collections;
  }

  getPassword(): string {
    return this.password;
  }
  getUsername(): string {
    return this.username;
  }
  getName(): string {
    return this.name;
  }
  getCollections(): Array<Collection> {
    return this.collections;
  }
}
