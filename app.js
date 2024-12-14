"use strict";

let today = new Date().toLocaleDateString();
let previousCookieOpened = localStorage.getItem("cookieDate");
let previosMessage = localStorage.getItem("messageSaved");

let cookieClicker = document.querySelector(".btn");
cookieClicker.addEventListener("click", cookieClicked);

let countdownBalise = document.querySelector(".countdown-timer");
let countdownText = "wait ... hours ... min ... sec before your next cookie";

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
    messageDisplay = previosMessage;
    writeMessage();
    // lockBtn();
    writeIndication(2);
    countdownTimer();
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
    let newMessage;
    do {
        newMessage = messageTab[getRandomIntInclusive(0, messageTab.length - 1)]
    } while (newMessage == previosMessage);
    messageDisplay = newMessage;
    localStorage.setItem("messageSaved", messageDisplay);
    writeMessage();
    // lockBtn();
    writeIndication(2);
    countdownTimer();

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
    let cookie = document.querySelector(".cookie--full");
    cookie.classList.add("anim__full--1");
}

function animBeforeEX2(){
    let cookie = document.querySelector(".cookie--full");
    cookie.classList.add("anim__full--2");

    // Timer à 700 car animation delay d'anim__full--2 à 0.5s et je rajoute 0.2s
    setTimeout(() => {
        document.querySelector(".cookie__fissure").classList.add("cookie__fissure--show");
    }, 700);

    cookie.addEventListener("animationend", animBeforeEX3)
}

function animBeforeEX3(){
    let cookie = document.querySelector(".cookie--full");
    cookie.classList.add("anim__full--3");
    
    cookie.addEventListener("animationend", animEX1)
}

function animEX1(){
    let cookie = document.querySelector(".cookie--broken");
    cookie.classList.add("anim__broken--1");

    let paper = document.querySelector(".prediction");
    paper.classList.add("anim__paper--1");

    paper.addEventListener("animationend", animPaper)
}

function animPaper(){
    let paper = document.querySelector(".prediction");
    paper.classList.add("anim__paper--2");
    paper.classList.add("anim__paper--3");
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


function countdownTimer() {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
  
    let todayDate = new Date(),
        dd = todayDate.getDate(),
        mm = String(todayDate.getMonth() + 1).padStart(2, "0"),
        yyyy = todayDate.getFullYear(),
        tomorrow = String(dd + 1).padStart(2, "0"),
        dayMonth = mm + "/" + tomorrow + "/",
        nextDay = dayMonth + yyyy;
    
    todayDate = mm + "/" + dd + "/" + yyyy;
    
    const countDown = new Date(nextDay).getTime(),
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown - now;
            let hours = Math.floor((distance % (day)) / (hour)),
            minutes = Math.floor((distance % (hour)) / (minute)),
            seconds = Math.floor((distance % (minute)) / second);
            countdownText = "wait " + hours + " hours " + minutes + " min " + seconds + " sec before your next cookie";
            countdownBalise.innerText = countdownText;
            countdownBalise.setAttribute("data-text", countdownText);
        }, 0)
};