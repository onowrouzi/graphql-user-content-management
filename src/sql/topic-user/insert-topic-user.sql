INSERT INTO "topic_user" (user_id, topic_id, topic_role)
VALUES (${user_id}, ${topic_id}, ${topic_role})
RETURNING *;
