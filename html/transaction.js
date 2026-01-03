let cart = [];

const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number).replace("IDR", "Rp").trim();
};

const parsePrice = (priceString) => {
    return parseInt(priceString.replace(/[^0-9]/g, ''));
};

const renderCart = () => {
    const cartContainer = document.getElementById('order-list-container');
    const totalElement = document.getElementById('grand-total');

    cartContainer.innerHTML = '';

    let grandTotal = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.qty;
        grandTotal += subtotal;

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

    totalElement.innerText = formatRupiah(grandTotal);
};

const addToCart = (productName, productPrice, productCode) => {

    const existingItem = cart.find(item => item.code === productCode);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            code: productCode, 
            name: productName,
            price: productPrice,
            qty: 1
        });
    }

    renderCart();
};

const removeItem = (index) => {
    cart.splice(index, 1);
    renderCart();
};

document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    renderCart();
});

document.querySelectorAll('.btn-add').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const name = card.querySelector('.p-name').innerText;
        const priceText = card.querySelector('.p-price').innerText;
        const price = parsePrice(priceText);

        const code = e.target.getAttribute('data-kode'); 

        if(!code) {
            console.error("Lupa kasih data-kode di HTML tombol ini!");
            return;
        }

        addToCart(name, price, code);
    });
});

document.getElementById('btn-checkout-action').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Cart is still empty!");
        return;
    }

    const btnCheckout = document.getElementById('btn-checkout-action');
    btnCheckout.innerText = "Processing...";
    btnCheckout.disabled = true;

    fetch('transaction.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            localStorage.setItem('transactionCart', JSON.stringify(cart));
            window.location.href = 'payment.html'; 
        } else {
            alert('Failed to update stock: ' + data.message);
            btnCheckout.innerText = "Checkout";
            btnCheckout.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to connect to database.');
        btnCheckout.innerText = "Checkout";
        btnCheckout.disabled = false;
    });
});