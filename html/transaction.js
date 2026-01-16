let cart = [];

const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
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
            <i class="fa-solid fa-xmark oi-remove" style="cursor:pointer;" onclick="removeItem(${index})"></i>
        `;
        cartContainer.appendChild(itemHTML);
    });

    totalElement.innerText = formatRupiah(grandTotal);
};

const addToCart = (productName, productPrice, productCode) => {
    const existingItem = cart.find(item => item.code === productCode);
    const priceInt = parseInt(productPrice);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            code: productCode, 
            name: productName,
            price: priceInt, 
            qty: 1
        });
    }
    renderCart();
};

window.removeItem = (index) => {
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

        const price = e.target.getAttribute('data-price'); 
        const code = e.target.getAttribute('data-kode'); 

        if(!code) {
            console.error("Atribut data-kode hilang pada tombol!");
            return;
        }
        
        let finalPrice = price;
        if (!finalPrice) {
            const priceText = card.querySelector('.p-price').innerText;
            finalPrice = priceText.replace(/[^0-9]/g, '');
        }

        addToCart(name, finalPrice, code);
    });
});

document.getElementById('btn-checkout-action').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Cart is still empty!");
        return;
    }

    localStorage.setItem('transactionCart', JSON.stringify(cart));

    localStorage.removeItem('lastTransactionId');

    window.location.href = 'payment.php';
});