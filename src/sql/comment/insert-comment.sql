INSERT INTO "comment" (user_id, post_id, comment_id, content)
VALUES (${user_id}, ${post_id}, ${comment_id}, ${content})
RETURNING *;