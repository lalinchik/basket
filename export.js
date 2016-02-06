"use strict";

let pizzaList = document.querySelectorAll(".goods-item");
let pizzaArray = Array.prototype.slice.call(pizzaList, 0);
console.log(pizzaArray);
let out = pizzaArray.map(function(element){
    return {
        name: element.querySelector("h2").textContent,
        img: element.querySelector(".image-block img").src,
        ingredient: element.querySelector(".ingredient").textContent,
        price: element.querySelector(".goods-price").textContent,
        weight: element.querySelector(".weight").textContent
    }
});

console.log(JSON.stringify(out));