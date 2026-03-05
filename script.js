 const quizData = [
            {
                question: "What is the largest planet in our solar system?",
                options: ["Earth", "Jupiter", "Saturn", "Mars"],
                correct: 1
            },
            {
                question: "Which programming language is known as the 'language of the web'?",
                options: ["Python", "Java", "JavaScript", "C++"],
                correct: 2
            },
            {
                question: "What year did the first iPhone release?",
                options: ["2005", "2006", "2007", "2008"],
                correct: 2
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                correct: 2
            },
            {
                question: "What is the capital of Japan?",
                options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
                correct: 2
            },
            {
                question: "Which element has the chemical symbol 'Au'?",
                options: ["Silver", "Gold", "Aluminum", "Argon"],
                correct: 1
            },
            {
                question: "How many continents are there on Earth?",
                options: ["5", "6", "7", "8"],
                correct: 2
            },
            {
                question: "What is the smallest prime number?",
                options: ["0", "1", "2", "3"],
                correct: 2
            },
            {
                question: "Which ocean is the largest?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                correct: 3
            },
            {
                question: "Who wrote the play 'Romeo and Juliet'?",
                options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
                correct: 1
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let selectedAnswer = null;

        function loadQuestion() {
            const question = quizData[currentQuestion];
            document.getElementById('questionNumber').textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
            document.getElementById('questionText').textContent = question.question;
            
            const optionsContainer = document.getElementById('optionsContainer');
            optionsContainer.innerHTML = '';
            
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.innerHTML = `<span>${option}</span>`;
                optionDiv.onclick = () => selectAnswer(index);
                optionsContainer.appendChild(optionDiv);
            });

            document.getElementById('feedback').innerHTML = '';
            document.getElementById('nextBtn').disabled = true;
            selectedAnswer = null;

            updateProgress();
        }

        function selectAnswer(index) {
            if (selectedAnswer !== null) return;
            
            selectedAnswer = index;
            const options = document.querySelectorAll('.option');
            const question = quizData[currentQuestion];
            
            options.forEach((option, i) => {
                option.classList.add('disabled');
                if (i === index) {
                    option.classList.add('selected');
                }
            });

            setTimeout(() => {
                const isCorrect = index === question.correct;
                
                if (isCorrect) {
                    options[index].classList.add('correct');
                    score++;
                    showFeedback(true);
                } else {
                    options[index].classList.add('incorrect');
                    options[question.correct].classList.add('correct');
                    showFeedback(false);
                }

                document.getElementById('nextBtn').disabled = false;
            }, 300);
        }

        function showFeedback(isCorrect) {
            const feedback = document.getElementById('feedback');
            feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            feedback.textContent = isCorrect ? '✓ Correct! Well done!' : '✗ Incorrect. Better luck next time!';
        }

        function updateProgress() {
            const progress = ((currentQuestion) / quizData.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }

        function nextQuestion() {
            currentQuestion++;
            
            if (currentQuestion < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            document.getElementById('quizContent').classList.add('hidden');
            document.getElementById('results').classList.remove('hidden');
            document.getElementById('progressFill').style.width = '100%';
            
            const percentage = Math.round((score / quizData.length) * 100);
            document.getElementById('scoreDisplay').textContent = `${score}/${quizData.length}`;
            
            let message = '';
            if (percentage === 100) {
                message = '🌟 Perfect score! You\'re a genius!';
            } else if (percentage >= 80) {
                message = '🎯 Excellent work! You really know your stuff!';
            } else if (percentage >= 60) {
                message = '👍 Good job! Keep learning!';
            } else {
                message = '💪 Nice try! Practice makes perfect!';
            }
            
            document.getElementById('scoreMessage').textContent = message;
        }

        function restartQuiz() {
            currentQuestion = 0;
            score = 0;
            selectedAnswer = null;
            document.getElementById('results').classList.add('hidden');
            document.getElementById('quizContent').classList.remove('hidden');
            loadQuestion();
        }

        document.getElementById('nextBtn').addEventListener('click', nextQuestion);

        loadQuestion();