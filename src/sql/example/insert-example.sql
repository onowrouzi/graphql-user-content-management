INSERT INTO ${table~} (name, deleted) 
VALUES (${name}, ${deleted}) RETURNING *;