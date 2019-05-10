const questionsArray = [
    {
        question: "Prior to being the Indianapolis Colts, what city did the Colts call home?",

        answers: {
            1: "Philadelphia, PA",
            2: "Cincinnati, OH",
            3: "Baltimore, MD",
            4: "Los Angeles, CA",
            5: "St. Louis, MO"
        },

        correctAnswer: {
            3: "Baltimore, MD",
        }
    },
    {
        question: "How many touchdowns did the Colts score in the 2006 regular season?",

        answers: {
            1: 30,
            2: 35,
            3: 40,
            4: 45,
            5: 50
        },

        correctAnswer: {
            5: 50
        }
    },
    {
        question: "What former Colt head coach was also a former Colts player?",

        answers: {
            1: "Tony Dungy",
            2: "Don Shula",
            3: "Frank Reich",
            4: "Jim Mora",
            5: "Weeb Ewbank"
        },

        correctAnswer: {
            2: "Don Shula"
        }
    },
    {
        question: "Which of these combinations of receivers had the most touchdowns in a single season?",

        answers: {
            1: "Marvin Harrison and Reggie Wayne",
            2: "T.Y. Hilton and Reggie Wayne",
            3: "Marvin Harrison and Dallas Clark",
            4: "Marvin Harrison and Bryan Fletcher",
            5: "T.Y. Hilton and Eric Ebron"
        },

        correctAnswer: {
            4: "Marvin Harrison and Bryan Fletcher"
        }
    },
    {
        question: "Which of these great running backs once totaled an incredible 2,303 yards from scrimmage for the Colts in a single season?",

        answers: {
            1: "Edgerrin James",
            2: "Eric Dickerson",
            3: "Joseph Addai",
            4: "Marshall Faulk",
            5: "Lydell Mitchell"
        },

        correctAnswer: {
            1: "Edgerrin James"
        }
    }
];

const gifArray = [
    "./assets/images/coltsGif1.gif",
    "./assets/images/coltsGif2.gif",
    "./assets/images/coltsGif3.gif",
    "./assets/images/coltsGif4.gif",
    "./assets/images/coltsGif5.gif"
]

const titleDiv = document.getElementById("titleDiv");
const startDiv = document.getElementById("startDiv");
const timerDiv = document.getElementById("timerDiv");
const questionsDiv = document.getElementById("questionsDiv");
const choicesDiv = document.getElementById("choicesDiv");
const resultsDiv = document.getElementById("resultsDiv");
const secondsLeft = document.getElementById("seconds");
const answerScreen = document.getElementById("answerScreen");
const userAnswer = document.getElementById("userAnswer");
const triviaAnswer = document.getElementById("triviaAnswer");
const correctAnswersDiv = document.getElementById("correctAnswersDiv");
const incorrectAnswersDiv = document.getElementById("incorrectAnswersDiv");
const restart = document.getElementById("restart");
const gifDiv = document.getElementById("gifDiv");

let questionInterval;
let mainTimer;

const startGame = function () {
    timerDiv.hidden = true;
    questionsDiv.hidden = true;
    choicesDiv.hidden = true;
    resultsDiv.hidden = true;
    answerScreen.hidden = true;
};

startGame();

const correctAnswerScreen = function () {

    answerScreen.hidden = false;
    timerDiv.hidden = true;
    questionsDiv.hidden = true;
    choicesDiv.hidden = true;
    const img = gifArray[currentQuestion];
    gifDiv.innerHTML = `<img src=${img} class="image">`;
    currentQuestion++;

    const myInterval = setTimeout(function () {

        if (currentQuestion < questionsArray.length) {

            answerScreen.hidden = true;
            timerDiv.hidden = false;
            questionsDiv.hidden = false;
            choicesDiv.hidden = false;
            choicesDivIsClicked = false;
            titleDiv.innerHTML = "Colts Trivia Game!";
            questionTimer();
            showQuestion();
            showAnswerChoices();

        } else {
            clearInterval(myInterval);
            clearInterval(questionInterval);
            resultsPage();
        };

    }, 5000);

};

let totalNumberCorrect = 0;

let totalNumberIncorrect = 0;

const resultsPage = function () {
    resultsDiv.hidden = false;
    answerScreen.hidden = true;
    titleDiv.innerHTML = "Results!";
    correctAnswersDiv.innerHTML = totalNumberCorrect;
    incorrectAnswersDiv.innerHTML = totalNumberIncorrect;
};

function questionTimer() {
    mainTimer = 15;
    secondsLeft.innerHTML = mainTimer;
    // console.log(mainTimer);
    questionInterval = setInterval(function () {
        mainTimer--;
        secondsLeft.innerHTML = mainTimer;
        if (mainTimer <= 0) {
            clearInterval(questionInterval);
            userAnswer.innerHTML = "No Answer!";
            const key = Object.keys(questionsArray[currentQuestion].correctAnswer)[0];
            const name = questionsArray[currentQuestion].correctAnswer[key];
            triviaAnswer.innerHTML = name;
            correctAnswerScreen();
            titleDiv.innerHTML = "Out Of Time!";
            mainTimer = 15;
            totalNumberIncorrect++;
        };
    }, 1000);
};

let currentQuestion = 0;

const showQuestion = function () {
    questionsDiv.innerHTML = questionsArray[currentQuestion].question;
};

const showAnswerChoices = function () {
    const answers = questionsArray[currentQuestion].answers;
    const ans = [];
    for (answer in answers) {
        const a = `<button class="answer" question="${currentQuestion}" value="${answer}">${answers[answer]}</button>`
        ans.push(a);
    }
    choicesDiv.innerHTML = ans.join('');
    // console.log(questionsArray[0].answers);
}

let choicesDivIsClicked = false;

choicesDiv.addEventListener("click", function (e) {

    clearInterval(questionInterval);

    if (e.target.className === "answer") {
        choicesDivIsClicked = true;
        const key = Object.keys(questionsArray[currentQuestion].correctAnswer)[0];
        const name = questionsArray[currentQuestion].correctAnswer[key];
        console.log(e.target.value);
        console.log(questionsArray[currentQuestion].correctAnswer.name);
        if (questionsArray[currentQuestion].correctAnswer[e.target.value]) {
            titleDiv.innerHTML = "Correct!";
            userAnswer.innerHTML = questionsArray[currentQuestion].answers[e.target.value];
            triviaAnswer.innerHTML = name;
            totalNumberCorrect++;
        } else {
            titleDiv.innerHTML = "Incorrect!";
            userAnswer.innerHTML = questionsArray[currentQuestion].answers[e.target.value];
            triviaAnswer.innerHTML = name;
            totalNumberIncorrect++;
        };
    };
    correctAnswerScreen();
});

const startClick = function () {
    titleDiv.style.paddingTop = '5%';
    timerDiv.hidden = false;
    questionsDiv.hidden = false;
    choicesDiv.hidden = false;
    startDiv.hidden = true;
    resultsDiv.hidden = true;
    currentQuestion = 0;
    choicesDivIsClicked = false;
    totalNumberCorrect = 0;
    totalNumberIncorrect = 0;
    questionTimer();
    showQuestion();
    showAnswerChoices();
};

startDiv.addEventListener("click", startClick);

restart.addEventListener("click", startClick);