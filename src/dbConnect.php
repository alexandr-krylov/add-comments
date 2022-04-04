<?php
function getPDO()
{
    $dsn = 'mysql:dbname=test_project;host=mysql';
    $user = 'root';
    $password = 'secret';
    return new PDO($dsn, $user, $password);
}
