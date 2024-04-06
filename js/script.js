"use strict";

const switcherButton = document.querySelector(".switcher__button");
const main = document.querySelector("body");
const elementDOMTimeInfo = {
    "on": document.querySelector(".switcher__on"),
    "off": document.querySelector(".switcher__off")
};
let spanToState = switcherButton.querySelector(".switcher__to-state");

//якщо в localStorage вже є запис про активний стан: задаємо початковий стан сторінки - покажемо потрібний з блоків
let activeState = localStorage.getItem("state-active");
 activeState ? updateSwitcher(toggleState(activeState)) : false; 


//обробник на подію click для кнопки
switcherButton.addEventListener("click", (event) => {
    const previousButtonState = localStorage.getItem("state-active") || "off"; //попередній стан ( || для першого виклику, коли в localStorage нема значення)   
    localStorage.setItem(toggleState(previousButtonState), Date.now()); //записати в localStorage час останньої події
    localStorage.setItem("state-active", toggleState(previousButtonState)); //записати в localStorage тип останньої події
    updateSwitcher(previousButtonState); //оновити сторінку після перемикання
})

// змінюємо on -> off і навпаки off -> on
function toggleState(state) {
    return (state === "on") ? "off" : "on";
}

//оновлюємо стан сторінки
function updateSwitcher(state) {
    //змінюємо видімість блоків з часом останнього вмикання/вимикання
    elementDOMTimeInfo[state].hidden = false; 
    elementDOMTimeInfo[toggleState(state)].hidden = true;
    //клас до body
    (state === "off")
        ? main.classList.add("is-dark") : main.classList.remove("is-dark");
    spanToState.textContent = state;    //змінюємо напис на кнопці
    //оновлюємо час попередної дії для видимого блоку
    elementDOMTimeInfo[state].querySelector('.switcher__time').textContent
        = getFormattedTime(+localStorage.getItem(toggleState(state))); 
}

//додаємо попереду "0", якщо маємо одноцифрове число, щоб отримати двоцифрове
function getDoubleDigit(number) {
    return (number.toString().length === 1) ? "0" + number : number;
}

//отримуємо дату в необхідному форматі з вхідного timestamp
function getFormattedTime(timestamp) {
    let lastTime = new Date(timestamp);
    return `${getDoubleDigit(lastTime.getDate())}-${getDoubleDigit(lastTime.getMonth())}-${lastTime.getFullYear()} ${getDoubleDigit(lastTime.getHours())}:${getDoubleDigit(lastTime.getMinutes())}:${getDoubleDigit(lastTime.getSeconds())}`;
}