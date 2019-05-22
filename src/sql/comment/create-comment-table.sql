CREATE TABLE IF NOT EXISTS ${table~} (
  id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1(),
  user_id UUID NOT NULL,
  post_id UUID NOT NULL,
  comment_id UUID,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted BOOLEAN DEFAULT false,
  FOREIGN KEY (user_id) REFERENCES "user"(id),
  FOREIGN KEY (post_id) REFERENCES "post"(id),
  FOREIGN KEY (comment_id) REFERENCES "comment"(id)
)