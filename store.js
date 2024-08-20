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
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value)) {
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
    let cartItems = document.getElementsByClassName('CartItems')[0];
    let cartRowContents = `
        <div class="Item">
            <span class="ItemTitle">Album 1</span>
            <img class="ItemImage" src="./img/a1.webp" alt="Album 1 thumbnail">
            <div>
                <span class="ItemPrice">$4.99</span>
                <button class="shop-item-button" role="button">ADD TO CART</button>
            </div>
        </div>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
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