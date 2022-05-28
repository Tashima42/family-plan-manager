import {User} from "./User";

export class AuthorizationToken {
  private token: string;
  private user: User;
  private valid: boolean;
  private id: number;

  constructor(token: string, user: User, valid?: boolean, id?: number) {
    this.token = token;
    this.user = user;
    this.valid = valid ? valid : true;
    this.id = id;
  }

  getUser(): User {
    return this.user;
  }
  getUserId(): number {
    return this.user.getId();
  }
  getToken(): string {
    return this.token;
  }
  isTokenValid(): boolean {
    return this.valid;
  }
  disable(): void {
    this.valid = false;
  }
  getId(): number {
    return this.id
  }
  setId(id: number): void {
    this.id = id;
  }
}
