export class Payment {
  private ammount: number;
  private attachment: string;
  private date: Date;
  private userId: number;
  private groupId: number;
  private description: string;
  private id: number;

  constructor(ammount: number, date: Date, userId: number, groupId: number, description?: string, attachment?: string, id?: number) {
    this.ammount = ammount;
    this.attachment = attachment;
    this.date = date;
    this.userId = userId;
    this.groupId = groupId;
    this.description = description;
    this.id = id;
  }

  getAmmount(): number {
    return this.ammount;
  }
  getDate(): Date {
    return this.date;
  }
  getUserId(): number {
    return this.userId;
  }
  getGroupId(): number {
    return this.groupId;
  }
  getDescription(): string {
    return this.description;
  }
  getAttachment(): string {
    return this.attachment;
  }
  getId(): number {
    return this.id;
  }
  setId(id: number): void {
    this.id = id;
  }
}
