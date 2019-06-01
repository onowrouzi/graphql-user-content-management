import UserLikeService from "./user-like.service";
import CommentService from "./comment.service";
import PostService from "./post.service";
import UserService from "./user.service";
import AuthorizationService from "./authorization.service";

/**
 * Simple method for initializing and retrieving necessary services.
 */
export function getServices(): Services {
  return {
    Authorization: new AuthorizationService(),
    UserLike: new UserLikeService(),
    Comment: new CommentService(),
    Post: new PostService(),
    User: new UserService()
  };
}

/**
 * Strictly type services to include.
 */
export default interface Services {
  Authorization: AuthorizationService;
  UserLike: UserLikeService;
  Comment: CommentService;
  Post: PostService;
  User: UserService;
}
