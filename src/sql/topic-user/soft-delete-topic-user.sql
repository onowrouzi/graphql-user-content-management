UPDATE topic_user
SET deleted = TRUE
WHERE topic_id = ${topic_id} AND user_id = ${user_id}
RETURNING *;