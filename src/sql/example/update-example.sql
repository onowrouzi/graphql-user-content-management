UPDATE ${table~}
SET name = ${name}, 
    updated_at = current_timestamp
WHERE id = ${id} 
RETURNING *;