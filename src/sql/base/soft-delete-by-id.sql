UPDATE ${table~}
SET deleted = TRUE
WHERE id = ${id}
RETURNING deleted;