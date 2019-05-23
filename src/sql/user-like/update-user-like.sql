UPDATE "user_like"
SET liked = ${liked}
WHERE user_id = ${user_id} AND content_id = ${content_id}
RETURNING *;