UPDATE "topic_user"
SET topic_role = ${topic_role}
WHERE topic_id = ${topic_id} AND user_id = ${user_id}
RETURNING *;