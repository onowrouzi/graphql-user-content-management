/**
 * Means of strictly typing nexus schema types to avoid random typos.
 * NOTE: values corresponding with database tables should match casing.
 */
export const enum SchemaTypes {
  Comment = "comment",
  CommentInput = "comment_input",
  Post = "post",
  PostInput = "post_input",
  Base = "base",
  User = "user",
  UserInput = "user_input",
  Example = "example",
  ExampleInput = "example_input"
}
