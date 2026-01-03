function switchTab(methodName, element) {
    const buttons = document.querySelectorAll('.method-card');
    buttons.forEach(btn => btn.classList.remove('active'));

    element.classList.add('active');

    const contents = document.querySelectorAll('.view-content');
    contents.forEach(content => content.classList.remove('active'));

    document.getElementById(methodName + '-view').classList.add('active');

    const badge = document.getElementById('badge-display');
    let iconHtml = '';
    let labelText = '';

    if(methodName === 'cash') {
        iconHtml = '<i class="fa-solid fa-wallet"></i>';
        labelText = 'Cash';
    } else if (methodName === 'qris') {
        iconHtml = '<i class="fa-solid fa-qrcode"></i>';
        labelText = 'QRIS';
    } else {
        iconHtml = '<i class="fa-regular fa-credit-card"></i>';
        labelText = 'Debit';
    }
    
    badge.innerHTML = `${iconHtml} ${labelText}`;
}





 