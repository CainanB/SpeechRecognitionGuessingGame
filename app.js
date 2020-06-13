var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var recognition = new SpeechRecognition();
recognition.start();
const numbersGuessedP = document.querySelector("#numbersGuessed");
const randomNum = getRandomNumber();
const message = document.querySelector("#horl");
const userNumberGuessMessage = document.querySelector("#numberGuessed");
const playAgain = document.querySelector("#playAgain");
let guesses = [];


function checkNumGuessed(num){
    // alert(num);
    const numChosen = parseInt(num);
    if(Number.isNaN(numChosen)){
        userNumberGuessMessage.innerText = `You guessed ${num}`;
        message.innerHTML = "That isn't a number Try Again!";
        return;
    }
    if(numChosen > 100 || numChosen < 1){
        message.innerHTML = "Number must be bewteen 1 and 100 Try Again!";
        return;
    }
    if(numChosen == randomNum){
        
        userNumberGuessMessage.innerHTML= `You guessed ${numChosen}`;
        message.innerHTML = `You chose correctly! The random number was ${randomNum}`;
        playAgain.innerHTML = `<button type="button" class="btn btn-light" id="play-again">Play Again</button>`
    }else if(numChosen > randomNum){
        addGuessList(numChosen);
        userNumberGuessMessage.innerHTML= `You guessed ${numChosen}`;
        message.innerHTML = "The number is LOWER!";
        // guesses.push(numChosen);
        // numbersGuessedP.innerHTML = guesses.join();

    }else{
        addGuessList(numChosen);
        userNumberGuessMessage.innerHTML= `You guessed ${numChosen}`;
        message.innerHTML = "The number is HIGHER!";
        // guesses.push(numChosen);
        // numbersGuessedP.innerHTML = guesses.join();
    }

}
function addGuessList(num){
    //alert("called");
    guesses.push(num);
    //alert(guesses.toString());
    const guessString = guesses.join();
    numbersGuessedP.innerHTML = guessString;
}
function getRandomNumber(){
    const randomNum = Math.floor((Math.random() * 100) + 1);
    console.log(randomNum);
    return randomNum;
}

function onSpeak(event){
    const numGuessed = event.results[0][0].transcript;
    checkNumGuessed(numGuessed);

}
document.addEventListener("click", e => {
    console.log(e);
    if(e.target.id == "play-again"){
        window.location.reload();
    }
});


recognition.addEventListener('result', onSpeak);

recognition.addEventListener('end', () => recognition.start());