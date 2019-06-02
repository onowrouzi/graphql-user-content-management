import HostedContentRepository from "./hosted-content.repository";
import UserLikesRepository from "./user-like.repository";
import CommentsRepository from "./comment.repository";
import PostsRepository from "./post.repository";
import UsersRepository from "./user.repository";

/**
 * Strictly type repositories to include.
 */
export default interface Repositories {
  UserLikes: UserLikesRepository;
  Comments: CommentsRepository;
  Posts: PostsRepository;
  Users: UsersRepository;
  HostedContent: HostedContentRepository;
}
