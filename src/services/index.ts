import CommentService from "./comment.service";
import PostService from "./post.service";
import UserService from "./user.service";
import ExampleService from "./example.service";

/**
 * Simple method for initializing and retrieving necessary services.
 */
export function getServices(): Services {
  return {
    Comment: new CommentService(),
    Post: new PostService(),
    User: new UserService(),
    Example: new ExampleService()
  };
}

/**
 * Strictly type services to include.
 */
export interface Services {
    Comment: CommentService;
    Post: PostService;
    User: UserService;
  Example: ExampleService;
}
