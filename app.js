"use strict";

let today = new Date().toLocaleDateString();
let previousCookieOpened = localStorage.getItem("cookieDate");
if (today == previousCookieOpened) {
    alert("You have already done your cookie today");
}

let cookieClicker = document.querySelector(".cookie");
cookieClicker.addEventListener("click", cookieClicked);

function cookieClicked(){
    previousCookieOpened = localStorage.getItem("cookieDate");

    if(today != previousCookieOpened){
        localStorage.setItem("cookieDate", today);
        alert("Nice, you have open your cookie")
    }
}