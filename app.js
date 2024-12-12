"use strict";

let today = new Date().toLocaleDateString();
let previousCookieOpened = localStorage.getItem("cookieDate");

let cookieClicker = document.querySelector(".cookie");
cookieClicker.addEventListener("click", cookieClicked);

let messageTab;
let messageDisplay;
let messageBalise = document.querySelector(".message");
let indicationBalise = document.querySelector(".indication");
let cookieClickLeft = 3;

let indicationChange = [
    "Ooooh...",
    "Tu y es presque !",
    "Ton cookie est ouvert"
];

if (today == previousCookieOpened) {
    localStorage.setItem("cookieDate", today);
    messageDisplay = localStorage.getItem("messageSaved");
    writeMessage();
    lockBtn();
    writeIndication(3);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

fetch("assets/json/messages.json")
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        messageTab = structuredClone(json);
    })
    .catch((error) => {
        console.log(error);
    });

function cookieClicked(){
    if (cookieClickLeft == 0) {
        localStorage.setItem("cookieDate", today);
        messageDisplay = messageTab[getRandomIntInclusive(0, messageTab.length - 1)];
        localStorage.setItem("messageSaved", messageDisplay);
        writeMessage();
        lockBtn();
    }
    cookieClickLeft--;
    writeIndication(cookieClickLeft);
}

function lockBtn(){
    cookieClicker.classList.toggle("blocked");
}

function writeMessage(){
    messageBalise.innerText = messageDisplay;
}

function writeIndication(state){
    indicationBalise.innerText = indicationChange[(indicationChange.length - 1) - state];
}