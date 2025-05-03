const dieImage=document.querySelector(".guess-box img");
const wordDisplay=document.querySelector(".word-display");
const guessesText=document.querySelector(".guesses-text b");
const keyboardDiv=document.querySelector(".keyboard");
const gameModel=document.querySelector(".game-modal");
const playAgainBtn=document.querySelector(".play-again");

let currentWord;
let correctLetters;
let wrongGuessCount;
const maxGuesses=5;

const resetGame=()=>{
    correctLetters=[];
    wrongGuessCount=0;
    dieImage.src=`die-${wrongGuessCount}.svg`;
    guessesText.innerHTML=`${wrongGuessCount}/${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModel.classList.remove("show");
}


const getRandomWord=()=>{
    const{word ,hint}=wordList[Math.floor(Math.random()*wordList.length)];
    currentWord=word;
    console.log(word);
    document.querySelector(".hint-text b").innerText=hint;
    resetGame();
}

const gameOver=(isVictory)=>{
    setTimeout(()=>{
        const modalText=isVictory ? `You Found The Word:` : `The Correct Word Was:`;
        gameModel.querySelector("img").src=`${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h4").innerText=`${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML=`${modalText} <b>${currentWord}</b>`;
        gameModel.classList.add("show");
    },300)
}

const initGame=(button, clickedLetter)=>{
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter,index)=>{
            if(letter===clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        wrongGuessCount++;
        dieImage.src=`die-${wrongGuessCount}.svg`;
    }

    button.disabled=true;
    guessesText.innerHTML=`${wrongGuessCount}/${maxGuesses}`;

    if(wrongGuessCount===maxGuesses) return gameOver(false);
    if(correctLetters.length=== currentWord.length) return gameOver(true);
}

// creating buttons
for(let i=97; i<=122; i++){
    const button=document.createElement("button")
    button.innerText=String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e=> initGame(e.target, String.fromCharCode(i)))
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);