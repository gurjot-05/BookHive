if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-area"); //remove button ki class
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("unit");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase.");
  var cartItems = document.getElementsByClassName("shop")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove(); //using inbuilt remove function
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  console.log("nope");
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("booknames")[0].innerText;
  console.log(title);
  var price = shopItem.getElementsByClassName("price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  console.log(title, price, imageSrc);
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  console.log("yes");
  var cartRow = document.createElement("div");
  cartRow.classList.add("box");
  var cartItems = document.getElementsByClassName("shop")[0];

  console.log(cartItems);
  var cartRowContents = `
        
            <div class="boxing">
                <img class="cart-item-image" src="${imageSrc}">
                <div class="contentss">
                   <h3> <span class="cart-item-title">${title}</span></h3>
                    <h4>Price: <span class="cart-price">${price}</span></h4>
                    <span id="quantity">Quantity: </span><input class="unit"  type="number" value="1" size="40">
                    <button  class="btn-area" type="button" style=" "><i aria-hidden="true" class="fa fa-trash"></i>Remove</button>
                </div>
            </div>

`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-area")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("unit")[0]
    .addEventListener("change", quantityChanged);
  document.querySelector(".right-bar").style.display = "block";
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("shop")[0];
  var cartRows = cartItemContainer.getElementsByClassName("box");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName("unit")[0];
    if (
      priceElement &&
      quantityElement &&
      priceElement.innerText &&
      quantityElement.value
    ) {
      let price = parseFloat(priceElement.innerText.replace("$", ""));
      let quantity = parseFloat(quantityElement.value);
      total += price * quantity;
    }
    // console.log(price)

    console.log(total);
  }
  total = Math.round(total * 100) / 100;
  if (total === 0) {
    cartRows.innerHTML = "";
    document.querySelector(".right-bar").style.display = "none";
  } else {
    document.querySelector(".right-bar").style.display = "block";
  }

  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
