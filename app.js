let products = [];
let editId = null;

window.onload = function() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data.Products;
            renderTable();
        })
        .catch(error => {
            products = [];
            renderTable();
            console.error("Could not load products.json:", error);
        });
};

function renderTable() {
    let tbody = document.getElementById("productTable");
    tbody.innerHTML = "";
    products.forEach((prod) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${prod.id}</td>
            <td>${prod.name}</td>
            <td>${prod.price}</td>
            <td>${prod.qty}</td>
            <td>
                <button onclick="startEdit(${prod.id})">UPDATE</button>
                <button onclick="deleteItem(${prod.id})">DELETE</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function addItem() {
    let id = document.getElementById("productId").value.trim();
    let name = document.getElementById("productName").value.trim();
    let price = document.getElementById("price").value.trim();
    let qty = parseInt(document.getElementById("qty").value.trim());
    if (!id || !name || !price || isNaN(qty)) {
        alert("Please enter valid product details.");
        return;
    }

    if (editId !== null) {
        let prod = products.find(p => p.id == editId);
        if (prod) {
            prod.id = id;
            prod.name = name;
            prod.price = price;
            prod.qty = qty;
            editId = null;
        }
    } else {
        products.push({id: id, name: name, price: price, qty: qty});
    }
    clearForm();
    renderTable();
}

function startEdit(id) {
    let prod = products.find(p => p.id == id);
    if (prod) {
        document.getElementById("productId").value = prod.id;
        document.getElementById("productName").value = prod.name;
        document.getElementById("price").value = prod.price;
        document.getElementById("qty").value = prod.qty;
        editId = id;
    }
}

function deleteItem(id) {
    if (confirm("Are you sure you want to delete the product?")) {
        products = products.filter(p => p.id != id);
        renderTable();
    }
}

function clearForm() {
    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("qty").value = "";
    editId = null;
}