UPDATE "comment"
SET content = ${content},
    updated_at = CURRENT_TIMESTAMP
WHERE id = ${id}
RETURNING *;