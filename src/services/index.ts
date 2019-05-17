import UserService from "./user.service";
import ExampleService from "./example.service";

/**
 * Simple method for initializing and retrieving necessary services.
 */
export function getServices(): Services {
  return {
    User: new UserService(),
    Example: new ExampleService()
  };
}

/**
 * Strictly type services to include.
 */
export interface Services {
    User: UserService;
  Example: ExampleService;
}
