'use strict';

let minusList = document.querySelectorAll(".minus");
let minusArray = Array.prototype.slice.call(minusList, 0);

minusArray.forEach(function (element) {
    element.addEventListener("click", function (event) {
        event.preventDefault();
        let inputElement = element.parentElement.querySelector("input");
        if (inputElement.value > 1) {
            inputElement.value--;
        }
    });
});

let plusList = document.querySelectorAll(".plus");
let plusArray = Array.prototype.slice.call(plusList, 0);

plusArray.forEach(function (element) {
    element.addEventListener("click", function (event) {
        event.preventDefault();
        let inputElement = element.parentElement.querySelector("input");
        inputElement.value++;
    });
});

function createBasketItem(pizza) {
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
    input.value = pizza.quantity;
    let plus = document.createElement("a");
    plus.classList.add("plus");
    plus.href = "#";
    plus.textContent = "+";
    let itemPrice = document.createElement("span");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = pizza.price + " UAH";
    let itemSum = document.createElement("span");
    itemSum.classList.add("item-sum");
    itemSum.textContent = pizza.price * pizza.quantity + " UAH";
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
            + pizza.price + "UAH";
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

let buyList = document.querySelectorAll(".buy");
let buyArray = Array.prototype.slice.call(buyList, 0);

buyArray.forEach(function (element) {
    element.addEventListener("click", function (event) {
        event.preventDefault();
        var pizza = {
            name: element.parentElement.parentElement.querySelector("h2").textContent,
            price: parseInt(element.parentElement.parentElement.querySelector(".goods-price").textContent),
            quantity: element.parentElement.parentElement.querySelector("input").value
        };
        document.querySelector(".basket .cart-other").appendChild(createBasketItem(pizza));
        document.querySelector(".total-sum").textContent = parseInt(document.querySelector(".total-sum").textContent)
            + pizza.price * pizza.quantity + " UAH";
    });
});
