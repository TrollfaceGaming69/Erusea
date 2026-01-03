<?php
session_start();

if (!isset($_SESSION['is_logged_in']) || $_SESSION['is_logged_in'] !== true) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/dashboard.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <title>Erusea</title>
</head>

<body>
    <header>
        <div class="container">
            <nav>
                <div class="logo">
                    AmbaShop
                    <span>Erusea</span>
                </div>

                <div class="nav-links">
                    <a href="#" class="nav-link active">Dashboard</a>
                    <a href="transactionhistory.php" class="nav-link">Transaction</a>
                </div>

                <div class="user-menu">
                    <div class="user-profile">
                        <i class="fa-regular fa-circle-user"></i>
                        <span><?php echo htmlspecialchars($_SESSION['username']); ?></span>
                    </div>
                    <div class="logout" onclick="window.location.href='../php/logout.php'">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Logout</span>
                    </div>
                </div>
            </nav>
        </div>
    </header>

    <main class="container">

        <p class="page-title">Manage transactions and view history</p>

        <div class="hero-banner">
            <div class="sale-info">
                <h3>Today's Sale</h3>
                <div class="sale-amount">
                    Rp 1.350.000
                    <div class="increase">
                        <i class="fa-solid fa-arrow-trend-up"></i>
                        <span>3,4% Increase</span>
                    </div>
                </div>
            </div>
        </div>

        <a href="transaction.html"><button class="btn-primary">
                Start a new transaction
            </button>

            <div class="transactions-section">
                <div class="section-header">
                    <h2>Recent Transactions</h2>
                    <a href="transactionhistory.php" class="view-all">
                        View All <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>

                <div class="transaction-list">
                    <div class="transaction-item">
                        <div class="t-left">
                            <div class="t-info">
                                <div class="t-id">JMK003</div>
                                <div class="t-date">2025-12-18</div>
                            </div>
                            <div class="t-separator">•</div>
                            <div class="t-price">Rp 450.000,00</div>
                        </div>
                        <div class="badge qris">
                            <i class="fa-solid fa-qrcode"></i> QRIS
                        </div>
                    </div>

                    <div class="transaction-item">
                        <div class="t-left">
                            <div class="t-info">
                                <div class="t-id">JKW023</div>
                                <div class="t-date">2025-12-18</div>
                            </div>
                            <div class="t-separator">•</div>
                            <div class="t-price">Rp 200.000,00</div>
                        </div>
                        <div class="badge cash">
                            <i class="fa-solid fa-money-bill-wave"></i> Cash
                        </div>
                    </div>

                    <div class="transaction-item">
                        <div class="t-left">
                            <div class="t-info">
                                <div class="t-id">ASW002</div>
                                <div class="t-date">2025-12-18</div>
                            </div>
                            <div class="t-separator">•</div>
                            <div class="t-price">Rp 180.000,00</div>
                        </div>
                        <div class="badge debit">
                            <i class="fa-solid fa-credit-card"></i> Debit
                        </div>
                    </div>

                </div>
            </div>

    </main>
</body>

</html>