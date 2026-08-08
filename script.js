const buttons = document.querySelectorAll(".number-button");
const rollButton = document.getElementById("rollButton");
const dice = document.getElementById("dice");
const pips = document.querySelectorAll(".pip");

let selectedNumber = 4;
let rolling = false;

const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple"
];

const layouts = {
    1: [[50, 50]],

    2: [
        [32, 32],
        [68, 68]
    ],

    3: [
        [30, 30],
        [50, 50],
        [70, 70]
    ],

    4: [
        [32, 32],
        [68, 32],
        [32, 68],
        [68, 68]
    ],

    5: [
        [30, 30],
        [70, 30],
        [50, 50],
        [30, 70],
        [70, 70]
    ],

    6: [
        [30, 27],
        [70, 27],
        [30, 50],
        [70, 50],
        [30, 73],
        [70, 73]
    ]
};

const sizes = {
    1: 90,
    2: 80,
    3: 72,
    4: 65,
    5: 58,
    6: 52
};


/* SAYIYA GÖRE YUVARLAKLARI AYARLA */

function updateDice() {
    const positions = layouts[selectedNumber];
    const size = sizes[selectedNumber];

    pips.forEach((pip, index) => {

        if (index < selectedNumber) {

            const [x, y] = positions[index];

            pip.style.display = "block";
            pip.style.left = x + "%";
            pip.style.top = y + "%";
            pip.style.width = size + "px";
            pip.style.height = size + "px";

        } else {

            pip.style.display = "none";

        }
    });
}


/* RASTGELE RENK */

function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}


/* RENKLERİ DEĞİŞTİR */

function randomizeColors() {

    pips.forEach((pip, index) => {

        if (index < selectedNumber) {
            pip.className = "pip " + randomColor();
        }

    });
}


/* TIK SESİ */

function clickSound() {

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    if (!AudioContext) return;

    const audio = new AudioContext();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = "square";

    oscillator.frequency.setValueAtTime(
        1000,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        180,
        audio.currentTime + 0.07
    );

    gain.gain.setValueAtTime(
        0.2,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.07
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();
    oscillator.stop(audio.currentTime + 0.07);
}


/* SAYI SEÇİMİ */

buttons.forEach(button => {

    button.addEventListener("click", () => {

        if (rolling) return;

        selectedNumber =
            Number(button.dataset.number);

        buttons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        updateDice();
    });

});


/* ROLL */

rollButton.addEventListener("click", async () => {

    if (rolling) return;

    rolling = true;
    rollButton.disabled = true;

    /* TIK */

    clickSound();

    /* DÖNME BAŞLA */

    dice.classList.add("rolling");

    /* RENKLER HIZLI HIZLI DEĞİŞSİN */

    const colorTimer = setInterval(() => {
        randomizeColors();
    }, 90);

    /* 1.5 SANİYE */

    await new Promise(resolve => {
        setTimeout(resolve, 1500);
    });

    /* DUR */

    clearInterval(colorTimer);

    dice.classList.remove("
