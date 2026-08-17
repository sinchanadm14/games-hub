 // ==========================================
// PAGE NAVIGATION
// ==========================================

function showGame(gameId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(gameId).classList.add("active");

    if (gameId === "guess") {
        resetGuess();
    }

    if (gameId === "quiz") {
        startQuiz();
    }

    if (gameId === "tic") {
        resetTic();
    }
}


function goHome() {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById("home").classList.add("active");
}


// ==========================================
// ROCK PAPER SCISSORS
// ==========================================

let playerScore = 0;
let computerScore = 0;


function playRPS(playerChoice) {

    const choices = [
        "rock",
        "paper",
        "scissors"
    ];

    const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];


    let result = "";


    if (playerChoice === computerChoice) {

        result = "It's a draw! 🤝";

    }

    else if (
        (playerChoice === "rock" &&
            computerChoice === "scissors") ||

        (playerChoice === "paper" &&
            computerChoice === "rock") ||

        (playerChoice === "scissors" &&
            computerChoice === "paper")
    ) {

        playerScore++;

        result = "You win! 🎉";

    }

    else {

        computerScore++;

        result = "Computer wins! 🤖";
    }


    document.getElementById("rpsResult").innerHTML =
        `You chose <b>${playerChoice}</b><br>
         Computer chose <b>${computerChoice}</b><br><br>
         ${result}`;


    document.getElementById("rpsScore").innerText =
        `You: ${playerScore} | Computer: ${computerScore}`;
}


// ==========================================
// NUMBER GUESSING
// ==========================================

let secretNumber = 0;
let guessAttempts = 0;


function resetGuess() {

    secretNumber =
        Math.floor(Math.random() * 100) + 1;

    guessAttempts = 0;


    document.getElementById("guessInput").value = "";

    document.getElementById("guessResult").innerText =
        "Start guessing!";

    document.getElementById("attempts").innerText = "";
}


function checkGuess() {

    const userGuess =
        Number(document.getElementById("guessInput").value);


    if (
        userGuess < 1 ||
        userGuess > 100 ||
        isNaN(userGuess)
    ) {

        document.getElementById("guessResult").innerText =
            "Enter a number between 1 and 100.";

        return;
    }


    guessAttempts++;


    if (userGuess === secretNumber) {

        document.getElementById("guessResult").innerText =
            `🎉 Correct! The number was ${secretNumber}.`;

    }

    else if (userGuess < secretNumber) {

        document.getElementById("guessResult").innerText =
            "Too low! Try again.";

    }

    else {

        document.getElementById("guessResult").innerText =
            "Too high! Try again.";
    }


    document.getElementById("attempts").innerText =
        `Attempts: ${guessAttempts}`;
}


// ==========================================
// QUIZ GAME
// ==========================================

const questions = [

    {
        question:
            "Which language is used to style web pages?",

        answers: [
            "HTML",
            "CSS",
            "Python",
            "SQL"
        ],

        correct: "CSS"
    },


    {
        question:
            "Which language is used to add interactivity to webpages?",

        answers: [
            "Java",
            "Python",
            "JavaScript",
            "C"
        ],

        correct: "JavaScript"
    },


    {
        question:
            "What does HTML stand for?",

        answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Machine Language",
            "Home Tool Markup Language"
        ],

        correct:
            "Hyper Text Markup Language"
    },


    {
        question:
            "Which symbol is used for an ID selector in CSS?",

        answers: [
            ".",
            "#",
            "*",
            "$"
        ],

        correct: "#"
    },


    {
        question:
            "Which one is a programming language?",

        answers: [
            "HTML",
            "CSS",
            "Python",
            "HTTP"
        ],

        correct: "Python"
    }

];


let currentQuestion = 0;
let quizScore = 0;


function startQuiz() {

    currentQuestion = 0;

    quizScore = 0;

    showQuestion();
}


function showQuestion() {

    const question =
        questions[currentQuestion];


    document.getElementById("question").innerText =
        `${currentQuestion + 1}. ${question.question}`;


    const answersDiv =
        document.getElementById("answers");


    answersDiv.innerHTML = "";


    question.answers.forEach(answer => {

        const button =
            document.createElement("button");


        button.innerText = answer;


        button.onclick = function () {

            checkAnswer(answer);

        };


        answersDiv.appendChild(button);
    });


    document.getElementById("quizScore").innerText =
        `Score: ${quizScore}`;
}


function checkAnswer(answer) {

    if (
        answer ===
        questions[currentQuestion].correct
    ) {

        quizScore++;

        alert("Correct! 🎉");

    }

    else {

        alert(
            `Wrong! Correct answer: ${
                questions[currentQuestion].correct
            }`
        );
    }


    document.getElementById("quizScore").innerText =
        `Score: ${quizScore}`;
}


function nextQuestion() {

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        showQuestion();

    }

    else {

        document.getElementById("question").innerText =
            "🎉 Quiz Finished!";


        document.getElementById("answers").innerHTML =
            "";


        document.getElementById("quizScore").innerText =
            `Final Score: ${quizScore}/${questions.length}`;
    }
}


// ==========================================
// TIC TAC TOE
// ==========================================

// IMPORTANT: EXACTLY 9 positions
let ticBoard = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];


let currentPlayer = "X";

let gameOver = false;


// ------------------------------------------
// RESET GAME
// ------------------------------------------

function resetTic() {

    // Reset all 9 boxes
    ticBoard = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    currentPlayer = "X";

    gameOver = false;


    const buttons =
        document.querySelectorAll(".board button");


    buttons.forEach(button => {

        button.innerText = "";

        button.disabled = false;
    });


    document.getElementById("ticStatus").innerText =
        "Player X's turn";
}


// ------------------------------------------
// PLAYER MOVE
// ------------------------------------------

function ticMove(index) {

    // Stop if box already contains X/O
    if (
        ticBoard[index] !== "" ||
        gameOver
    ) {
        return;
    }


    // Put X or O in the selected box
    ticBoard[index] = currentPlayer;


    // Get all 9 buttons
    const buttons =
        document.querySelectorAll(".board button");


    // Display X or O
    buttons[index].innerText =
        currentPlayer;


    // Check whether current player won
    if (checkWinner()) {

        document.getElementById("ticStatus").innerText =
            `🎉 Player ${currentPlayer} wins!`;

        gameOver = true;

        return;
    }


    // Check whether all 9 boxes are filled
    if (
        ticBoard.every(cell => cell !== "")
    ) {

        document.getElementById("ticStatus").innerText =
            "It's a draw! 🤝";

        gameOver = true;

        return;
    }


    // Change player
    if (currentPlayer === "X") {

        currentPlayer = "O";

    }

    else {

        currentPlayer = "X";
    }


    document.getElementById("ticStatus").innerText =
        `Player ${currentPlayer}'s turn`;
}


// ------------------------------------------
// CHECK WINNER
// ------------------------------------------

function checkWinner() {

    const winningPatterns = [

        // Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonals
        [0, 4, 8],
        [2, 4, 6]

    ];


    for (
        let pattern of winningPatterns
    ) {

        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];


        if (
            ticBoard[a] !== "" &&
            ticBoard[a] === ticBoard[b] &&
            ticBoard[a] === ticBoard[c]
        ) {

            return true;
        }
    }


    return false;
}