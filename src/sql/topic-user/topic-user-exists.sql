SELECT EXISTS(
    SELECT 1 FROM "topic_user" 
    WHERE user_id = ${user_id} 
        AND topic_id = ${topic_id}
        AND (topic_role IS NULL OR topic_role = ${topic_role}) 
        AND deleted = FALSE
);