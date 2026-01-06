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
$cartItems = json_decode($input, true);

if (empty($cartItems)) {
    echo json_encode(['status' => 'error', 'message' => 'Keranjang kosong']);
    exit;
}

$employeeId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null; 

// Generate Nomor Transaksi Unik (Contoh: TRX-20231025-120000)
$noTransaksi = "TRX-" . date("Ymd-His");
$tglWaktu = date("Y-m-d H:i:s");
$jenisPembayaran = "Cash"; // Default, nanti bisa diambil dari frontend jika ada pilihan

// 3. Mulai Transaksi Database
$conn->begin_transaction();

try {
    // A. Insert ke tabel `transaksi`
    $stmtHead = $conn->prepare("INSERT INTO transaksi (No_Transaksi, Tgl_Waktu, employee_id, Jenis_Pembayaran) VALUES (?, ?, ?, ?)");
    $stmtHead->bind_param("ssis", $noTransaksi, $tglWaktu, $employeeId, $jenisPembayaran);
    $stmtHead->execute();
    $stmtHead->close();

    // Siapkan statement untuk Detail dan Update Stok
    $stmtCheck  = $conn->prepare("SELECT Satuan FROM barang WHERE Kode_Barang = ? FOR UPDATE");
    $stmtDetail = $conn->prepare("INSERT INTO detail_transaksi (No_Transaksi, Kode_Barang, Qty, Harga_Trans_Satuan, Diskon_Hemat) VALUES (?, ?, ?, ?, 0)");
    $stmtUpdate = $conn->prepare("UPDATE barang SET Satuan = Satuan - ? WHERE Kode_Barang = ?");

    foreach ($cartItems as $item) {
        $code = $item['code'];
        $qty  = $item['qty'];
        $price = $item['price'];

        // B. Cek Stok (Kolom 'Satuan' di database Anda berisi jumlah stok)
        $stmtCheck->bind_param("s", $code);
        $stmtCheck->execute();
        $resCheck = $stmtCheck->get_result();
        
        if ($resCheck->num_rows === 0) {
            throw new Exception("Barang $code tidak ditemukan.");
        }

        $row = $resCheck->fetch_assoc();
        $currentStock = intval($row['Satuan']); // Konversi ke integer karena di DB varchar

        if ($currentStock < $qty) {
            throw new Exception("Stok barang $code kurang (Sisa: $currentStock).");
        }

        // C. Insert ke `detail_transaksi`
        $stmtDetail->bind_param("ssid", $noTransaksi, $code, $qty, $price);
        $stmtDetail->execute();

        // D. Kurangi Stok di tabel `barang` (Kolom Satuan)
        $stmtUpdate->bind_param("is", $qty, $code);
        $stmtUpdate->execute();
    }

    // Tutup statement
    $stmtCheck->close();
    $stmtDetail->close();
    $stmtUpdate->close();

    // Simpan perubahan permanen
    $conn->commit();
    
    echo json_encode(['status' => 'success', 'no_transaksi' => $noTransaksi]);

} catch (Exception $e) {
    $conn->rollback(); // Batalkan semua jika ada error
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}

$conn->close();
?>