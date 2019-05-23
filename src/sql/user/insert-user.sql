INSERT INTO "user" (first_name, last_name, email, password_hash) 
VALUES(${first_name}, ${last_name}, ${email}, ${password_hash})
RETURNING *;