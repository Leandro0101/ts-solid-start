import { User } from "../entities/User";

export interface IUsersRepository {
  findByEmail(Email: string): Promise<User>;
  save(user: User): Promise<void>;
}