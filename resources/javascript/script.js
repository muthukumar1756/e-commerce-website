
const products = document.querySelector("#products");
const cart = document.querySelector("#cart");
const cartBox = document.querySelector(".cart-box");
const searchBox = document.querySelector(".product-search");
let cartList = [];
let productsData;

getAllProducts();

async function getAllProducts(){
    let result = await fetch("https://fakestoreapi.com/products");
    productsData = await result.json();

    productsData.forEach(product => {
        let productImage = product.image;
        let productTitle = product.title;
        let productPrice = product.price;
        let productRating = product.rating.rate;

        let productSpecification =`
        <div class="product">
            <img src=${productImage} alt="product image" class="product-img"/>
            <div class="product-content">
                <h3 class="product-title">${productTitle}</h3>
                <p class="product-price">Price: <b>${productPrice} $</b></p>
                <p class="product-rating">Rating: ${productRating}</p><br>
                <button class="buynow" onclick="alert('${productTitle} will be delivered soon')">Buy Now</button>
                <button class="add-cart" onclick="addToCart(${product.id})">Add to cart</button>
                </div>
        </div>`;
        products.innerHTML += productSpecification;    
    });
}

searchBox.addEventListener("input", filterProducts);

function filterProducts() {
    const searchTerm = searchBox.value.toLowerCase(); 

    products.innerHTML = "";

    const filteredProducts = productsData.filter(product => product.title.toLowerCase().includes(searchTerm));
    
    if (filteredProducts.length > 0) {
    filteredProducts.forEach(product => {
        let productImage = product.image;
        let productTitle = product.title;
        let productPrice = product.price;
        let productRating = product.rating.rate;

        let productSpecification =`
        <div class="product">
            <img src=${productImage} alt="product image" class="product-img"/>
            <div class="product-content">
                <h3 class="product-title">${productTitle}</h3>
                <p class="product-price">Price: <b>${productPrice} $</b></p>
                <p class="product-rating">Rating: ${productRating}</p><br>
                <button class="buynow" onclick="alert('${productTitle} will be delivered soon')">Buy Now</button>
                <button class="add-cart" onclick="addToCart(${product.id})">Add to cart</button>
                </div>
        </div>`;
        products.innerHTML += productSpecification;    
    });
    }
    else {
        products.innerHTML = `<h1 class="not-found" >No products found</h1>`;
    }
}

cart.addEventListener("click",openCart);

function openCart(){
    cartBox.classList.add("open-cart");
    displayCart(cartList);
}

function addToCart(productId) {
    const selectedProduct = productsData.find(item => item.id === productId);
    const existingItem = cartList.find(item => item.id === productId);

    if (existingItem) {
        alert("This is an existing product in the cart");
    }
    else {
        if (selectedProduct) {
            cartList.push(selectedProduct);
            openCart();
            updateCartCount(cartList);
        }
    }
}

function updateCartCount(cartList){
    const cartCount = document.querySelector(".cart-counter");
    const cartCountValue = cartList.length;
    cartCount.innerHTML = cartCountValue;
}

function displayCart(cartList){
    const myCart = document.querySelector(".open-cart");
    const cartTitle = `<div class="cart-header">
    <button class="close-cart" onclick="closeCart()">X</button>
    <h1 class="cart-title">MY CART</h1><br>
    <button class="buynow" onclick="alert('Your cart items will be delivered soon')">BUY ALL</button><br>
    <hr>
    </div>`
    myCart.innerHTML = cartTitle;

    if(cartList.length === 0){
        myCart.innerHTML += "Your Cart is empty"
    }
    else{
        cartList.forEach(item => {
            let itemImage = item.image;
            let itemTitle = item.title;
            let itemPrice = item.price;

            const itemProperties = `<div class="cart-item">
            <div class="cart-item-property">
                <img src=${itemImage} alt="Item image" class="item-img"/>
                <div class="item-details">
                    <p class="item-title">${itemTitle}</p>
                    <p class="item-price">Price: ${itemPrice} $</p>
                </div>
                <input type="number" value="1" class="cart-quantity" min="1">
                </div>
            <div class="item-toggle">      
                <button class="buynow" onclick="alert('${itemTitle} will be delivered soon')">Buy Now</button>
                <button class="remove-item" onclick="removeProduct(${item.id})">X</button>        
            </div>
            </div>`
            myCart.innerHTML += itemProperties;
        });
    }
}

function closeCart(){
    cartBox.classList.remove("open-cart");
}

function removeProduct(productId) {
    const cartArray = cartList.filter(item => item.id !== productId)
    cartList = cartArray;
    displayCart(cartList);
    updateCartCount(cartList); 
}