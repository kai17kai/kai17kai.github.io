const questionText = document.getElementById("question");
const questionButton = document.getElementById("button");
const questionAnswers = document.getElementsByClassName("answers");
const correctText = document.getElementById("correct");
const incorrectText = document.getElementById("incorrect");
const amountCorrectText = document.getElementsByClassName("amountCorrect");
const selector = document.getElementById("difficultly");

let amountCorrect = 0;
let question = null;
let answered = false;

questionButton.onclick = (e) => {
    correctText.style.display = "none";
    incorrectText.style.display = "none";
    questionButton.innerHTML = "Loading";
    fetch(`https://the-trivia-api.com/api/questions?limit=1&region=US&difficulty=${selector.value}`)
    .then((response) => response.json())
    .then(data => question = data)
    .then(() => {
        questionButton.innerHTML = "Get Question";
        answered = false;
        console.log(question)
        questionText.innerHTML = question[0].question;
        let answers = question[0].incorrectAnswers;
        answers.splice(Math.floor(Math.random() * 3), 0, question[0].correctAnswer)
        for (let i = 0; i < 4; i++) {
            questionAnswers[i].innerHTML = answers[i];
        }
    });
}

for (let i = 0; i < 4; ++i) {
    questionAnswers[i].onclick = (e) => {
        if (question === null || answered) {
            return;
        }
        answered = true;
        if (question[0].correctAnswer === questionAnswers[i].innerHTML) {
            console.log("Correct Answer");
            amountCorrect += 1;
            for (let i = 0; i < 2; ++i) {
                amountCorrectText[i].innerHTML = amountCorrect;
            }
            correctText.style.display = "block";
            return;
        }
        incorrectText.style.display = "block";
        return;
    }
}
