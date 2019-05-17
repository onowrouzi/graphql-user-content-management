UPDATE ${table~}
SET first_name = ${first_name}
    last_name = ${last_name}
    email = ${email}
    updated_at = current_timestamp
WHERE id = ${id}
RETURNING *;