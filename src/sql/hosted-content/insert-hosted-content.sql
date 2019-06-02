INSERT INTO "hosted_content" (user_id, content_type, hosted_url) 
VALUES(${user_id}, ${content_type}, ${hosted_url})
RETURNING *;