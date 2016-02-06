'use strict';

var xhr = new XMLHttpRequest();
xhr.open("GET", "/basket/pizza.json", true);
xhr.send();

xhr.addEventListener("error", function () {
    alert(xhr.status + ": " + xhr.statusText);
});

xhr.addEventListener("load", function (event) {
    var json = JSON.parse(xhr.responseText);

    const pizzaElements = json.map(function (pizza) {
        const pizzaEl = document.createElement("div");
        pizzaEl.classList.add("goods-item");
        pizzaEl.innerHTML = `<h2>${pizza.name}</h2>
            <div class="image-block">
                <img src="${pizza.img}">
                <div class="ingredient">${pizza.ingredient}</div>
            </div>
            <div class="goods-info">
                <span class="goods-price">${pizza.price} UAH</span>
                <span class="weight">${pizza.weight} gram</span>
            </div>
            <div class="goods-total">
                <div class="goods-quantity">
                    <a href="#" class="minus">-</a>
                    <input type="text" value="1" title="Quantity">
                    <a href="#" class="plus">+</a>
                </div>
                <button type="button" class="buy">Add to basket</button>
            </div>`;

        pizzaEl.addEventListener("click", function(event){
            if(event.target.classList.contains("buy")){
                const quantity = pizzaEl.querySelector("input").value;
                document.querySelector(".basket .cart-other").appendChild(createBasketItem(pizza, quantity));
                document.querySelector(".total-sum").textContent = parseInt(document.querySelector(".total-sum").textContent)
                    + pizza.price * quantity + " UAH";
            } else if(event.target.classList.contains("minus")){
                event.preventDefault();
                let inputElement = pizzaEl.querySelector("input");
                if (inputElement.value > 1) {
                    inputElement.value--;
                }
            } else if(event.target.classList.contains("plus")) {
                event.preventDefault();
                let inputElement = pizzaEl.querySelector("input");
                inputElement.value++;
            }
        });

        return pizzaEl;
    });

    pizzaElements.forEach(function(el){
        document.querySelector(".goods-list").appendChild(el);
    });
});












function createBasketItem(pizza, quantity) {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    let itemTitle = document.createElement("span");
    itemTitle.classList.add("item-title");
    itemTitle.textContent = pizza.name;
    let cartAmount = document.createElement("div");
    cartAmount.classList.add("cart-amount");
    let minus = document.createElement("a");
    minus.classList.add("minus");
    minus.href = "#";
    minus.textContent = "-";
    let input = document.createElement("input");
    input.value = quantity;
    let plus = document.createElement("a");
    plus.classList.add("plus");
    plus.href = "#";
    plus.textContent = "+";
    let itemPrice = document.createElement("span");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = pizza.price + " UAH";
    let itemSum = document.createElement("span");
    itemSum.classList.add("item-sum");
    itemSum.textContent = pizza.price * quantity + " UAH";
    let del = document.createElement("a");
    del.classList.add("delete");

    minus.addEventListener("click", function (event) {
        event.preventDefault();
        if (input.value > 1) {
            input.value--;
            itemSum.textContent = pizza.price * input.value + " UAH";
            document.querySelector(".total-sum").textContent = parseInt(document.querySelector(".total-sum").textContent)
                - pizza.price + " UAH";
        }
    });

    plus.addEventListener("click", function (event) {
        event.preventDefault();
        input.value++;
        itemSum.textContent = pizza.price * input.value + " UAH";
        document.querySelector(".total-sum").textContent = parseInt(document.querySelector(".total-sum").textContent)
            + Number(pizza.price) + "UAH";
    });

    del.addEventListener("click", function (event) {
        document.querySelector(".total-sum").textContent = parseInt(document.querySelector(".total-sum").textContent) -
            input.value * pizza.price + " UAH";
        cartItem.remove();
    });

    cartItem.appendChild(itemTitle);
    cartItem.appendChild(cartAmount);
    cartItem.appendChild(itemPrice);
    cartItem.appendChild(itemSum);
    cartItem.appendChild(del);
    cartAmount.appendChild(minus);
    cartAmount.appendChild(input);
    cartAmount.appendChild(plus);

    return cartItem;
}