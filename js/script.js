const typingText = document.querySelector(".typing-text p"),
inputField = document.querySelector(".wrapper .input-field"),
mistakeTag = document.querySelector(".mistake span"),
timeTag = document.querySelector(".time span b"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 10,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];

    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
    
        if(typedChar == null) {
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");    
        } else {
            if(characters[charIndex].innerHTML === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");    
            }
    
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
        wpmTag.innerText = wpm;
    } else {
        inputField.value = "";
        clearInterval(timer);
    }
};

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
};

function resetGame() {

};

randomParagraph();

inputField.addEventListener("input", initTyping);

document.addEventListener("keydown", () => {
    inputField.focus();
});

typingText.addEventListener("click", () => {
    inputField.focus();
});

tryAgainBtn.addEventListener("click", resetGame);
