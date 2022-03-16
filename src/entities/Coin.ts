export class Coin {
  private name: string;
  private price: string;
  private description: string;

  constructor(name: string, price: string, description: string) {
    this.name = name;
    this.price = price;
    this.description = description;
  }

  getName(): string {
    return this.name;
  }
  getPrice(): string {
    return this.price;
  }
  getDescription(): string {
    return this.description;
  }
}
