CREATE TABLE IF NOT EXISTS "user_like" (
  user_id UUID NOT NULL DEFAULT uuid_generate_v1(),
  content_id UUID NOT NULL DEFAULT uuid_generate_v1(),
  content_type VARCHAR(20) NOT NULL,
  liked BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, content_id),
  FOREIGN KEY (user_id) REFERENCES "user"(id)
)