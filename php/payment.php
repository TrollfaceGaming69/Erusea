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
    echo json_encode(['status' => 'error', 'message' => 'Koneksi database gagal']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$cartItems = $data['cart'] ?? [];
$metodeBayar = $data['metode_bayar'] ?? 'Cash';
$employeeId = $_SESSION['user_id'] ?? 1; 

if (empty($cartItems)) {
    echo json_encode(['status' => 'error', 'message' => 'Keranjang kosong']);
    exit;
}

$noTransaksi = "TRX-" . date("Ymd-His");
$tglWaktu = date("Y-m-d H:i:s");

$conn->begin_transaction();

try {
    $stmtHead = $conn->prepare("INSERT INTO transaksi (No_Transaksi, Tgl_Waktu, employee_id, Jenis_Pembayaran) VALUES (?, ?, ?, ?)");
    $stmtHead->bind_param("ssis", $noTransaksi, $tglWaktu, $employeeId, $metodeBayar);
    
    if (!$stmtHead->execute()) {
        throw new Exception("Gagal membuat transaksi header");
    }
    $stmtHead->close();

    $stmtCheck  = $conn->prepare("SELECT Satuan FROM barang WHERE Kode_Barang = ? FOR UPDATE");
    $stmtDetail = $conn->prepare("INSERT INTO detail_transaksi (No_Transaksi, Kode_Barang, Qty, Harga_Trans_Satuan, Diskon_Hemat) VALUES (?, ?, ?, ?, 0)");
    $stmtUpdate = $conn->prepare("UPDATE barang SET Satuan = Satuan - ? WHERE Kode_Barang = ?");

    foreach ($cartItems as $item) {
        $code = $item['code'];
        $qty  = $item['qty'];
        $price = $item['price'];

        $stmtCheck->bind_param("s", $code);
        $stmtCheck->execute();
        $resCheck = $stmtCheck->get_result();
        
        if ($resCheck->num_rows === 0) {
            throw new Exception("Barang dengan kode $code tidak ditemukan.");
        }

        $row = $resCheck->fetch_assoc();
        $currentStock = intval($row['Satuan']);

        if ($currentStock < $qty) {
            throw new Exception("Stok barang $code tidak mencukupi (Sisa: $currentStock). Transaksi dibatalkan.");
        }

        $stmtDetail->bind_param("ssid", $noTransaksi, $code, $qty, $price);
        if (!$stmtDetail->execute()) {
            throw new Exception("Gagal menyimpan detail barang $code");
        }

        $stmtUpdate->bind_param("is", $qty, $code);
        if (!$stmtUpdate->execute()) {
            throw new Exception("Gagal update stok barang $code");
        }
    }

    $stmtCheck->close();
    $stmtDetail->close();
    $stmtUpdate->close();

    $conn->commit();
    
    echo json_encode([
        'status' => 'success', 
        'no_transaksi' => $noTransaksi,
        'message' => 'Transaksi berhasil disimpan'
    ]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode([
        'status' => 'error', 
        'message' => $e->getMessage()
    ]);
}

$conn->close();
?>