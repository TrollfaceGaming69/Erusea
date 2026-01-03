const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number).replace("IDR", "Rp").trim();
    };


    document.getElementById('order-ref').innerText = 'JKW' + Math.floor(100 + Math.random() * 900);


    let storedCart = localStorage.getItem('transactionCart');
    let cart = storedCart ? JSON.parse(storedCart) : [];

    let grandTotal = 0;

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
        } else {
            const change = cash - grandTotal;
            changeDisplayEl.innerText = formatRupiah(change);
            changeDisplayEl.style.color = "#10b981"; 
        }
    }

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