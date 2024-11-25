document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const nextButton = document.getElementById('nextBtn');
    const resultContainer = document.getElementById('result');
    const progressBar = document.getElementById('progress-bar');
    let currentQuestionIndex = 0;
    let totalScore = 0;

    const questions = [
        { question: "Little interest or pleasure in doing things", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 2, 3, 4] },
        { question: "Feeling down, depressed, or hopeless", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
        { question: "Trouble falling or staying asleep, or sleeping too much", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
        { question: "Feeling tired or having little energy", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
        { question: "Poor appetite or overeating", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
        { question: "Feeling bad about yourself or that you are a failure or have let yourself or your family down", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
        { question: "Trouble concentrating on things, such as reading the newspaper or watching television", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
        { question: "Moving or speaking so slowly that other people could have noticed. Or the opposite being so fidgety or restless that you have been moving around a lot more than usual", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
        { question: "Thoughts that you would be better off dead, or of hurting yourself", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] }
    ];

    // const questions = [
    //     { question: "Feeling nervous, anxious or on edge", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 2, 3, 4] },
    //     { question: "Not being able to stop or control worrying", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
    //     { question: "Worrying too much about different things", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
    //     { question: "Trouble relaxing", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
    //     { question: "Being so restless that it is hard to sit still", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
    //     { question: "Becoming easily annoyed or irritable", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] },
    //     { question: "Feeling afraid, as if something awful might happen", answers: ["Not at all", "Several days", "More than half the days", "Nearly every day"], points: [0, 1, 2, 3] }
    // ];

    // Display the first question
    displayQuestion();

    // Progress bar update function
    function updateProgressBar() {
        const progressPercentage = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
    }

    // Next button functionality
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                showResult();
            }
        });
    }

    // Display the current question and answers
    function displayQuestion() {
        const questionData = questions[currentQuestionIndex];
        quizContainer.innerHTML = `<h2>Question ${currentQuestionIndex + 1}: ${questionData.question}</h2>`;
        
        // Create buttons for answers in a column layout
        const answersContainer = document.createElement('div');
        answersContainer.classList.add('answers-container');
        
        questionData.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.classList.add('btn');
            button.innerText = answer;
            button.addEventListener('click', () => selectAnswer(index));
            answersContainer.appendChild(button);
        });
        
        quizContainer.appendChild(answersContainer);

        if (nextButton) nextButton.disabled = true; // Disable next button initially

        updateProgressBar(); // Update progress bar
    }

    // Handle answer selection
    function selectAnswer(selectedIndex) {
        const pointsEarned = questions[currentQuestionIndex].points[selectedIndex];
        totalScore += pointsEarned;
        
        if (nextButton) nextButton.disabled = false; // Enable next button after an answer is selected
    }

    // Show the final result
    function showResult() {
        const resultPageUrl = `result.html?score=${totalScore}`;
        window.location.href = resultPageUrl;
    }
});

