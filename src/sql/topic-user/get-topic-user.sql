SELECT * FROM "topic_user"
WHERE topic_id = ${topic_id} AND user_id = ${user_id} AND deleted = FALSE;