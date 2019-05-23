INSERT INTO "post" (user_id, title, content)
VALUES(${user_id}, ${title}, ${content})
RETURNING *;