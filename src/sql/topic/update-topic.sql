UPDATE "topic"
SET title = ${title}
    is_private = ${is_private}
WHERE id = {$id}
RETURNING *;