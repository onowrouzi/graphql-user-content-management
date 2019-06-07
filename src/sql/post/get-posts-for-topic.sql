SELECT * FROM "post"
WHERE topic_id = ${topic_id} AND deleted = FALSE
ORDER BY created_at;