UPDATE "user"
SET first_name = ${first_name}
    last_name = ${last_name}
    email = ${email}
    updated_at = CURRENT_TIMESTAMP
WHERE id = ${id}
RETURNING *;