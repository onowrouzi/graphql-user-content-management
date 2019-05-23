UPDATE "example"
SET name = ${name}, 
    updated_at = CURRENT_TIMESTAMP
WHERE id = ${id} 
RETURNING *;