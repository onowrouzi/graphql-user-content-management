INSERT INTO "user_like" (user_id, content_id, content_type, liked)
VALUES(${user_id}, ${content_id}, ${content_type}, ${liked})
RETURNING *;