<?php
header('Content-Type: application/json');
session_start();

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'erusea';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$noTransaksi = $data['no_transaksi'] ?? '';
$metodeBayar = $data['metode_bayar'] ?? '';

if (empty($noTransaksi) || empty($metodeBayar)) {
    echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
    exit;
}

// Update Jenis Pembayaran di database
$stmt = $conn->prepare("UPDATE transaksi SET Jenis_Pembayaran = ? WHERE No_Transaksi = ?");
$stmt->bind_param("ss", $metodeBayar, $noTransaksi);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal update pembayaran']);
}

$stmt->close();
$conn->close();
?>