SELECT * FROM "user_like" 
WHERE user_id = ${user_id}
ORDER BY created_at;