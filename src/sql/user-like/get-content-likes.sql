SELECT * FROM "user_like"
WHERE content_id = ${content_id} AND deleted = FALSE
ORDER BY created_at;