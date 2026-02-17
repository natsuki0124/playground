const words = ["LUCKY", "ORANGE", "COMPUTER", "MONEY", "HOURSE", "SUCCESS", "FORTUNE", "FLOWER"];
let selectedWord = "";
let guessedLetters = [];
let mistakes = 0;
const maxMistakes = 6;

const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    mistakes = 0;
    document.getElementById('message').innerText = "";
    updateDisplay();
    drawGallows();
    createKeyboard();
}

function updateDisplay() {
    const display = selectedWord.split('').map(letter => 
        guessedLetters.includes(letter) ? letter : "_"
    ).join(' ');
    document.getElementById('wordDisplay').innerText = display;

    if (!display.includes("_")) {
        document.getElementById('message').innerText = "🎉 恭喜你贏了！";
        disableKeyboard();
    } else if (mistakes >= maxMistakes) {
        document.getElementById('message').innerText = `👻 輸了！答案是: ${selectedWord}`;
        disableKeyboard();
    }
}

function createKeyboard() {
    const keyboard = document.getElementById('keyboard');
    keyboard.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
        const btn = document.createElement('button');
        btn.innerText = letter;
        btn.classList.add('letter');
        btn.onclick = () => handleGuess(letter, btn);
        keyboard.appendChild(btn);
    });
}

function handleGuess(letter, btn) {
    btn.disabled = true;
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        btn.classList.add('correct');
    } else {
        mistakes++;
        btn.classList.add('wrong');
        drawHangman(mistakes);
    }
    updateDisplay();
}

function disableKeyboard() {
    document.querySelectorAll('.letter').forEach(btn => btn.disabled = true);
}

// 繪圖部分
function drawGallows() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(20, 230); ctx.lineTo(180, 230); // 底座
    ctx.moveTo(50, 230); ctx.lineTo(50, 20);   // 支柱
    ctx.lineTo(120, 20); ctx.lineTo(120, 50);  // 橫樑與繩子
    ctx.stroke();
}

function drawHangman(step) {
    ctx.lineWidth = 3;
    switch(step) {
        case 1: ctx.beginPath(); ctx.arc(120, 70, 20, 0, Math.PI*2); ctx.stroke(); break; // 頭
        case 2: ctx.moveTo(120, 90); ctx.lineTo(120, 160); ctx.stroke(); break;          // 身體
        case 3: ctx.moveTo(120, 110); ctx.lineTo(90, 140); ctx.stroke(); break;         // 左手
        case 4: ctx.moveTo(120, 110); ctx.lineTo(150, 140); ctx.stroke(); break;        // 右手
        case 5: ctx.moveTo(120, 160); ctx.lineTo(90, 200); ctx.stroke(); break;         // 左腳
        case 6: ctx.moveTo(120, 160); ctx.lineTo(150, 200); ctx.stroke(); break;        // 右腳
    }
}

document.getElementById('resetBtn').onclick = initGame;

initGame();
