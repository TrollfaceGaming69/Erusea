   let cart = [];

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number).replace("IDR", "Rp").trim();
    };

    // 3. Fungsi Helper untuk Mengubah String "Rp 15.000" menjadi angka 15000
    const parsePrice = (priceString) => {
        // Hapus "Rp", spasi, dan titik ribuan
        return parseInt(priceString.replace(/[^0-9]/g, ''));
    };

    // 4. Fungsi Render: Menampilkan isi array 'cart' ke HTML
    const renderCart = () => {
        const cartContainer = document.getElementById('order-list-container');
        const totalElement = document.getElementById('grand-total');
        
        // Kosongkan tampilan list saat ini
        cartContainer.innerHTML = '';

        let grandTotal = 0;

        cart.forEach((item, index) => {
            // Hitung subtotal per item (Harga x Qty)
            const subtotal = item.price * item.qty;
            grandTotal += subtotal;

            // Buat elemen HTML untuk item
            const itemHTML = document.createElement('div');
            itemHTML.classList.add('order-item');
            itemHTML.innerHTML = `
                <span class="oi-name">${item.name}</span>
                <span class="oi-qty">x${item.qty}</span>
                <span class="oi-price">${formatRupiah(subtotal)}</span>
                <i class="fa-solid fa-xmark oi-remove" onclick="removeItem(${index})"></i>
            `;
            cartContainer.appendChild(itemHTML);
        });

        // Update Total Harga Keseluruhan
        totalElement.innerText = formatRupiah(grandTotal);
    };

    // 5. Fungsi Menambah ke Keranjang
    const addToCart = (productName, productPrice) => {
        // Cek apakah produk sudah ada di keranjang
        const existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            // Jika ada, tambahkan quantity-nya
            existingItem.qty += 1;
        } else {
            // Jika belum ada, masukkan sebagai item baru
            cart.push({
                name: productName,
                price: productPrice,
                qty: 1
            });
        }

        // Render ulang tampilan keranjang
        renderCart();
    };

    // 6. Fungsi Menghapus Item (Opsional, agar tombol X berfungsi)
    const removeItem = (index) => {
        cart.splice(index, 1);
        renderCart();
    };

    // 7. Fungsi Menghapus Semua (Tombol Remove All)
    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = [];
        renderCart();
    });

    // 8. Event Listener: Pasang fungsi ke semua tombol "Add to list +"
    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', (e) => {
            // Cari elemen card terdekat dari tombol yang diklik
            const card = e.target.closest('.product-card');
            
            // Ambil data nama dan harga dari card tersebut
            const name = card.querySelector('.p-name').innerText;
            const priceText = card.querySelector('.p-price').innerText;
            const price = parsePrice(priceText);

            // Jalankan fungsi tambah
            addToCart(name, price);
        });
    });


document.getElementById('btn-checkout-action').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }
    // Simpan data keranjang ke Local Storage browser
    localStorage.setItem('transactionCart', JSON.stringify(cart));
    
    // Pindah ke halaman payment
    window.location.href = 'payment.html'; // Sesuaikan nama file payment Anda
});