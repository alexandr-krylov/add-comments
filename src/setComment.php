<?php
require('dbConnect.php');
$pdo = getPDO();
$pdo->beginTransaction();
$getUserQuery = 'SELECT * FROM users WHERE user_name = :userName AND email = :email';
$pdoStatement = $pdo->prepare($getUserQuery);
$pdoStatement->execute(['userName' => $_POST['name'], 'email' => $_POST['email']]);

if ($pdoStatement->rowCount() == 0) {
    $userName = $pdo->quote($_POST['name']);
    $email = $pdo->quote($_POST['email']);
    $pdo->exec("INSERT INTO users (user_name, email) VALUES ($userName, $email)");
    $userId = $pdo->lastInsertId();
} else {
    $userId = $pdoStatement->fetch(PDO::FETCH_ASSOC)['id'];
}
$content = $pdo->quote($_POST['content']);
$insertCommentQuery = "INSERT INTO comments (article_id, author_id, content) VALUES (1, $userId, $content)";
$pdo->exec($insertCommentQuery);
$lastCommentId = $pdo->lastInsertId();
$pdo->commit();
echo json_encode($pdo->query(
    <<<QUERY
SELECT user_name, content, comments.created_at
FROM comments
LEFT JOIN users ON comments.author_id = users.id
WHERE comments.id = $lastCommentId
QUERY
)->fetch(PDO::FETCH_ASSOC));