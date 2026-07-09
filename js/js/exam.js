let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Shuffle questions
questions.sort(() => Math.random() - 0.5);

document.getElementById("total").textContent = questions.length;

function loadQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("current").textContent = currentQuestion + 1;
    document.getElementById("question").textContent = q.question;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = option;

        div.onclick = function () {
            selectedAnswer = index;

            document.querySelectorAll(".option").forEach(o => {
                o.style.background = "#f8f8f8";
            });

            div.style.background = "#b3d9ff";
        };

        answers.appendChild(div);
    });
}

document.getElementById("nextBtn").onclick = function () {

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    selectedAnswer = null;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        localStorage.setItem("score", score);
        localStorage.setItem("total", questions.length);
        window.location.href = "result.html";
    }
};

// Timer (30 minutes)
let timeLeft = 1800;

setInterval(function () {
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;

    document.getElementById("timer").textContent =
        min + ":" + (sec < 10 ? "0" + sec : sec);

    timeLeft--;

    if (timeLeft < 0) {
        localStorage.setItem("score", score);
        localStorage.setItem("total", questions.length);
        window.location.href = "result.html";
    }

}, 1000);

// Basic anti-cheating
let warnings = 0;

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        warnings++;

        if (warnings >= 3) {
            alert("Exam ended due to repeated tab switching.");
            localStorage.setItem("score", score);
            localStorage.setItem("total", questions.length);
            window.location.href = "result.html";
        } else {
            alert("Warning " + warnings + "/3: Do not leave the exam page.");
        }
    }
});

loadQuestion();
