<?php
require 'dbConnect.php';
$pdo = getPDO();
echo json_encode($pdo->query('SELECT * FROM articles WHERE id = 1')->fetch(PDO::FETCH_ASSOC));
