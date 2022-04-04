<?php
require('dbConnect.php');
$pdo = getPDO();
echo json_encode($pdo->query(
    <<<QUERY
SELECT user_name, content, comments.created_at
FROM comments
LEFT JOIN users ON comments.author_id = users.id
WHERE article_id = 1
ORDER BY comments.created_at
QUERY
)->fetchAll(PDO::FETCH_ASSOC));