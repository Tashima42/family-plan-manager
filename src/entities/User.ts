export class User {
  private username: string;
  private password: string;
  private name: string;
  private id: number;

  constructor(username: string, name: string, password: string, id?: number) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.id = id;
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
  getId(): number {
    return this.id;
  }
  setId(id: number): void {
    this.id = id;
  }
  setPassword(password: string): void {
    this.password = password;
  }
}
