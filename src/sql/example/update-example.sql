UPDATE ${table~} 
SET name = ${name}, 
    updated_at = ${updated_at} 
WHERE id = ${id} RETURNING *;