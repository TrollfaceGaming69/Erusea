const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number).replace("IDR", "Rp").trim();
};

let storedCart = localStorage.getItem('transactionCart');
let transactionId = localStorage.getItem('lastTransactionId');
let cart = storedCart ? JSON.parse(storedCart) : [];
let grandTotal = 0;

if (transactionId) {
    document.getElementById('order-ref').innerText = transactionId;
} else {
    document.getElementById('order-ref').innerText = "ERROR-NO-ID";
    alert("Tidak ada transaksi aktif. Kembali ke menu utama.");
    window.location.href = 'transaction.php';
}

const renderTransactionItems = () => {
    const container = document.getElementById('payment-item-list');
    const countEl = document.getElementById('total-items-count');
    let subtotal = 0;
    let totalItems = 0;

    if(cart.length === 0) {
        container.innerHTML = '<div style="padding:20px; text-align:center;">No items found.</div>';
        return;
    }

    cart.forEach(item => {
        let itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        totalItems += item.qty;

        container.innerHTML += `
            <div class="item-row">
                <span class="item-name">${item.name}</span>
                <span class="item-qty">x${item.qty}</span>
                <span class="item-price">${formatRupiah(itemTotal)}</span>
            </div>
        `;
    });

    countEl.innerText = `${totalItems} Items`;

    const discountAmount = subtotal * 0.1; 
    grandTotal = subtotal - discountAmount;

    document.getElementById('summary-subtotal').innerText = formatRupiah(subtotal);
    document.getElementById('summary-discount').innerText = '-' + formatRupiah(discountAmount);
    document.getElementById('summary-total').innerText = formatRupiah(grandTotal);
    document.getElementById('big-display-total').innerText = formatRupiah(grandTotal);

    setupQuickAmounts(grandTotal);
};

const setupQuickAmounts = (total) => {
    const container = document.getElementById('quick-amounts-container');
    const option1 = total; 
    const option2 = Math.ceil(total / 50000) * 50000; 
    const option3 = option2 + 50000;

    let html = `<div class="amount-pill" onclick="setInputCash(${option1})">Uang Pas</div>`;
    
    if(option2 > option1) {
        html += `<div class="amount-pill" onclick="setInputCash(${option2})">${formatRupiah(option2)}</div>`;
    }
    html += `<div class="amount-pill" onclick="setInputCash(${option3})">${formatRupiah(option3)}</div>`;

    container.innerHTML = html;
};

const inputCashEl = document.getElementById('input-cash');
const changeDisplayEl = document.getElementById('change-display');

inputCashEl.addEventListener('input', (e) => {
    calculateChange(e.target.value);
});

function setInputCash(amount) {
    inputCashEl.value = amount;
    calculateChange(amount);
}

function calculateChange(cashIn) {
    const cash = parseFloat(cashIn);
    if (isNaN(cash) || cash < grandTotal) {
        changeDisplayEl.innerText = "Rp 0";
        changeDisplayEl.style.color = "red"; 
        return false; 
    } else {
        const change = cash - grandTotal;
        changeDisplayEl.innerText = formatRupiah(change);
        changeDisplayEl.style.color = "#10b981"; 
        return true; 
    }
}

window.processPayment = function(method) {

    if (method === 'Cash') {
        const cashVal = parseFloat(inputCashEl.value);
        if (isNaN(cashVal) || cashVal < grandTotal) {
            alert("Uang tunai kurang!");
            return;
        }
    }

    const btn = document.querySelector('.view-content.active .pay-btn');
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.disabled = true;

    fetch('../php/payment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            no_transaksi: transactionId,
            metode_bayar: method
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert("Pembayaran Berhasil! (" + method + ")");
            localStorage.removeItem('transactionCart');
            localStorage.removeItem('lastTransactionId');
            window.location.href = 'transaction.php'; 
        } else {
            alert("Gagal: " + data.message);
        }
    })
    .catch(err => {
        console.error(err);
        alert("Terjadi kesalahan koneksi");
    })
    .finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
    });
};

window.switchTab = function(method, element) {
    document.querySelectorAll('.method-card').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.view-content').forEach(el => el.classList.remove('active'));

    element.classList.add('active');
    document.getElementById(method + '-view').classList.add('active');

    const icon = element.querySelector('i').className;
    const text = element.querySelector('span').innerText;
    document.getElementById('badge-display').innerHTML = `<i class="${icon}"></i> ${text}`;
};

renderTransactionItems();