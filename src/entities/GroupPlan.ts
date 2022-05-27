export class GroupPlan {
  private name: string;
  private description: string;
  private id: number;

  constructor(name: string, description: string, id?: number) {
    this.name = name;
    this.description = description;
    this.id = id;
  }

  getName(): string {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }
  getId(): number {
    return this.id;
  }
  setId(id: number): void {
    this.id = id;
  }
}
