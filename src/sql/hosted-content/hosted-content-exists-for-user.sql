SELECT EXISTS(SELECT 1 FROM "hosted_content" WHERE user_id = ${user_id} AND hosted_url = ${hosted_url});