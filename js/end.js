const yourScore = document.getElementById("your-score");
const saveButton = document.getElementById("save-button")
const input = document.querySelector("input")

const score = JSON.parse(localStorage.getItem("score"))
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

yourScore.innerText = score;

const saveHandler = () => {
    const userName = input.value;
    if (!userName || !score) {
        alert("invalid username or score")
    } else {
        const finalScore = {name: userName, score}
        highScores.push(finalScore);
        highScores.sort((a,b) => b.score - a.score)
        highScores.splice(10)
        
        localStorage.setItem("highScores", JSON.stringify(highScores));
        localStorage.removeItem("scores");
        window.location.assign("/")
    }
}

saveButton.addEventListener("click", saveHandler)