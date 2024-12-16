"use strict";

let today = new Date().toLocaleDateString();
let previousCookieOpened = localStorage.getItem("cookieDate");
let previousMessage = localStorage.getItem("messageSaved");

let cookieClicker = document.querySelector(".btn");
cookieClicker.addEventListener("click", cookieClicked);

let countdownBalise = document.querySelector(".countdown-timer");
let countdownText;

let newMessage;

let messageTab;
let messageDisplay;
let messageBalise = document.querySelector(".message");
let indicationBalise = document.querySelector(".indication");
let indicationMessage;

let indicationChange = [
    "Prêt pour une surprise? Tape le biscuit!",
    "Suspense... Qu’est-ce qui se cache là-dedans?",
    "Oh wow!",
    "Oups, le biscuit est déjà ouvert!"
];

let easterEggs = [
    "Tu as été béni par le Farfaiden, la richesse t'attend au bout du couloir !!",
    "Prépare-toi à régner : la fève dans la galette des rois t’attend !"
]


// Variables CSS
let cookieFull = document.querySelector(".cookie--full");
let cookieBroken = document.querySelector(".cookie--broken");
let piecesContainer = document.querySelector(".cookie__container");
let paper = document.querySelector(".prediction");
let comeBack = document.querySelector(".text--small");
let countDown = document.querySelector(".text--ultrasmall");


if (today == previousCookieOpened) {
    localStorage.setItem("cookieDate", today);
    messageDisplay = previousMessage;
    writeMessage();
    writeIndication(3);
    countdownTimer();
    lockBtn();

    // CSS Finale & Anim apparition
    cookieFull.style.display = "none";
    cookieBroken.classList.add("anim__broken--1");
    piecesContainer.classList.add("anim__pieces");
    paper.classList.add("anim__paper--1");
    paper.addEventListener("animationend", (e) =>{
        paper.classList.add("anim__paper--2");
        paper.classList.add("anim__paper--3");
    })
    setTimeout(() => {
        comeBack.classList.add("anim__text")
    }, 300);
    setTimeout(() => {
        countDown.classList.add("anim__text")
    }, 500);

    newMessage = previousMessage;
    easterEgg();

    // Loop animation
    piecesContainer.addEventListener("animationend", animOpenedLoop)
} else{
    writeIndication(0);
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
    do {
        newMessage = messageTab[getRandomIntInclusive(0, messageTab.length - 1)]
    } while (newMessage == previousMessage);
    
    messageDisplay = newMessage;
    localStorage.setItem("messageSaved", messageDisplay);
    writeMessage();
    lockBtn();
    writeIndication(1);
    countdownTimer();

    // ANIMATION TRIGGERS
    animTouch();
    animBeforeEX1();
};

// ANIMATIONS
function animTouch(){
    let animCircles = document.querySelectorAll(".touch__circle");
    animCircles.forEach(circle => {
        circle.classList.add("touch__circle--anim");
    });
}

function animBeforeEX1(){
    cookieFull.classList.add("anim__full--1");

    cookieFull.addEventListener("animationend", animBeforeEX2);
}

function animBeforeEX2(){
    cookieFull.classList.add("anim__full--2");

    // Timer à 700 car animation delay d'anim__full--2 à 0.5s et je rajoute 0.2s
    setTimeout(() => {
        document.querySelector(".cookie__fissure").classList.add("cookie__fissure--show");
    }, 700);

    cookieFull.addEventListener("animationend", animBeforeEX3)
}

function animBeforeEX3(){
    cookieFull.classList.add("anim__full--3");
    
    cookieFull.addEventListener("animationend", animEX)
}

function animEX(){
    cookieBroken.classList.add("anim__broken--1");
    piecesContainer.classList.add("anim__pieces");

    paper.classList.add("anim__paper--1");

    paper.addEventListener("animationend", animPaper)

    // Loop infini après que ça soit explosé
    piecesContainer.addEventListener("animationend", animOpenedLoop)

    // Lance l'event du EasterEgg, affichant l'image s'il y a :)
    piecesContainer.addEventListener("animationstart", easterEgg)
}

function animPaper(){
    paper.classList.add("anim__paper--2");
    paper.classList.add("anim__paper--3");

    // Apparition du countdown & message de revenir le lendemain
    writeIndication(2);

    setTimeout(() => {
        comeBack.classList.add("anim__text")
    }, 300);

    setTimeout(() => {
        countDown.classList.add("anim__text")
    }, 500);
}

function animOpenedLoop(){
    let piecesContainer = document.querySelector('.cookie__container')
    cookieBroken.classList.add("anim__opened");
    piecesContainer.classList.add("anim__opened");
}

function easterEgg(){
    easterEggs.forEach(easterEgg => {
        if(easterEgg == newMessage){
            let eastereggContainer = document.querySelector(".easteregg");
            eastereggContainer.classList.add("easteregg--anim");

            let easterImg = document.createElement("img");
            easterImg.classList.add("easteregg__el");

            // 0 = Farfaiden, 1 = Galette
            if(newMessage == easterEggs[0]){
                easterImg.src = "assets/easterEggs/farfaiden.png";
                easterImg.srcset = "assets/easterEggs/farfaiden@2x.png 2x";
            } else if(newMessage == easterEggs[1]){
                easterImg.src = "assets/easterEggs/galette.png";
                easterImg.srcset = "assets/easterEggs/galette@2x.png 2x";
            }

            eastereggContainer.appendChild(easterImg);
        }
    });
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

    indicationBalise.classList.add("anim__text");
    indicationBalise.addEventListener("animationend", (e) =>{
        indicationBalise.classList.remove("anim__text")
    })
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
            countdownText = "Encore " + hours + "h " + minutes + "min " + seconds + "s avant le prochain biscuit";
            countdownBalise.innerText = countdownText;
            countdownBalise.setAttribute("data-text", countdownText);

            // Reload la page si le countdown est écoulé
            if (distance < 0) {
                location.reload()
              }
        }, 0)
};