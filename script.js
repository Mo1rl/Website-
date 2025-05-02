// التعامل مع المخزون
document.getElementById("addProductForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const quantity = document.getElementById("quantity").value;
    const unitPrice = document.getElementById("unitPrice").value;
    const productNote = document.getElementById("productNote").value;

    if (productName && quantity && unitPrice) {
        let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

        const totalCost = quantity * unitPrice;
        inventory.push({ productName, quantity, unitPrice, productNote, totalCost });

        localStorage.setItem("inventory", JSON.stringify(inventory));
        updateInventoryTable();
    }
});

function updateInventoryTable() {
    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    const tableBody = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    inventory.forEach((item) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.productName;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = item.unitPrice;
        row.insertCell(3).textContent = item.totalCost;
    });
}

updateInventoryTable();

// التعامل مع المبيعات
document.getElementById("saleForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const customerPhone = document.getElementById("customerPhone").value;
    const saleProduct = document.getElementById("saleProduct").value;
    const saleQuantity = document.getElementById("saleQuantity").value;

    let sales = JSON.parse(localStorage.getItem("sales")) || [];

    sales.push({ customerPhone, saleProduct, saleQuantity });

    localStorage.setItem("sales", JSON.stringify(sales));
    updateSalesSummary();
});

function updateSalesSummary() {
    const sales = JSON.parse(localStorage.getItem("sales")) || [];
    const summaryData = document.getElementById("summaryData");
    summaryData.innerHTML = "<h3>العملاء والمبيعات:</h3>";

    sales.forEach((sale) => {
        summaryData.innerHTML += `<p>العميل: ${sale.customerPhone}, المنتج: ${sale.saleProduct}, الكمية: ${sale.saleQuantity}</p>`;
    });
}

updateSalesSummary();
