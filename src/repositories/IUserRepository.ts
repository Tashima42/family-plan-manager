import {User} from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>,
  findByUsername(username: string): Promise<User>,
  findById(id: number): Promise<User>,
}
