UPDATE "post"
SET title = ${title},
    content = ${content},
    updated_at = CURRENT_TIMESTAMP
WHERE id = ${id}
RETURNING *;