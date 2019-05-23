SELECT COUNT(*) FROM "user_like"
WHERE content_id = ${content_id} 
    AND content_type = ${content_type}
    AND liked = ${liked};