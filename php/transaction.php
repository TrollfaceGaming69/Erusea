<?php
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';      
$pass = '';          
$db   = 'erusea'; 

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Koneksi database gagal']);
    exit;
}

$input = file_get_contents('php://input');
$cartItems = json_decode($input, true);

if (empty($cartItems)) {
    echo json_encode(['status' => 'error', 'message' => 'Data keranjang kosong']);
    exit;
}

$conn->begin_transaction(); 

try {
    $stmt = $conn->prepare("UPDATE Barang SET Satuan = Satuan - ? WHERE Kode_Barang = ?");

    foreach ($cartItems as $item) {
        $qty = $item['qty'];
        $code = $item['code'];

        $stmt->bind_param("is", $qty, $code);
        $stmt->execute();
    }

    $stmt->close();
    $conn->commit(); 
    
    echo json_encode(['status' => 'success']);

} catch (Exception $e) {
    $conn->rollback(); 
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

$conn->close();
?>