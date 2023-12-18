<?php
    require_once 'dbconfig.php';
    $db = new Database;

    $itemName = $_POST['item_name'] ?? null;

    if ($itemName !== null) {
        $result = $db->execPDOQuery('pi_addWalletData', [$itemName], ['get' => 'aMsg']);
        $response = ['success' => true, 'message' => $result];
    } else {
        $response = ['success' => false, 'message' => 'item_name is required.'];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
