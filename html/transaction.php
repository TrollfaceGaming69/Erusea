
<?php
session_start();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/transaction.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <title>Erusea</title>
</head>
<body>
     <a href="dashboard.php">
        <div class="back-arrow"><i class="fa-solid fa-arrow-left"></i></div>
     </a>

    <main class="container main-layout">
        
        <section class="product-section">
            
            <div class="search-container">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input type="text" class="search-input" placeholder="Search Product">
            </div>

            <div class="filter-section">
                <div class="filter-label">
                    <i class="fa-solid fa-filter"></i> Filter by category:
                </div>
                <div class="filter-categories">
                    <span class="category-pill">All</span>
                    <span class="category-pill active">Popular</span>
                    <span class="category-pill">Meat</span>
                    <span class="category-pill">Seafood</span>
                    <span class="category-pill">Veggies</span>
                    <span class="category-pill">Fruits</span>
                    <span class="category-pill">Dairy</span>
                    <span class="category-pill">Body Care</span>
                </div>
            </div>

            <div class="product-grid">
                <div class="product-card">
                    <img src="https://images.unsplash.com/photo-1587912001191-0cd4f14fd89e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Croissant" class="p-image">
                    <div>
                        <div class="p-price">Rp 45.000</div>
                        <div class="p-name">Croissant butter filling frozen</div>
                        <div class="p-unit">1 pcs</div>
                    </div>
                    <button class="btn-add" data-kode="BRD001" data-price="45000">Add to list +</button>
                </div>

                <div class="product-card">
                    <img src="https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Onions" class="p-image">
                    <div>
                        <div class="p-price">Rp 17.800</div>
                        <div class="p-name">Onions 500 grams</div>
                        <div class="p-unit">500 grams</div>
                    </div>
                    <button class="btn-add" data-kode="VGT012" data-price="17800">Add to list +</button>
                </div>

                <div class="product-card">
                    <img src="https://images.unsplash.com/photo-1615205349253-9694e5d9654b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chicken" class="p-image">
                    <div>
                        <div class="p-price">Rp 37.800</div>
                        <div class="p-name">Whole broiler chicken 800 grams</div>
                        <div class="p-unit">800 grams</div>
                    </div>
                    <button class="btn-add" data-kode="MT016" data-price="37800">Add to list +</button>
                </div>

                <div class="product-card">
                    <img src="https://images.unsplash.com/photo-1549127024-18ee7271c819?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Milk" class="p-image">
                    <div>
                        <div class="p-price">Rp 27.800</div>
                        <div class="p-name">Fresh real bottled milk 800 ml</div>
                        <div class="p-unit">800 ml</div>
                    </div>
                    <button class="btn-add" data-kode="DRY112" data-price="27800">Add to list +</button>
                </div>

                <div class="product-card">
                    <img src="https://images.unsplash.com/photo-1657856282105-952b3c683d15?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Shrimp" class="p-image">
                    <div>
                        <div class="p-price">Rp 27.800</div>
                        <div class="p-name">Unpeeled fresh shrimp 500 grams</div>
                        <div class="p-unit">500 grams</div>
                    </div>
                    <button class="btn-add" data-kode="SF090" data-price="27800">Add to list +</button>
                </div>

                <div class="product-card">
                    <img src="https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Chili" class="p-image">
                    <div>
                        <div class="p-price">Rp 11.800</div>
                        <div class="p-name">Red fresh chili peppers 100 grams</div>
                        <div class="p-unit">100 grams</div>
                    </div>
                    <button class="btn-add" data-kode="VGT118" data-price="11800">Add to list +</button>
                </div>

                <div class="product-card">
                    <img src="https://images.unsplash.com/photo-1603048297172-c92544798d5a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Steak" class="p-image">
                    <div>
                        <div class="p-price">Rp 27.800</div>
                        <div class="p-name">Sirloin steak fresh 400 grams</div>
                        <div class="p-unit">400 grams</div>
                    </div>
                    <button class="btn-add" data-kode="MT020" data-price="27800">Add to list +</button>
                </div>

                <div class="product-card">
                    <img src="https://images.unsplash.com/photo-1696881694567-cd1a97958fc8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Soap" class="p-image">
                    <div>
                        <div class="p-price">Rp 14.300</div>
                        <div class="p-name">Solid bathing milk soap</div>
                        <div class="p-unit">1 pcs</div>
                    </div>
                    <button class="btn-add" data-kode="BC012" data-price="14300">Add to list +</button>
                </div>

            </div>
        </section>

    <section class="cart-section">
        <div class="order-header">
            <h2>Order List</h2>
            <button class="btn-remove-all" id="clear-cart">Remove all</button>
        </div>
    
        <div class="order-list" id="order-list-container">
        </div>
    
        <div class="cart-footer">
            <div class="total-row">
                <span class="total-label">Total</span>
                <span class="total-price" id="grand-total">Rp 0</span>
            </div>
            <div class="cart-actions">
                <button class="btn-save">Save</button>
                <button class="btn-checkout" id="btn-checkout-action">Checkout</button>
            </div>
        </div>
    </section>

    </main>

<script src="transaction.js"></script>
</body>
</html>