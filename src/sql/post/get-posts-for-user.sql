SELECT * FROM "post"
WHERE user_id = ${user_id} AND topic_id IS NULL
ORDER BY created_at;