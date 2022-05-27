import {User} from "../entities/User";
export interface IUserRepository {
  findByUsername(username: string): Promise<User>,
  findById(id: number): Promise<User>,
}
