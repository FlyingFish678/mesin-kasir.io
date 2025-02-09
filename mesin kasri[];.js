let items = [];
let total = 0;

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemPrice = parseFloat(document.getElementById('itemPrice').value);
    const itemQuantity = parseInt(document.getElementById('itemQuantity').value);

    if (itemName && itemPrice && itemQuantity) {
        const itemTotal = itemPrice * itemQuantity;
        items.push({ name: itemName, price: itemPrice, quantity: itemQuantity, total: itemTotal });

        // Update tampilan tabel
        updateTable();
        // Hitung total belanja
        calculateTotal();
        // Reset input
        document.getElementById('itemName').value = '';
        document.getElementById('itemPrice').value = '';
        document.getElementById('itemQuantity').value = '';
    } else {
        alert('Harap isi semua field!');
    }
}

function updateTable() {
    const tableBody = document.querySelector('#itemTable tbody');
    tableBody.innerHTML = '';

    items.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>${item.total.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Hapus</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function removeItem(index) {
    items.splice(index, 1);
    updateTable();
    calculateTotal();
}

function calculateTotal() {
    total = items.reduce((sum, item) => sum + item.total, 0);
    document.getElementById('totalAmount').textContent = `Rp${total.toFixed(2)}`;
}

function processPayment() {
    const paymentAmount = parseFloat(document.getElementById('paymentAmount').value);

    if (paymentAmount >= total) {
        const change = paymentAmount - total;
        document.getElementById('paymentResult').textContent = `Pembayaran berhasil! Kembalian: Rp${change.toFixed(2)}`;
    } else {
        document.getElementById('paymentResult').textContent = 'Pembayaran tidak cukup!';
    }
}