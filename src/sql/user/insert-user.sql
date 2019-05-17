INSERT INTO ${table~} (first_name, last_name, email, password_hash, deleted) 
VALUES(${first_name}, ${last_name}, ${email}, ${password_hash}, false)
RETURNING *;