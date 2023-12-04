import formatData from "./helper.js";


const URL = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
const loader = document.getElementById("loader") 
const container = document.getElementById("container") 
const scoreText = document.getElementById("score")
const questionText = document.getElementById("question-text")
const answerList = document.querySelectorAll(".answer-text")
const nextButton = document.getElementById("next-button")
const finishButton = document.getElementById("finish-button")
const questionNumber = document.getElementById("question-number")

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let isAccepted = true;
let score = 0;
let scoreBonus = 10;

const showQuestion = () => {
    const{question, answers, correctAnswerIndex} = formattedData[questionIndex];
    correctAnswer = correctAnswerIndex;
    console.log(correctAnswer)
    questionText.innerText = question;
    questionNumber.innerText = questionIndex + 1
    answerList.forEach((button,index) => {
        button.innerText = answers[index]
    })
}

const checkAnswer = (event, index) => {
    if (!isAccepted) return;
    isAccepted = false;
    if(index === correctAnswer){
    event.target.classList.add("correct-answer");
    scoreText.innerText = score += scoreBonus
    } else {
    event.target.classList.add("incorrect-answer")
    answerList[correctAnswer].classList.add("correct-answer")
    }
}

const nextHandler = () => {
    questionIndex++;
    if (questionIndex < formattedData.length) {
        isAccepted = true;
        removeClasses()
        showQuestion();
    } else {
        finishHandler()
    }
}

const removeClasses = () => {
    answerList.forEach(button => button.className = "answer-text")
}

const finishHandler = () => {
    localStorage.setItem("score", JSON.stringify(score))
    window.location.assign("./end.html")
}





const fetchData = async () => {
    const response = await fetch(URL);
    const json = await response.json()
    formattedData = formatData(json.results);
    start()
}

const start = () => {
    showQuestion(formattedData)
    loader.style.display = "none"
    container.style.display = "block"
}

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler)
finishButton.addEventListener("click", finishHandler)
answerList.forEach((button, index) => {
    button.addEventListener("click", (event)=> checkAnswer(event, index))
})