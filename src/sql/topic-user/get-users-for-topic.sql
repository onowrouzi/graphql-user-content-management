SELECT * FROM "topic_user"
WHERE topic_id = ${topic_id} AND deleted = FALSE
ORDER BY created_at;