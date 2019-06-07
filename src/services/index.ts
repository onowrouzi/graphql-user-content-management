import HostedContentService from "./hosted-content.service";
import UserLikeService from "./user-like.service";
import CommentService from "./comment.service";
import PostService from "./post.service";
import UserService from "./user.service";
import AuthorizationService from "./authorization.service";
import TopicService from "./topic.service";
import TopicUserService from "./topic-user.service";

/**
 * Simple method for initializing and retrieving necessary services.
 */
export function getServices(): Services {
  return {
    HostedContent: new HostedContentService(),
    Authorization: new AuthorizationService(),
    UserLike: new UserLikeService(),
    Comment: new CommentService(),
    Post: new PostService(),
    User: new UserService(),
    Topic: new TopicService(),
    TopicUser: new TopicUserService()
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
  HostedContent: HostedContentService;
  Topic: TopicService;
  TopicUser: TopicUserService;
}
