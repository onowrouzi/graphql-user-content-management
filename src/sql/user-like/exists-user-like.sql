SELECT EXISTS(
    SELECT 1 FROM "user_like" 
    WHERE user_id = ${user_id} 
        AND content_id = ${content_id}
        AND deleted = FALSE
);