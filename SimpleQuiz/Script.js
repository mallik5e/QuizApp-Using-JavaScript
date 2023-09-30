const questions = [
    {
        question: "Javascript is an ______ language?",
        answers: [
            {text: "Object-Oriented", correct: true},
            {text: "Object-Based", correct: false},
            {text: "Procedural", correct: false},
            {text: "None of the above", correct: false},
        ]
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        answers: [
            {text: "document.write()", correct: false},
            {text: "console.log()", correct: false},
            {text: "window.alert()", correct: false},
            {text: "All of the above", correct: true},
        ]
    },
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        answers: [
            {text: "exists", correct: false},
            {text: "in", correct: true},
            {text: "is in", correct: false},
            {text: "lies", correct: false},
        ]
    },
    {
        question: ` What does the ‘toLocateString()’ method do in JS?`,
        answers: [
            {text: "Returrns a localised object representation.", correct: false},
            {text: "Returns a parsed string.", correct: false},
            {text: "Returns a localized string representation of an object.", correct: true},
            {text: "None of the above.", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){ /*here i tell to start quiz*/
    currentQuestionIndex = 0; /*question is 0*/
    score = 0;       /*when start the score is also 0*/
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; /* index is 0 then question is 1 and index 1 then question 2*/
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");/*here it creates one button*/ 
        button.innerHTML = answer.text;/*in the button we need to add one text*/
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
 function selectAnswer(e){
 const selectedBtn = e.target;/*when we click on the button it will add to selected button element to this selectedBtn*/ 
 const isCorrect = selectedBtn.dataset.correct === "true";/*then check dataset is it true or not*/
if(isCorrect){
    selectedBtn.classList.add("correct");
        score++;
}else{
    selectedBtn.classList.add("incorrect");
}
Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
});
nextButton.style.display = "block";
 }
 function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
nextButton.innerHTML = "play again";
nextButton.style.display = "block";
}
 function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){/* if there is an another question it will display question*/
        showQuestion();
    }else{        /*otherwise display score*/
        showScore();
    }
 }
 nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
 });
startQuiz();