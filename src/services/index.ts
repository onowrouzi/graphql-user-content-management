import ExampleService from "./example.service";

/**
 * Simple method for initializing and retrieving necessary services.
 */
export function getServices(): Services {
  return {
    Example: new ExampleService()
  };
}

/**
 * Strictly type services to include.
 */
export interface Services {
  Example: ExampleService;
}
