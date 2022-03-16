import {Coin} from "./Coin";

export class Collection {
  private name: string;
  private coins: Array<Coin>;

  constructor(name: string, coins: Array<Coin>) {
    this.name = name;
    this.coins = coins;
  }

  getName(): string {
    return this.name;
  }
  getCoins(): Array<Coin> {
    return this.coins;
  }
}
