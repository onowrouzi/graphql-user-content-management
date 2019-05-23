SELECT * FROM "comment"
WHERE post_id = ${post_id} AND comment_id IS NULL
ORDER BY created_at;