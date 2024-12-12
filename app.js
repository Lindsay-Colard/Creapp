"use strict";

let today = new Date().toLocaleDateString();
let previousCookieOpened = localStorage.getItem("cookieDate");

let cookieClicker = document.querySelector(".cookie");
cookieClicker.addEventListener("click", cookieClicked);

let messageTab;
let messageDisplay;
let messageBalise = document.querySelector(".message");
let indicationBalise = document.querySelector(".indication");
let indicationMessage = "Cliquez sur le biscuit";

let indicationChange = [
    "Ooooh...",
    "Tu y es presque !",
    "Ton cookie est ouvert"
];

if (today == previousCookieOpened) {
    localStorage.setItem("cookieDate", today);
    messageDisplay = localStorage.getItem("messageSaved");
    writeMessage();
    // lockBtn();
    writeIndication(2);
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
    localStorage.setItem("cookieDate", today);
    messageDisplay = messageTab[getRandomIntInclusive(0, messageTab.length - 1)];
    localStorage.setItem("messageSaved", messageDisplay);
    writeMessage();
    // lockBtn();
    writeIndication(2);

    // ANIMATION TRIGGERS
    animTouch();
    animBeforeEX1();

    document.querySelector(".cookie--full").addEventListener("animationend", animBeforeEX2);

    
};

// ANIMATIONS
function animTouch(){
    let animCircles = document.querySelectorAll(".touch__circle");
    animCircles.forEach(circle => {
        circle.classList.add("touch__circle--anim");
    });
}

function animBeforeEX1(){
    let cookieFull = document.querySelector(".cookie--full");
    cookieFull.classList.add("cookie--full--anim1");
}

function animBeforeEX2(){
    let cookieFull = document.querySelector(".cookie--full");
    cookieFull.classList.add("cookie--full--anim2");
    setTimeout(() => {
        document.querySelector(".svg__fissure").classList.add("svg__fissure--open");
    }, 700);

    document.querySelector(".cookie--full").addEventListener("animationend", animBeforeEX3)
}

function animBeforeEX3(){
    let cookieGlobal = document.querySelector(".cookie--anim");
    let cookieFull = document.querySelector(".cookie--full");
    cookieGlobal.classList.add("cookie--anim3");
    cookieFull.classList.add("cookie--full--anim3");
}

function lockBtn(){
    cookieClicker.classList.toggle("blocked");
}

function writeMessage(){
    messageBalise.innerText = messageDisplay;
}

function writeIndication(state){
    indicationMessage = indicationChange[state];
    indicationBalise.innerText = indicationMessage;
    indicationBalise.setAttribute("data-text", indicationMessage);
}