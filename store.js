if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() { 
    let removeCartItemButtons = document.getElementsByClassName('danger-btn');
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('CartQuantityInput');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    let addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
    alert('Thank you for your purchase!');
    let cartItems = document.getElementsByClassName('CartItems')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    let input = event.target;
    // TODO nice to fix input.value <= 0 not working. For example, if the user enter a negative number, it should be replaced with 1 
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('ItemTitle')[0].innerText;
    let price = shopItem.getElementsByClassName('ItemPrice')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('ItemImage')[0].src;
    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('CartRow');
    let cartItems = document.getElementsByClassName('CartItems')[0];
    let cartItemNames = cartItems.getElementsByClassName('CartItemTitle');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("This item is already added to the cart!");
            return;
        }
    }
    let cartRowContents = `
        <div class="CartItem">
            <img src="${imageSrc}" alt="Cart item thumbnail" width="100">
            <span class="CartItemTitle">${title}</span>
        </div>
        <span class="CartPrice">${price}</span>
        <div class="CartQuantity">
            <input class="CartQuantityInput" type="number" value="1" min="1">
            <button class="danger-btn" role="button">🗑️</button>
        </div>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('danger-btn')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('CartQuantityInput')[0].addEventListener('change', updateCartTotal);
}

function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('CartItems')[0];
    let cartRows = cartItemContainer.getElementsByClassName('CartRow');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('CartPrice')[0];
        let quantityElement = cartRow.getElementsByClassName('CartQuantityInput')[0];
        let price = parseFloat(priceElement.innerText.replace('$',''));
        let quantity = quantityElement.value;
        total += price*quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('CartTotalPrice')[0].innerText = '$' + total;
}