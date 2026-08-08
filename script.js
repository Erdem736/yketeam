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
        [30, 30],
        [70, 70]
    ],

    3: [
        [30, 30],
        [50, 50],
        [70, 70]
    ],

    4: [
        [30, 30],
        [70, 30],
        [30, 70],
        [70, 70]
    ],

    5: [
        [30, 30],
        [70, 30],
        [50, 50],
        [30, 70],
        [70, 70]
    ],

    6: [
        [30, 25],
        [70, 25],
        [30, 50],
        [70, 50],
        [30, 75],
        [70, 75]
    ]
};

const sizes = {
    1: 90,
    2: 82,
    3: 75,
    4: 68,
    5: 60,
    6: 53
};


/* YUVARLAKLARI YERLEŞTİR */

function updateDice() {

    const positions = layouts[selectedNumber];
    const size = sizes[selectedNumber];

    pips.forEach((pip, index) => {

        if (index < selectedNumber) {

            const x = positions[index][0];
            const y = positions[index][1];

            pip.style.display = "block";
            pip.style.position = "absolute";

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

    const index =
        Math.floor(Math.random() * colors.length);

    return colors[index];
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

    const audio =
        new AudioContext();

    const oscillator =
        audio.createOscillator();

    const gain =
        audio.createGain();

    oscillator.type = "square";

    oscillator.frequency.setValueAtTime(
        900,
        audio.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        200,
        audio.currentTime + 0.07
    );

    gain.gain.setValueAtTime(
        0.18,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.07
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();

    oscillator.stop(
        audio.currentTime + 0.07
    );
}


/* SAYI BUTONLARI */

buttons.forEach(button => {

    button.addEventListener("click", function () {

        if (rolling) return;

        selectedNumber =
            Number(this.dataset.number);

        buttons.forEach(btn => {
            btn.classList.remove("selected");
        });

        this.classList.add("selected");

        updateDice();

    });

});


/* ROLL */

rollButton.addEventListener("click", function () {

    if (rolling) return;

    rolling = true;

    rollButton.disabled = true;

    clickSound();

    dice.classList.add("rolling");

    const colorTimer = setInterval(
        randomizeColors,
        100
    );

    setTimeout(function () {

        clearInterval(colorTimer);

        dice.classList.remove("rolling");

        randomizeColors();

        rollButton.disabled = false;

        rolling = false;

    }, 1500);

});


/* BAŞLANGIÇTA 4 */

buttons.forEach(button => {

    if (Number(button.dataset.number) === 4) {
        button.classList.add("selected");
    }

});


/* BAŞLANGIÇ YUVARLAKLARI */

updateDice();

/* BAŞLANGIÇ RENKLERİ */

randomizeColors();
