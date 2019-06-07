SELECT * FROM "topic" t
WHERE (${user_id} IN (SELECT user_id FROM "topic_user" WHERE topic_id = t.id AND deleted = FALSE) 
        OR (is_private = FALSE AND ${user_id} IS NULL))
        AND deleted = FALSE
ORDER BY ${order_by~};