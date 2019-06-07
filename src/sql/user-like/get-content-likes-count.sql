SELECT COUNT(*) FROM "user_like"
WHERE content_id = ${content_id} 
    AND liked = ${liked}
    AND deleted = FALSE;