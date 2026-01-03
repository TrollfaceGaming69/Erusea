<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/transactionhistory.css">
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
                    <a href="dashboard.html" class="nav-link">Dashboard</a>
                    <a href="#" class="nav-link active">Transaction</a>
                </div>

                <div class="user-menu">
                    <div class="user-profile">
                        <i class="fa-regular fa-circle-user"></i>
                         <span><?php echo htmlspecialchars($_SESSION['username']); ?></span>
                    </div>
                    <div class="logout">
                        <i class="fa-solid fa-arrow-right-from-bracket"></i>
                        <span>Logout</span>
                    </div>
                </div>
            </nav>
        </div>
    </header>

    <div class="container">
        <header class="header">
            <div class="header-text">
                <h1>Transaction History</h1>
                <p>View all of your transaction history here</p>
            </div>
            <div class="header-actions">
                <button class="btn btn-export">
                    <i class="fa-solid fa-download"></i> Export CSV
                </button>
                <a href="transaction.html"><button class="btn btn-primary">
                        New Transaction
                    </button>
                </a>
            </div>
        </header>

        <div class="controls">
            <div class="search-wrapper">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="search transaction ID">
            </div>
            <div class="filters">
                <button class="filter-btn active">All</button>
                <div class="filter-label">Method</div>
                <div class="filter-label">Date</div>
            </div>
        </div>

        <div class="transaction-list">
            
            <div class="transaction-card">
                <div class="col-id">JMK003</div>
                <div class="col-date"><span class="dot"></span> 2025-12-18</div>
                <div class="col-amount"><span class="dot"></span> Rp 450.000,00</div>
                <div class="col-method">
                    <span class="badge badge-qris">
                        <i class="fa-solid fa-qrcode"></i> QRIS
                    </span>
                </div>
                <button class="btn-details">View Details</button>
            </div>

            <div class="transaction-card">
                <div class="col-id">JKW023</div>
                <div class="col-date"><span class="dot"></span> 2025-12-18</div>
                <div class="col-amount"><span class="dot"></span> Rp 200.000,00</div>
                <div class="col-method">
                    <span class="badge badge-cash">
                        <i class="fa-solid fa-money-bill-wave"></i> Cash
                    </span>
                </div>
                <button class="btn-details">View Details</button>
            </div>

            <div class="transaction-card">
                <div class="col-id">KKK02</div>
                <div class="col-date"><span class="dot"></span> 2025-12-18</div>
                <div class="col-amount"><span class="dot"></span> Rp 180.000,00</div>
                <div class="col-method">
                    <span class="badge badge-debit">
                        <i class="fa-regular fa-credit-card"></i> Debit
                    </span>
                </div>
                <button class="btn-details">View Details</button>
            </div>

            <div class="transaction-card">
                <div class="col-id">JKW023</div>
                <div class="col-date"><span class="dot"></span> 2025-12-18</div>
                <div class="col-amount"><span class="dot"></span> Rp 200.000,00</div>
                <div class="col-method">
                    <span class="badge badge-cash">
                        <i class="fa-solid fa-money-bill-wave"></i> Cash
                    </span>
                </div>
                <button class="btn-details">View Details</button>
            </div>

            <div class="transaction-card">
                <div class="col-id">JKW023</div>
                <div class="col-date"><span class="dot"></span> 2025-12-18</div>
                <div class="col-amount"><span class="dot"></span> Rp 200.000,00</div>
                <div class="col-method">
                    <span class="badge badge-cash">
                        <i class="fa-solid fa-money-bill-wave"></i> Cash
                    </span>
                </div>
                <button class="btn-details">View Details</button>
            </div>
            
            <div class="transaction-card">
                <div class="col-id">JKW023</div>
                <div class="col-date"><span class="dot"></span> 2025-12-18</div>
                <div class="col-amount"><span class="dot"></span> Rp 200.000,00</div>
                <div class="col-method">
                    <span class="badge badge-cash">
                        <i class="fa-solid fa-money-bill-wave"></i> Cash
                    </span>
                </div>
                <button class="btn-details">View Details</button>
            </div>

        </div>

        <div class="footer">
            <div class="footer-info">
                Show <span>1</span> trough <span>7</span> transactions from <span class="max-transc">125</span> transactions.
            </div>
            <div class="pagination">
                <button class="page-btn"><i class="fa-solid fa-arrow-left"></i></button>
                <button class="page-btn active">1</button>
                <button class="page-btn">2</button>
                <button class="page-btn">3</button>
                <span class="page-dots">....</span>
                <button class="page-btn">125</button>
                <button class="page-btn"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>

    </div>
</body>
</html>