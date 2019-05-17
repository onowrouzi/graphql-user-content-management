INSERT INTO ${table~} (name, deleted) 
VALUES (${name}, false) 
RETURNING *;