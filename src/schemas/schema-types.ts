/**
 * Means of strictly typing nexus schema types to avoid random typos.
 * NOTE: values corresponding with database tables should match casing.
 */
export const enum SchemaTypes {
  Topic = "topic",
  TopicInput = "topic_input",
  UserLike = "user_like",
  UserLikeInput = "user_like_input",
  LikeTypes = "like_types",
  LikeTypesUnion = "like_types_union",
  LikableContent = "likable_content",
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
