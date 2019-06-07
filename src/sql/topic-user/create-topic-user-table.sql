CREATE TABLE IF NOT EXISTS "topic_user" (
  id UUID NOT NULL DEFAULT uuid_generate_v1(),
  user_id UUID NOT NULL,
  topic_id UUID NOT NULL,
  topic_role VARCHAR(20) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, topic_id),
  FOREIGN KEY (user_id) REFERENCES "user"(id),
  FOREIGN KEY (topic_id) REFERENCES "topic"(id)
)