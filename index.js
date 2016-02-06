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
        pizzaEl.dataset.id = pizza.id;
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

        pizzaEl.addEventListener("click", function (event) {
            if (event.target.classList.contains("buy")) {
                const cartItemEl = document.querySelector(".cart-other").querySelector(`[data-id='${pizza.id}']`);
                const quantity = Number(pizzaEl.querySelector("input").value);
                if(!cartItemEl) {
                    document.querySelector(".basket .cart-other").appendChild(createBasketItem(pizza, quantity));
                    document.querySelector(".total-sum").textContent = parseInt(document.querySelector(".total-sum").textContent)
                        + pizza.price * quantity + " UAH";
                } else {
                    cartItemEl.querySelector("input").value = Number(cartItemEl.querySelector("input").value) + quantity;
                    cartItemEl.querySelector(".item-sum").textContent = pizza.price * cartItemEl.querySelector("input").value + " UAH";
                    document.querySelector(".total-sum").textContent = parseInt(document.querySelector(".total-sum").textContent)
                        + pizza.price * quantity + " UAH";
                }
            } else if (event.target.classList.contains("minus")) {
                event.preventDefault();
                let inputElement = pizzaEl.querySelector("input");
                if (inputElement.value > 1) {
                    inputElement.value--;
                }
            } else if (event.target.classList.contains("plus")) {
                event.preventDefault();
                let inputElement = pizzaEl.querySelector("input");
                inputElement.value++;
            }
        });


        return pizzaEl;
    });

    pizzaElements.forEach(function (el) {
        document.querySelector(".goods-list").appendChild(el);
    });
});


function createBasketItem(pizza, quantity) {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.dataset.id = pizza.id;

    cartItem.innerHTML = `<span class="item-title">${pizza.name}</span>
                          <div class="cart-amount">
                              <a class="minus" href="#">-</a>
                              <input type="text" value="${quantity}">
                              <a class="plus" href="#">+</a>
                          </div>
                          <span class="item-price">${pizza.price} UAH</span>
                          <span class="item-sum">${pizza.price * quantity} UAH</span>
                          <a class="delete"></a>`;

    const input = cartItem.querySelector("input");
    const itemSum = cartItem.querySelector(".item-sum");

    cartItem.querySelector(".minus").addEventListener("click", function (event) {
        event.preventDefault();
        if (input.value > 1) {
            input.value--;
            itemSum.textContent = pizza.price * input.value + " UAH";
            document.querySelector(".total-sum").textContent = parseInt(document.querySelector(".total-sum").textContent)
                - pizza.price + " UAH";
        }
    });

    cartItem.querySelector(".plus").addEventListener("click", function (event) {
        event.preventDefault();
        input.value++;
        itemSum.textContent = pizza.price * input.value + " UAH";
        document.querySelector(".total-sum").textContent = parseInt(document.querySelector(".total-sum").textContent)
            + Number(pizza.price) + "UAH";
    });

    cartItem.querySelector(".delete").addEventListener("click", function (event) {
        document.querySelector(".total-sum").textContent = parseInt(document.querySelector(".total-sum").textContent) -
            input.value * pizza.price + " UAH";
        cartItem.remove();
    });

    return cartItem;
}