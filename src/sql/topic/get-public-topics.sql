SELECT * FROM "topic"
WHERE is_private = FALSE AND deleted = FALSE
ORDER BY {$order_by};