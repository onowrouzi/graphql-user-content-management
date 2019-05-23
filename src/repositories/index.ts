import UserLikesRepository from "./user-like.repository";
import CommentsRepository from "./comment.repository";
import PostsRepository from "./post.repository";
import UsersRepository from "./user.repository";
import ExamplesRepository from "./example.repository";

/**
 * Strictly type repositories to include.
 */
export interface Repositories {
 UserLikes: UserLikesRepository;
  Comments: CommentsRepository;
  Posts: PostsRepository;
  Users: UsersRepository;
  Examples: ExamplesRepository;
}
