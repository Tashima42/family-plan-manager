export class Payment {
  private ammount: string;
  private attachment: string;
  private paymentDate: Date;
  private dueDate: Date;
  private userId: number;
  private groupId: number;
  private description: string;
  private id: number;

  constructor(ammount: string, paymentDate: Date, dueDate: Date, userId: number, groupId: number, description?: string, attachment?: string, id?: number) {
    this.ammount = ammount;
    this.attachment = attachment;
    this.paymentDate = paymentDate;
    this.dueDate = dueDate;
    this.userId = userId;
    this.groupId = groupId;
    this.description = description;
    this.id = id;
  }

  getAmmount(): string {
    return this.ammount;
  }
  getPaymentDate(): Date {
    return this.paymentDate;
  }
  getDueDate(): Date {
    return this.dueDate;
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
