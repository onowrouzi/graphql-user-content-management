import UsersRepository from "./user.repository";
import ExamplesRepository from "./example.repository";

/**
 * Strictly type repositories to include.
 */
export interface Repositories {
 Users: UsersRepository;
  Examples: ExamplesRepository;
}
