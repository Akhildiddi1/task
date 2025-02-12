const API_URL = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"; 
let cartData = {}; // Store cart data 

// Function to fetch cart data from API
async function fetchCartData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch cart data");
        let Data = await response.json();
        cartData = { ...Data };
        renderCart();  
        // console.log(cartData)
    } catch (error) {
        console.error("Error fetching cart data:", error);
    }
}
fetchCartData();


// format price in INR
function formatPrice(price) {
    return `₹${price.toLocaleString("en-IN")}`;
}


function renderCart() {
    console.log(cartData);
    console.log(Object.keys(cartData));
    console.log(Object.values(cartData));
    let cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let subtotal = 0;

    cartData.items.forEach((item, index) => {
        let itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal;
        // console.log(item)

        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="product">
                <img src="${item.image}" alt="${item.title}">
                <span class="product-name">${item.title}</span>
            </td>
            <td class="price">${formatPrice(item.price)}</td>
            <td class="quantity">
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            </td>
            <td class="subtotal">${formatPrice(itemSubtotal)}</td>
            <td class="remove">
                <img src="Assets/images/Vector.png" alt="Remove" onclick="removeItem(${index})">
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Update totals
    document.getElementById("subtotal-price").textContent = formatPrice(subtotal);
    document.getElementById("total-price").textContent = formatPrice(subtotal);
}

//update quantity
function updateQuantity(index, newQuantity) {
    newQuantity = parseInt(newQuantity);
    console.log("value", newQuantity);
    if (newQuantity < 1) return;

    cartData.items[index].quantity = newQuantity;
    renderCart();
}

//remove an item
function removeItem(index) {
    cartData.items.splice(index, 1);
    renderCart();
}

// Checkout function
function checkout() {
    alert("Proceeding to checkout with total: " + document.getElementById("total-price").textContent);
}
