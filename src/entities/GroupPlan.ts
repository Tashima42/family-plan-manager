export class GroupPlan {
  private name: string;
  private description: string;
  private totalAmmount: number;
  private dueDate: Date;
  private id: number;

  constructor(name: string, description: string, totalAmmount: number, dueDate: Date, id?: number) {
    this.name = name;
    this.description = description;
    this.totalAmmount = totalAmmount;
    this.dueDate = dueDate;
    this.id = id;
  }

  getName(): string {
    return this.name;
  }
  getDescription(): string {
    return this.description;
  }
  getTotalAmmount(): number {
    return this.totalAmmount;
  }
  getDueDate(): Date {
    return this.dueDate;
  }
  getId(): number {
    return this.id;
  }
  setId(id: number): void {
    this.id = id;
  }
}
