import CommentsRepository from "./comment.repository";
import PostsRepository from "./post.repository";
import UsersRepository from "./user.repository";
import ExamplesRepository from "./example.repository";

/**
 * Strictly type repositories to include.
 */
export interface Repositories {
  Comments: CommentsRepository;
  Posts: PostsRepository;
  Users: UsersRepository;
  Examples: ExamplesRepository;
}
