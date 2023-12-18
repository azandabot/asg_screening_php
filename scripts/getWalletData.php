<?php
require_once 'dbconfig.php';
$db = new Database; 

$data = $db->execPDOQuery('sp_getWalletData', null, ['get' => 'all'])->fetchAll(PDO::FETCH_ASSOC);

$response = ['success' => true, 'data' => $data];

header('Content-Type: application/json');
echo json_encode($response);
?>
