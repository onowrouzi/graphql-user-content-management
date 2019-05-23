WITH RECURSIVE cte AS (
   SELECT id, array[id] AS path
   FROM   comment
   WHERE  comment_id = ${comment_id}

   UNION ALL
   SELECT c.id, cte.path || c.id
   FROM   "comment" c
   JOIN   cte ON c.comment_id = cte.id
)
SELECT MAX(array_length(path, 1)) from cte;